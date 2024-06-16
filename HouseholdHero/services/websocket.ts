import { useEffect } from 'react';

let ws;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const reconnectDelay = 1000; // initial delay in milliseconds (1 second)

export const connectWebSocket = (handleUpdate) => {
  ws = new WebSocket('https://be-drp32-5ac34b8c912e.herokuapp.com/rtu');

  ws.onopen = () => {
    console.log('Connected to WebSocket');
    reconnectAttempts = 0; // Reset reconnection attempts on successful connection
  };

  ws.onmessage = (event) => {
    console.log('Received:', event.data);
    if (event.data === 'update') {
      handleUpdate();
    }
  };

  ws.onerror = (error) => {
    console.log('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
    if (reconnectAttempts < maxReconnectAttempts) {
      const delay = Math.min(reconnectDelay * (2 ** reconnectAttempts), 30000); // Exponential backoff with a maximum delay of 30 seconds
      setTimeout(() => {
        reconnectAttempts += 1;
        console.log(`Reconnecting... Attempt ${reconnectAttempts}`);
        connectWebSocket(handleUpdate); // Attempt to reconnect
      }, delay);
    } else {
      console.log('Max reconnect attempts reached. No further attempts will be made.');
    }
  };
};

export const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  }
};

export const closeWebSocket = () => {
  if (ws) {
    ws.close();
  }
};
