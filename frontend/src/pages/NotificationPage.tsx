// src/pages/NotificationPage.tsx
import React from 'react';
import { Bell, X, CheckCheck } from 'lucide-react';
import { Notification } from '../components/Notification';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClear: () => void;
}

export function NotificationPanel({ notifications, onMarkAsRead, onClear }: NotificationPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-96 max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No notifications
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-800">{notification.message}</p>
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Mark as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}