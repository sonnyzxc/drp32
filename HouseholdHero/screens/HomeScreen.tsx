import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import BarGraph from '../components/BarGraph';
import ConfirmationModal from '../components/ConfirmationModal';
import { usePoints } from '../context/PointsContext';
import styles from '../styles/HomeScreenStyles'; // Import the styles

const screenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  const { points, tasks, currentUser, users, addTask } = usePoints();
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskEmoji, setNewTaskEmoji] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState(3); // Default selected points
  const [assignedUserId, setAssignedUserId] = useState(users[0].id);
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

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
    const totalPoints = Array(7).fill(0);
    for (const userId in points) {
      points[userId].forEach((point, index) => {
        totalPoints[index] += point;
      });
    }
    return totalPoints;
  };

  const combinedPoints = aggregatePoints();
  const chartData = labels.map((label, index) => ({ label, value: combinedPoints[index] }));

  const handleAddTask = () => {
    const newTask = {
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
    setIsConfirmVisible(false);
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

        {isHistoryVisible && (
          <View style={styles.historyContainer}>
            <Text style={styles.subHeaderText}>Chore History</Text>
            {completedTasks.map(task => (
              <View key={task.id} style={styles.taskContainer}>
                <Text style={styles.taskText}>
                  {task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}
                </Text>
                <Text style={styles.dueDateText}>Completed on: {new Date(task.dueDate).toLocaleDateString()}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.subHeaderText}>Incomplete Tasks</Text>
        {incompleteTasks.map(task => {
          const daysDiff = calculateDaysDifference(new Date(task.dueDate));
          return (
            <View key={task.id} style={styles.taskContainer}>
              <View style={styles.taskTextContainer}>
                <Text style={styles.taskText}>
                  {task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}
                </Text>
                <Text style={styles.dueDateText}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
                <Text style={styles.dueDateText}>
                  {daysDiff >= 0 ? `${daysDiff} days left` : `${Math.abs(daysDiff)} days overdue`}
                </Text>
              </View>
            </View>
          );
        })}

        {isAddTaskVisible && (
          <View style={styles.adminContainer}>
            <Text style={styles.subHeaderText}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              value={newTaskText}
              onChangeText={setNewTaskText}
            />
            <Text style={styles.inputLabel}>Points (difficulty):</Text>
            <View style={styles.pointsLabelContainer}>
              <Text style={styles.pointsLabelText}>Easy</Text>
              <Text style={styles.pointsLabelText}>Hard</Text>
            </View>
            <View style={styles.pointsContainer}>
              {[1, 2, 3, 4, 5].map(point => (
                <TouchableOpacity
                  key={point}
                  style={[styles.pointBox, newTaskPoints === point && styles.selectedPointBox]}
                  onPress={() => selectPoints(point)}
                >
                  <Text style={styles.pointText}>{point}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Text style={styles.datePickerButtonText}>Select Due Date</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={newTaskDueDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Text style={styles.selectedDateText}>Selected Date: {newTaskDueDate.toLocaleDateString()}</Text>
            <Text style={styles.inputLabel}>Assign To:</Text>
            <View style={styles.userPicker}>
              {users.map(user => (
                <TouchableOpacity key={user.id} onPress={() => setAssignedUserId(user.id)}>
                  <Text style={[styles.userOption, assignedUserId === user.id && styles.selectedUser]}>
                    {user.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Emoji (optional, e.g., 😊)"
              value={newTaskEmoji}
              onChangeText={setNewTaskEmoji}
            />
            <TouchableOpacity style={styles.submitButton} onPress={() => setIsConfirmVisible(true)}>
              <Text style={styles.submitButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {currentUser.isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={scrollToAddTask}>
          <Text style={styles.addButtonText}>{isAddTaskVisible ? '-' : '+'}</Text>
        </TouchableOpacity>
      )}

      <ConfirmationModal
        visible={isConfirmVisible}
        onConfirm={handleAddTask}
        onCancel={() => setIsConfirmVisible(false)}
        message="Are you sure you want to add this task?"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

