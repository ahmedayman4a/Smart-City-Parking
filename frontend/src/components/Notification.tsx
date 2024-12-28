import { useEffect, useState, useCallback } from 'react';
import { Client, IFrame } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';  // Add this import

// WebSocket URL
const SOCKET_URL = 'ws://localhost:8080/ws';

export interface Notification {
  id: number;
  userId: number;
  status: string;
  content: string;
  createdAt: string;
  read: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token and decode user details
  const token = Cookies.get('authToken');
  const decodedToken: any = jwtDecode(token || '');
  const userId = decodedToken.userId;

  console.log('Decoded userId:', userId);

  // Utility function to merge notifications without duplicates
  const mergeNotifications = (existing: Notification[], newItems: Notification[]) => {
    const seen = new Set(existing.map(n => n.id));
    return [...existing, ...newItems.filter(n => !seen.has(n.id))];
  };

  // Retrieve pending notifications from cookies
  const loadPendingNotifications = () => {
    const notificationCookie = Cookies.get('notifications');
    if (notificationCookie) {
      try {
        const pendingNotifications: Notification[] = JSON.parse(notificationCookie);
        console.log('Loaded pending notifications:', pendingNotifications);
        setNotifications((prev) => mergeNotifications(prev, pendingNotifications));
      } catch (err) {
        console.error('Error parsing pending notifications from cookies:', err);
      }
    }
  };

  // Add function to save notifications to cookies
  const saveNotificationsToCookies = (notifications: Notification[]) => {
    Cookies.set('notifications', JSON.stringify(notifications));
  };

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws?userId=${encodeURIComponent(userId)}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      connectHeaders: {
        Authorization: `Bearer ${token}`,
        userId: userId.toString(),
      },
    });

    client.onConnect = (frame: IFrame) => {
      console.log('Connected to WebSocket broker:', frame);
      setConnected(true);
      setError(null);

      // Subscribe to the user's notification queue
      client.subscribe(`/queue/notification/${userId}`, (message) => {
        try {
          const notification: Notification = JSON.parse(message.body);
          console.log('Received notification:', notification);
          setNotifications((prev) => {
            // Check if notification already exists
            const exists = prev.some(n => n.id === notification.id);
            if (exists) {
              return prev;
            }
            const updatedNotifications = [notification, ...prev];
            // Save to cookies whenever we get a new notification
            saveNotificationsToCookies(updatedNotifications);
            return updatedNotifications;
          });
        } catch (err) {
          console.error('Error processing notification:', err);
          setError('Failed to process notification.');
        }
      });
    };

    client.onStompError = (frame: IFrame) => {
      console.error('STOMP Error:', frame.body);
      setConnected(false);
      setError('Connection error occurred.');
    };

    client.onWebSocketClose = (evt) => {
      console.warn('WebSocket closed:', evt);
      setConnected(false);
    };

    return client;
  }, [userId, token]);

  // Load pending notifications and establish WebSocket connection on mount
  useEffect(() => {
    loadPendingNotifications();
    const client = initializeWebSocket();
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [initializeWebSocket]);

  // Helper functions to update notification state
  const markAsRead = useCallback((id: number) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );
      saveNotificationsToCookies(updated);
      return updated;
    });
  }, []);

  const clearNotifications = useCallback(async () => {
    try {
      // Get all notification IDs
      const notificationIds = notifications.map(notification => notification.id);
      
      // Send the array directly without wrapping it in an object
      const response = await axios.post(
        'http://localhost:8080/api/authenticate/notifications/clear',
        notificationIds, // Send array directly
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        setNotifications([]);
        Cookies.remove('notifications');
      }
    } catch (error) {
      console.error('Failed to clear notifications:', error);
      setError('Failed to clear notifications');
    }
  }, [notifications]);

  const deleteNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return {
    notifications,
    connected,
    error,
    markAsRead,
    clearNotifications,
    deleteNotification,
  };
}
