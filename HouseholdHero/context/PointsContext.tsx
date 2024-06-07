import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  text: string;
  emoji?: string;
  points: number;
  completed: boolean;
  assignedTo: number; // User ID of the assigned user
  dueDate: Date;
  completedDate?: Date;
  imgDir?: string;
}

interface User {
  id: number;
  name: string;
  isAdmin: boolean;
  color: string;
}

interface PointsContextProps {
  points: { [userId: number]: number[] }; // User-specific points
  tasks: Task[];
  currentUser: User;
  users: User[];
  addPoints: (userId: number, index: number, points: number) => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: number, imageUri: string | null) => void;
  changeUser: (userId: number) => void;
  addUser: (name: string, isAdmin: boolean) => void;
}

const PointsContext = createContext<PointsContextProps | undefined>(undefined);

const userColors = ['#6a11cb', '#2575fc', '#fc2575', '#fca311', '#00b4d8'];

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const today = new Date().getDay();
  const defaultPoints = [0, 0, 0, 0, 0, 0, 0];

  const rotateArray = (arr: number[], rotateBy: number) => {
    return arr.slice(rotateBy).concat(arr.slice(0, rotateBy));
  };

  const initializePoints = () => {
    // Initialize points to a default value for all days
    return rotateArray(defaultPoints, today + 1);
  };

  const initialPoints = {
    1: initializePoints(),
    2: initializePoints(),
  };

  const [points, setPoints] = useState<{ [userId: number]: number[] }>(initialPoints);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Elizabeth', isAdmin: true, color: userColors[0] },
    { id: 2, name: 'James', isAdmin: false, color: userColors[1] },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const formatTaskFromApi = (task: any): Task => {
    return {
      id: task.chore_id,
      text: task.description, // Assuming the API returns `description` instead of `text`
      emoji: task.emoji,
      points: task.points, // Assuming the API returns `reward_points` instead of `points`
      completed: task.completed, // Assuming the API returns `is_done` instead of `completed`
      assignedTo: task.assigned_to, // Assuming the API returns `user_id` instead of `assignedTo`
      dueDate: new Date(task.due_date), // Assuming the API returns `due_date` instead of `dueDate`
      completedDate: new Date(task.time_completed),
      imgDir: task.img_dir,
    };
  };

  useEffect(() => {
    // Fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://be-drp32-5ac34b8c912e.herokuapp.com/chores?familyID=1', {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setTasks(data.chores.map(formatTaskFromApi));
        console.log(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

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

  const formatTaskForApi = (task: Task) => {
    return {
      "description": task.text,
      "emoji": task.emoji,
      "points": task.points,
      "assigned-to": task.assignedTo,
      "due-date": task.dueDate.toISOString().substring(0, 10), // Convert Date to ISO string
    };
  };

  const addTask = async (task: Task) => {
    try {
      const response = await fetch('https://be-drp32-5ac34b8c912e.herokuapp.com/chore', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatTaskForApi(task)),
      });

      if (!response.ok) {
        throw new Error("Error adding task");
      }

      const data = await response.json();
      setTasks(prevTasks => [...prevTasks, formatTaskFromApi(data.chore)]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId: number, imageUri: string | null) => {
    const currentDayIndex = new Date().getDay();
    console.log('Current day index:', currentDayIndex);

    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    const formData = new FormData();
    if (imageUri) {
      const file = {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpeg",
      };
      formData.append("file", file as any);
    }

    try {
      const response = await fetch(`https://be-drp32-5ac34b8c912e.herokuapp.com/chore/complete/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const data = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? formatTaskFromApi(data.chore) : task));
      addPoints(taskToUpdate.assignedTo, currentDayIndex, updatedTask.completed ? taskToUpdate.points : -taskToUpdate.points);
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
