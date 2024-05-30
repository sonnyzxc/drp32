import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Task {
  id: number;
  text: string;
  emoji?: string;
  points: number;
  completed: boolean;
  assignedTo: number; // User ID of the assigned user
}

interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

interface PointsContextProps {
  points: { [userId: number]: number[] }; // User-specific points
  tasks: Task[];
  currentUser: User;
  users: User[];
  addPoints: (userId: number, index: number, points: number) => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: number) => void;
  changeUser: (userId: number) => void;
  addUser: (name: string, isAdmin: boolean) => void;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const today = new Date().getDay();
  const defaultPoints = [0, 0, 0, 0, 0, 0, 0];
  const [points, setPoints] = useState<{ [userId: number]: number[] }>({
    1: [...defaultPoints], // Points for user 1
    2: [...defaultPoints], // Points for user 2
  });

  // Generate past 6 days' dummy data
  const generatePastDaysData = (daysBack: number[]) => {
    return daysBack.map(day => {
      const randomPoints = Math.floor(Math.random() * 15) + 1; // Random points between 1 and 15
      return randomPoints;
    });
  };

  const generatePointsForUser = (userId: number) => {
    const userPoints = [...defaultPoints];
    for (let i = 0; i < 7; i++) {
      userPoints[(today + i) % 7] = Math.floor(Math.random() * 15) + 1;
    }
    return userPoints;
  };

  points[1] = generatePointsForUser(1);
  points[2] = generatePointsForUser(2);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buy groceries', emoji: '🛒', points: 5, completed: true, assignedTo: 1 },
    { id: 2, text: 'Walk the dog', emoji: '🐕', points: 3, completed: true, assignedTo: 2 },
    { id: 3, text: 'Do laundry', emoji: '🧺', points: 4, completed: true, assignedTo: 1 },
    { id: 4, text: 'Clean the kitchen', emoji: '🍽️', points: 10, completed: false, assignedTo: 2 },
    { id: 5, text: 'Water the plants', emoji: '🌿', points: 5, completed: true, assignedTo: 2 },
    { id: 6, text: 'Take out the trash', emoji: '🗑️', points: 2, completed: true, assignedTo: 1 },
    { id: 7, text: 'Vacuum the house', emoji: '🧹', points: 8, completed: false, assignedTo: 1 },
    { id: 8, text: 'Wash the car', emoji: '🚗', points: 7, completed: true, assignedTo: 2 },
    { id: 9, text: 'Organize the garage', emoji: '🔧', points: 10, completed: true, assignedTo: 2 },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', isAdmin: true },
    { id: 2, name: 'Jane Doe', isAdmin: false },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const addPoints = (userId: number, index: number, newPoints: number) => {
    setPoints(prevPoints => {
      const userPoints = prevPoints[userId] ? [...prevPoints[userId]] : [0, 0, 0, 0, 0, 0, 0];
      userPoints[index] += newPoints;
      return { ...prevPoints, [userId]: userPoints };
    });
  };

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        addPoints(task.assignedTo, new Date().getDay(), updatedTask.completed ? task.points : -task.points);
        return updatedTask;
      }
      return task;
    }));
  };

  const changeUser = (userId: number) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const addUser = (name: string, isAdmin: boolean) => {
    const newUser = {
      id: users.length + 1,
      name,
      isAdmin,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setPoints(prevPoints => ({ ...prevPoints, [newUser.id]: [0, 0, 0, 0, 0, 0, 0] }));
  };

  return (
    <PointsContext.Provider value={{ points, tasks, currentUser, users, addPoints, addTask, toggleTaskCompletion, changeUser, addUser }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
