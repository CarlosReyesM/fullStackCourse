import React from 'react'

const NotificationAdded = ({message}) => {
  if (!message) {
    return null;
  }
  return <div className='added'>{message}</div>;
};

export default NotificationAdded
