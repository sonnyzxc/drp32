import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Platform, View, Text, ScrollView, TouchableOpacity, Modal, Dimensions, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmationModal from '../components/ConfirmationModal';
import TaskAdditionModal from '../components/TaskAdditionModal';
import CompletedTaskDetails from '../components/CompletedTaskDetails';
import { usePoints, Task } from '../context/PointsContext';
import IncompleteTasks from '../components/IncompleteTasks';
import CompletedTasks from '../components/CompletedTasks';
import AddTask from '../components/AddTask';
import styles from '../styles/HomeScreenStyles';
import { useTaskAddTimer } from '../utils/metrics';
import { connectWebSocket, closeWebSocket } from '../services/websocket';
import PeriodicMessageSender from '../components/PeriodicMessageSender';

const HomeScreen: React.FC = () => {
  const { points, tasks, currentUser, users, addTask, toggleTaskCompletion, fetchTasks } = usePoints();
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskEmoji, setNewTaskEmoji] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState(3);
  const [newTaskRecurring, setNewTaskRecurring] = useState<number | null>(null);
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isCompleteConfirmVisible, setIsCompleteConfirmVisible] = useState(false);
  const [isAddConfirmVisible, setIsAddConfirmVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  const { startTaskAddTimer, endTaskAddTimer } = useTaskAddTimer();

  useEffect(() => {
    connectWebSocket(handleUpdate);
    return () => {
      closeWebSocket();
    };
  }, []);

  const handleUpdate = () => {
    // Logic to update data when receiving WebSocket updates
    // You may need to refetch data or update state here
    console.log('Updating data...');
    fetchTasks(); // Example: If you need to refetch tasks
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const getLast7Days = () => {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let labels = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      labels.push(days[day.getDay()]);
    }
    return labels;
  };

  const labels = getLast7Days();

  const aggregatePoints = () => {
    const today = new Date();
    const last7Days = Array(7).fill(0).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toDateString();
    });

    const totalPoints = Array(7).fill(0).map(() => users.map(() => 0));

    completedTasks.forEach(task => {
      const completedDate = task.completedDate.toDateString();
      const index = last7Days.indexOf(completedDate);
      if (index !== -1) {
        totalPoints[index][task.completedBy - 1] += task.points;
      }
    });

    return totalPoints.reverse();
  };

  const combinedPoints = aggregatePoints();
  const timelineData = completedTasks
  .sort((a, b) => a.completedDate.getTime() - b.completedDate.getTime()).reverse()
  .map(task => ({
    key: `${task.id}`,
    emoji: task.emoji,
    taskName: task.text,
    day: task.completedDate.toLocaleDateString(),
    user: users.find(user => user.id === task.completedBy)?.name || 'Unknown'
  }));

  const handleAddTask = () => {
    const taskAddDuration = endTaskAddTimer();
    if (taskAddDuration !== null) {
      // Handle task add duration here if needed
    }

    const newTask: Task = {
      id: tasks.length + 1,
      text: newTaskText,
      emoji: newTaskEmoji || '😊',
      points: newTaskPoints,
      completed: false,
      dueDate: newTaskDueDate,
      recurring: newTaskRecurring !== null ? newTaskRecurring : 0,
    };
    addTask(newTask);
    setNewTaskText('');
    setNewTaskEmoji('');
    setNewTaskPoints(3);
    setNewTaskRecurring(null);
    setNewTaskDueDate(new Date());
    setIsAddTaskVisible(false);
    setIsCompleteConfirmVisible(false);
    setIsAddConfirmVisible(false);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setNewTaskDueDate(selectedDate);
    }
  };

  const calculateDaysDifference = (dueDate: Date) => {
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  const scrollToAddTask = () => {
    setIsAddTaskVisible(!isAddTaskVisible);
    if (!isAddTaskVisible) {
      startTaskAddTimer();
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 300);
    }
  };

  const selectPoints = (points: number) => {
    setNewTaskPoints(points);
  };

  const toggleHistory = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const confirmTaskCompletion = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsCompleteConfirmVisible(true);
  };

  const handleConfirmCompletion = () => {
    if (selectedTaskId !== null) {
      toggleTaskCompletion(selectedTaskId, imageUri);
      setSelectedTaskId(null);
    }
    setIsCompleteConfirmVisible(false);
    setImageUri(null);
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTaskId(task.id);
    setSelectedImageUrl(task.imgDir);
    setIsImageModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Chore Completion Timeline</Text>
        <FlatList
          horizontal
          data={timelineData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTaskPress(tasks.find(task => task.id === parseInt(item.key))!)}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineEmojiContainer}>
                  <Text style={styles.timelineEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTaskName}>{item.taskName}</Text>
                  <Text style={styles.timelineDay}>{item.day}</Text>
                  <Text style={styles.timelineUser}>Completed by: {item.user}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.timelineContainer}
        />
        <IncompleteTasks tasks={incompleteTasks} users={users} currentUser={currentUser} calculateDaysDifference={calculateDaysDifference} confirmTaskCompletion={confirmTaskCompletion} />
        {isAddTaskVisible && (
          <AddTask
            newTaskText={newTaskText}
            setNewTaskText={setNewTaskText}
            newTaskEmoji={newTaskEmoji}
            setNewTaskEmoji={setNewTaskEmoji}
            newTaskPoints={newTaskPoints}
            setNewTaskPoints={setNewTaskPoints}
            recurring={newTaskRecurring}
            setRecurring={setNewTaskRecurring}
            newTaskDueDate={newTaskDueDate}
            setNewTaskDueDate={setNewTaskDueDate}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            handleDateChange={handleDateChange}
            selectPoints={selectPoints}
            users={users}
            handleAddTask={handleAddTask}
            setIsConfirmVisible={setIsAddConfirmVisible}
          />
        )}
      </ScrollView>
      {currentUser.isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={scrollToAddTask}>
          <Text style={styles.addButtonText}>{isAddTaskVisible ? '-' : '+'}</Text>
        </TouchableOpacity>
      )}
      <ConfirmationModal
        visible={isCompleteConfirmVisible}
        onSelectPhoto={setImageUri}
        onConfirm={handleConfirmCompletion}
        onCancel={() => setIsCompleteConfirmVisible(false)}
        message="Are you sure you want to mark this task as complete?"
      />
      <TaskAdditionModal
        visible={isAddConfirmVisible}
        onConfirm={handleAddTask}
        onCancel={() => setIsAddConfirmVisible(false)}
        message="Are you sure you want to add this task?"
      />
      <CompletedTaskDetails
        visible={isImageModalVisible}
        onClose={() => setIsImageModalVisible(false)}
        task={tasks.find(value => value.id === selectedTaskId)}
        users={users}
        imageUrl={selectedImageUrl}
        onTaskMarkedIncomplete={() => setIsImageModalVisible(false)}
      />
      <PeriodicMessageSender />
    </SafeAreaView>
  );
};

export default HomeScreen;
