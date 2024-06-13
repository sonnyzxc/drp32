import React, { useEffect } from 'react';
import { sendMessage } from '../services/websocket'; // Assuming you have your WebSocket service imported

const PeriodicMessageSender: React.FC = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log("pinging...")
      sendMessage('ping'); // Replace 'Your message here' with the message you want to send
    }, 30000); // 3 seconds in milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // This component doesn't render anything
  return null;
};

export default PeriodicMessageSender;
