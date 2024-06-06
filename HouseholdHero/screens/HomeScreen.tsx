import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import BarGraph from '../components/BarGraph';
import ConfirmationModal from '../components/ConfirmationModal';
import TaskBreakdownModal from '../components/TaskBreakdownModal';
import { usePoints, Task } from '../context/PointsContext'; // Import Task interface and usePoints
import IncompleteTasks from '../components/IncompleteTasks'; // Import IncompleteTasks component
import CompletedTasks from '../components/CompletedTasks'; // Import CompletedTasks component
import AddTask from '../components/AddTask'; // Import AddTask component
import styles from '../styles/HomeScreenStyles'; // Import the styles

const screenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  const { points, tasks, currentUser, users, addTask, toggleTaskCompletion } = usePoints();
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskEmoji, setNewTaskEmoji] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState(3); // Default selected points
  const [assignedUserId, setAssignedUserId] = useState(users[0].id);
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isCompleteConfirmVisible, setIsCompleteConfirmVisible] = useState(false);
  const [isAddConfirmVisible, setIsAddConfirmVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView

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

    const pointsByDay = Array(7).fill(0);

    completedTasks.forEach(task => {
      const completedDate = task.completedDate.toDateString();
      const index = last7Days.indexOf(completedDate);
      if (index !== -1) {
        pointsByDay[index] += task.points;
      }
    });

    return pointsByDay.reverse(); // Reverse to match the labels
  };

  const combinedPoints = aggregatePoints();
  const chartData = labels.map((label, index) => ({ label, value: combinedPoints[index] }));

  const handleAddTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      text: newTaskText,
      emoji: newTaskEmoji || '😊',
      points: newTaskPoints,
      completed: false,
      assignedTo: assignedUserId,
      dueDate: newTaskDueDate,
    };
    addTask(newTask);
    setNewTaskText('');
    setNewTaskEmoji('');
    setNewTaskPoints(3); // Reset to default selected points
    setNewTaskDueDate(new Date());
    setIsAddTaskVisible(false);
    setIsCompleteConfirmVisible(false);
    setIsAddConfirmVisible(false);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Hide the picker on Android after selection
    }
    if (selectedDate) {
      setNewTaskDueDate(selectedDate);
    }
  };

  const calculateDaysDifference = (dueDate: Date) => {
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    return dayDiff;
  };

  const scrollToAddTask = () => {
    setIsAddTaskVisible(!isAddTaskVisible);
    if (!isAddTaskVisible) {
      // Delay scrolling to ensure the layout is updated
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Weekly Chore Points</Text>
        <View style={styles.chartContainer}>
          <BarGraph data={chartData} />
        </View>
        <Text style={styles.totalPointsText}>Total Points: {combinedPoints.reduce((a, b) => a + b, 0)}</Text>

        <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
          <Text style={styles.historyButtonText}>{isHistoryVisible ? 'Hide History' : 'Show History'}</Text>
        </TouchableOpacity>

        {isHistoryVisible && <CompletedTasks tasks={completedTasks} users={users} />}

        <IncompleteTasks tasks={incompleteTasks} users={users} currentUser={currentUser} calculateDaysDifference={calculateDaysDifference} confirmTaskCompletion={confirmTaskCompletion} />

        {isAddTaskVisible && (
          <AddTask
            newTaskText={newTaskText}
            setNewTaskText={setNewTaskText}
            newTaskEmoji={newTaskEmoji}
            setNewTaskEmoji={setNewTaskEmoji}
            newTaskPoints={newTaskPoints}
            setNewTaskPoints={setNewTaskPoints}
            assignedUserId={assignedUserId}
            setAssignedUserId={setAssignedUserId}
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
      <ConfirmationModal
        visible={isAddConfirmVisible}
        onSelectPhoto={setImageUri}
        onConfirm={handleAddTask}
        onCancel={() => setIsAddConfirmVisible(false)}
        message="Are you sure you want to add this task?"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

