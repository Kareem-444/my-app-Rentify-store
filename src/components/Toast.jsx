import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyles = {
    success: 'bg-green-500/90 dark:bg-green-600/90 text-white',
    error: 'bg-red-500/90 dark:bg-red-600/90 text-white',
    info: 'bg-blue-500/90 dark:bg-blue-600/90 text-white',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-800/60 transition-all duration-300 text-lg font-semibold ${toastStyles[type]}`}
      style={{ minWidth: 220, maxWidth: 340, letterSpacing: 0.01 }}
    >
      {message}
    </div>
  );
};

export default Toast;