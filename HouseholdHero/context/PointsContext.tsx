import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Task {
  id: number;
  text: string;
  emoji?: string;
  points: number;
  completed: boolean;
  assignedTo: number; // User ID of the assigned user
  dueDate: Date;
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

  const rotateArray = (arr: number[], rotateBy: number) => {
    return arr.slice(rotateBy).concat(arr.slice(0, rotateBy));
  };

  const initializePoints = () => {
    const userPoints = [...defaultPoints];
    for (let i = 0; i < 7; i++) {
      userPoints[i] = Math.floor(Math.random() * 15) + 1;
    }
    return rotateArray(userPoints, today + 1);
  };

  const initialPoints = {
    1: initializePoints(),
    2: initializePoints(),
  };

  const [points, setPoints] = useState<{ [userId: number]: number[] }>(initialPoints);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buy groceries', emoji: '🛒', points: 5, completed: true, assignedTo: 1, dueDate: new Date() },
    { id: 2, text: 'Walk the dog', emoji: '🐕', points: 3, completed: true, assignedTo: 2, dueDate: new Date() },
    { id: 3, text: 'Do laundry', emoji: '🧺', points: 4, completed: true, assignedTo: 1, dueDate: new Date() },
    { id: 4, text: 'Clean the kitchen', emoji: '🍽️', points: 10, completed: false, assignedTo: 2, dueDate: new Date() },
    { id: 5, text: 'Water the plants', emoji: '🌿', points: 5, completed: true, assignedTo: 2, dueDate: new Date() },
    { id: 6, text: 'Take out the trash', emoji: '🗑️', points: 2, completed: true, assignedTo: 1, dueDate: new Date() },
    { id: 7, text: 'Vacuum the house', emoji: '🧹', points: 8, completed: false, assignedTo: 1, dueDate: new Date() },
    { id: 8, text: 'Wash the car', emoji: '🚗', points: 7, completed: true, assignedTo: 2, dueDate: new Date() },
    { id: 9, text: 'Organize the garage', emoji: '🔧', points: 10, completed: true, assignedTo: 2, dueDate: new Date() },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', isAdmin: true },
    { id: 2, name: 'Jane Doe', isAdmin: false },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const addPoints = (userId: number, index: number, newPoints: number) => {
    setPoints(prevPoints => {
      const userPoints = prevPoints[userId] ? [...prevPoints[userId]] : [0, 0, 0, 0, 0, 0, 0];
      const rotatedIndex = (index + userPoints.length - (today + 1)) % userPoints.length;
      userPoints[rotatedIndex] += newPoints;
      console.log(`Adding ${newPoints} points to user ${userId} on rotated index ${rotatedIndex}`);
      console.log('Updated points:', userPoints);
      return { ...prevPoints, [userId]: userPoints };
    });
  };

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const currentDayIndex = new Date().getDay();
    console.log('Current day index:', currentDayIndex);
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        addPoints(task.assignedTo, currentDayIndex, updatedTask.completed ? task.points : -task.points);
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
    setPoints(prevPoints => ({ ...prevPoints, [newUser.id]: rotateArray([0, 0, 0, 0, 0, 0, 0], today + 1) })); // Initialize points
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
