import React from 'react';

const NotificationError = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div className='error'>{message}</div>;
};

export default NotificationError;
