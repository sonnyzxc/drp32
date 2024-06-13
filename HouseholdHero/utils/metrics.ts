// metrics.ts

import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useTaskAddTimer = () => {
  const [taskAddStartTime, setTaskAddStartTime] = useState<number | null>(null);

  const startTaskAddTimer = () => {
    setTaskAddStartTime(Date.now());
  };

  const endTaskAddTimer = () => {
    if (taskAddStartTime) {
      const taskAddEndTime = Date.now();
      const taskAddDuration = (taskAddEndTime - taskAddStartTime) / 1000;
      console.log(`Task add duration: ${taskAddDuration} seconds`);
      setTaskAddStartTime(null);
      return taskAddDuration;
    }
    return null;
  };

  return { startTaskAddTimer, endTaskAddTimer };
};
