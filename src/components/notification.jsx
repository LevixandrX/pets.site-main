import React, { useEffect, useState } from 'react';

const Notification = ({ notification }) => {
  const [showNotification, setShowNotification] = useState(!!notification);

  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!showNotification) return null;

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <div
          className={`alert alert-${notification.type} fade show notification`}
          role="alert"
          style={{ animation: 'fadeIn 1s ease-in-out' }}
        >
          {notification.message}
        </div>
      </div>
    </div>
  );
};

export default Notification;