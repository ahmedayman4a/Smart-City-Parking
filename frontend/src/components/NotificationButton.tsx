import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationPanel } from '../pages/NotificationPage';
import { useNotifications } from '../components/Notification';

export function NotificationButton() {
  const [showPanel, setShowPanel] = useState(false);
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPanel(!showPanel)}
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={(id) => markAsRead(id)}
            onClear={clearNotifications}
          />
        </div>
      )}
    </div>
  );
}