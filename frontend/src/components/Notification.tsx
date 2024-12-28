import { useEffect, useState, useCallback } from 'react';
import { Client, IFrame } from '@stomp/stompjs';

// If your server is listening on ws://localhost:8080/ws, use that URL:
const SOCKET_URL = 'ws://localhost:8080/ws';

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeWebSocket = useCallback(() => {
    // 1) Create a new STOMP client with a raw WebSocket broker URL
    const client = new Client({
      brokerURL: SOCKET_URL,      // <--- Raw WebSocket URL
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('STOMP:', str);
      },
    });

    client.onConnect = (frame: IFrame) => {
      console.log('Connected to WebSocket broker:', frame);
      setConnected(true);
      setError(null);

      // 2) Subscribe to the topic
      client.subscribe('/topic/notification', (message) => {
        try {
          const notification: Notification = {
            id: crypto.randomUUID(),
            message: message.body,
            timestamp: new Date(),
            read: false,
            type: 'info',
          };
          setNotifications((prev) => [notification, ...prev]);
        } catch (err) {
          console.error('Error processing message:', err);
          setError('Failed to process notification');
        }
      });
    };

    client.onStompError = (frame: IFrame) => {
      console.error('STOMP error:', frame.body);
      setConnected(false);
      setError('Connection error occurred');
    };

    client.onWebSocketClose = (evt) => {
      console.warn('WebSocket closed:', evt);
      setConnected(false);
    };

    return client;
  }, []);

  // 3) Use effect to establish connection on mount
  useEffect(() => {
    const client = initializeWebSocket();
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [initializeWebSocket]);

  // 4) Function to send a STOMP message
  const sendNotification = useCallback(
    (message: string) => {
      // Because we're creating a new client for each send, 
      // it quickly connects, sends, then deactivates.
      // Alternatively, you could reuse the existing client if it remains active.
      const client = new Client({
        brokerURL: SOCKET_URL,
        debug: (str) => {
          console.log('STOMP send debug:', str);
        },
        onConnect: () => {
          client.publish({
            destination: '/app/sendNotification',
            body: JSON.stringify({ message }),
          });
          client.deactivate();
        },
        onStompError: (frame) => {
          console.error('Error sending notification:', frame.body);
        },
      });

      client.activate();
    },
    []
  );

  // 5) Helpers to update notification state
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return {
    notifications,
    connected,
    error,
    sendNotification,
    markAsRead,
    clearNotifications,
    deleteNotification,
  };
}
