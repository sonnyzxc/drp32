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
}

interface PointsContextProps {
  points: { [userId: number]: number[] }; // User-specific points
  tasks: Task[];
  currentUser: User;
  users: User[];
  addPoints: (userId: number, index: number, points: number) => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  markTaskAsIncomplete: (task: Task) => void;
  changeUser: (userId: number) => void;
  addUser: (name: string, isAdmin: boolean) => void;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultPoints = [0, 0, 0, 0, 0, 0, 0];

  const initialUsers = [
    { id: 1, name: 'John Doe', isAdmin: true },
    { id: 2, name: 'Jane Doe', isAdmin: false },
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

  const calculatePoints = () => {
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

  const [points, setPoints] = useState<{ [userId: number]: number[] }>(calculatePoints);

  useEffect(() => {
    setPoints(calculatePoints());
  }, [tasks, users]);

  const addPoints = (userId: number, index: number, newPoints: number) => {
    setPoints(prevPoints => {
      const userPoints = prevPoints[userId] ? [...prevPoints[userId]] : [0, 0, 0, 0, 0, 0, 0];
      userPoints[index] += newPoints;
      return { ...prevPoints, [userId]: userPoints };
    });
  };

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
    setPoints(calculatePoints());
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      });
      setPoints(calculatePoints());
      return updatedTasks;
    });
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`https://be-drp32-5ac34b8c912e.herokuapp.com/chore/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setPoints(calculatePoints());
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 100000);
  };
  
  const markTaskAsIncomplete = async (task: Task) => {
    await deleteTask(task.id);
    addTask({
      ...task,
      completed: false,
      id: generateUniqueId(), // Use generateUniqueId for a unique ID
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
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setPoints(prevPoints => ({ ...prevPoints, [newUser.id]: [0, 0, 0, 0, 0, 0, 0] }));
  };

  return (
    <PointsContext.Provider value={{ points, tasks, currentUser, users, addPoints, addTask, toggleTaskCompletion, deleteTask, markTaskAsIncomplete, changeUser, addUser }}>
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
