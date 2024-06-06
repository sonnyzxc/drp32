import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  text: string;
  emoji?: string;
  points: number;
  completed: boolean;
  assignedTo: number; // User ID of the assigned user
  dueDate: Date; // Due date for the task
}

interface User {
  id: number;
  name: string;
  isAdmin: boolean;
  color: string;
}

interface PointsContextProps {
  points: { [userId: number]: number[] };
  tasks: Task[];
  currentUser: User;
  users: User[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: number) => void;
  changeUser: (userId: number) => void;
  addUser: (name: string, isAdmin: boolean) => void;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

const userColors = ['#6a11cb', '#2575fc', '#fc2575', '#fca311', '#00b4d8'];

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultPoints = [0, 0, 0, 0, 0, 0, 0];

  const initialUsers = [
    { id: 1, name: 'John Doe', isAdmin: true, color: userColors[0] },
    { id: 2, name: 'Jane Doe', isAdmin: false, color: userColors[1] },
  ];

  const getRandomPastDate = () => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 7); // 0 to 6 days ago
    const randomDate = new Date();
    randomDate.setDate(today.getDate() - daysAgo);
    return randomDate;
  };

  const initialTasks: Task[] = [
    { id: 1, text: 'Buy groceries', emoji: '🛒', points: 5, completed: true, assignedTo: 1, dueDate: getRandomPastDate() },
    { id: 2, text: 'Walk the dog', emoji: '🐕', points: 3, completed: true, assignedTo: 2, dueDate: getRandomPastDate() },
    { id: 3, text: 'Do laundry', emoji: '🧺', points: 4, completed: true, assignedTo: 1, dueDate: getRandomPastDate() },
    { id: 4, text: 'Clean the kitchen', emoji: '🍽️', points: 10, completed: false, assignedTo: 2, dueDate: getRandomPastDate() },
    { id: 5, text: 'Water the plants', emoji: '🌿', points: 5, completed: true, assignedTo: 2, dueDate: getRandomPastDate() },
    { id: 6, text: 'Take out the trash', emoji: '🗑️', points: 2, completed: true, assignedTo: 1, dueDate: getRandomPastDate() },
    { id: 7, text: 'Vacuum the house', emoji: '🧹', points: 8, completed: false, assignedTo: 1, dueDate: getRandomPastDate() },
    { id: 8, text: 'Wash the car', emoji: '🚗', points: 7, completed: true, assignedTo: 2, dueDate: getRandomPastDate() },
    { id: 9, text: 'Organize the garage', emoji: '🔧', points: 10, completed: true, assignedTo: 2, dueDate: getRandomPastDate() },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [points, setPoints] = useState<{ [userId: number]: number[] }>({});

  const calculatePoints = (tasks: Task[]) => {
    const points: { [userId: number]: number[] } = {};
    users.forEach(user => {
      points[user.id] = [...defaultPoints];
    });
    tasks.forEach(task => {
      if (task.completed) {
        const taskDay = new Date(task.dueDate).getDay();
        points[task.assignedTo][taskDay] += task.points;
      }
    });
    return points;
  };

  useEffect(() => {
    setPoints(calculatePoints(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const todayIndex = new Date().getDay();
          if (!task.completed) {
            setPoints(prevPoints => {
              const userPoints = [...prevPoints[task.assignedTo]];
              userPoints[todayIndex] += task.points;
              return { ...prevPoints, [task.assignedTo]: userPoints };
            });
          } else {
            setPoints(prevPoints => {
              const userPoints = [...prevPoints[task.assignedTo]];
              userPoints[todayIndex] -= task.points;
              return { ...prevPoints, [task.assignedTo]: userPoints };
            });
          }
          return { ...task, completed: !task.completed, dueDate: new Date() };
        }
        return task;
      });
      return updatedTasks;
    });
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
      color: userColors[users.length % userColors.length],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setPoints(prevPoints => ({ ...prevPoints, [newUser.id]: [0, 0, 0, 0, 0, 0, 0] }));
  };

  return (
    <PointsContext.Provider value={{ points, tasks, currentUser, users, addTask, toggleTaskCompletion, changeUser, addUser }}>
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
