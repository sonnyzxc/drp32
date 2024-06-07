import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarGraph from '../components/BarGraph';
import ConfirmationModal from '../components/ConfirmationModal';
import TaskAdditionModal from '../components/TaskAdditionModal';
import CompletedTaskDetails from '../components/CompletedTaskDetails'; // Import TaskDetailsModal
import { usePoints, Task } from '../context/PointsContext';
import IncompleteTasks from '../components/IncompleteTasks';
import CompletedTasks from '../components/CompletedTasks';
import AddTask from '../components/AddTask';
import styles from '../styles/HomeScreenStyles';

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
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // State for image modal visibility
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null); // State for selected image URL

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

    const totalPoints = Array(7).fill(0).map(() => users.map(() => 0));

    completedTasks.forEach(task => {
      const completedDate = task.completedDate.toDateString();
      const index = last7Days.indexOf(completedDate);
      if (index !== -1) {
        totalPoints[index][task.assignedTo - 1] += task.points;
      }
    });

    return totalPoints.reverse(); // Reverse to match the labels
  };

  const combinedPoints = aggregatePoints();
  const chartData = labels.map((label, index) => ({
    label,
    users: combinedPoints[index].map((value, userId) => ({ value, userId: userId + 1 }))
  }));

  const handleAddTask = () => {
    const newTask: Task = {
      id: -1,
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

  const handleTaskPress = (task: Task) => {
    setSelectedTaskId(task.id);
    setSelectedImageUrl(task.imgDir);
    setIsImageModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Weekly Chore Points</Text>
        <View style={styles.chartContainer}>
          <BarGraph data={chartData} users={users} />
        </View>
        <Text style={styles.totalPointsText}>Total Points: {combinedPoints.flat().reduce((a, b) => a + b, 0)}</Text>

        <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
          <Text style={styles.historyButtonText}>{isHistoryVisible ? 'Hide History' : 'Show History'}</Text>
        </TouchableOpacity>

        {isHistoryVisible && <CompletedTasks tasks={completedTasks} users={users} onTaskPress={handleTaskPress} />}

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
      <TaskAdditionModal
        visible={isAddConfirmVisible}
        onConfirm={handleAddTask}
        onCancel={() => setIsAddConfirmVisible(false)}
        message="Are you sure you want to add this task?"
      />
      <CompletedTaskDetails
        visible={isImageModalVisible}
        onClose={() => setIsImageModalVisible(false)}
        task={tasks.find((value, index) => value.id == selectedTaskId)}
        users={users}
        imageUrl={selectedImageUrl}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
