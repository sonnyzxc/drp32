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

export const usePageTimer = (pageName: string) => {
  const [totalTimeOnPage, setTotalTimeOnPage] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const startTime = Date.now();

      return () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        setTotalTimeOnPage(prevTime => prevTime + duration);
        console.log(`Total time spent on ${pageName}: ${totalTimeOnPage + duration} seconds`);
      };
    }, [totalTimeOnPage])
  );

  return totalTimeOnPage;
};
