import { useEffect } from 'react';

let ws;

export const connectWebSocket = (handleUpdate) => {
  ws = new WebSocket('https://be-drp32-5ac34b8c912e.herokuapp.com/rtu');

  ws.onopen = () => {
    console.log('Connected to WebSocket');
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
