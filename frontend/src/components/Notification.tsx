import { useEffect, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        setConnected(true);
        client.subscribe('/topic/notification', (message) => {
          const notification: Notification = {
            id: crypto.randomUUID(),
            message: message.body,
            timestamp: new Date(),
            read: false,
          };
          setNotifications((prev) => [notification, ...prev]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const sendNotification = useCallback((message: string) => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });

    client.activate();
    client.onConnect = () => {
      client.publish({
        destination: '/app/sendNotification',
        body: message,
      });
      client.deactivate();
    };
  }, []);

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

  return {
    notifications,
    connected,
    sendNotification,
    markAsRead,
    clearNotifications,
  };
}