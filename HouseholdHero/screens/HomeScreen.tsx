import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, Platform } from 'react-native';
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
  const [newTaskPoints, setNewTaskPoints] = useState(0);
  const [assignedUserId, setAssignedUserId] = useState(users[0].id);
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const incompleteTasks = tasks.filter(task => !task.completed);

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
  const userPoints = points[currentUser.id] || [0, 0, 0, 0, 0, 0, 0];
  const chartData = labels.map((label, index) => ({ label, value: userPoints[index] }));

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      emoji: newTaskEmoji,
      points: newTaskPoints,
      completed: false,
      assignedTo: assignedUserId,
      dueDate: newTaskDueDate,
    };
    addTask(newTask);
    setNewTaskText('');
    setNewTaskEmoji('');
    setNewTaskPoints(0);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Weekly Chore Points</Text>
        <View style={styles.chartContainer}>
          <BarGraph data={chartData} />
        </View>
        <Text style={styles.totalPointsText}>Total Points: {userPoints.reduce((a, b) => a + b, 0)}</Text>

        <Text style={styles.subHeaderText}>Incomplete Tasks</Text>
        {incompleteTasks.map(task => {
          const daysDiff = calculateDaysDifference(new Date(task.dueDate));
          return (
            <View key={task.id} style={styles.taskContainer}>
              <Text style={styles.taskText}>
                {task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}
              </Text>
              <Text style={styles.dueDateText}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
              <Text style={styles.dueDateText}>
                {daysDiff >= 0 ? `${daysDiff} days left` : `${Math.abs(daysDiff)} days overdue`}
              </Text>
            </View>
          );
        })}

        {currentUser.isAdmin && (
          <>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsAddTaskVisible(!isAddTaskVisible)}>
              <Text style={styles.addButtonText}>{isAddTaskVisible ? '-' : '+'}</Text>
            </TouchableOpacity>
            {isAddTaskVisible && (
              <View style={styles.adminContainer}>
                <Text style={styles.subHeaderText}>Add New Task</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Task Name"
                  value={newTaskText}
                  onChangeText={setNewTaskText}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Emoji"
                  value={newTaskEmoji}
                  onChangeText={setNewTaskEmoji}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Points"
                  value={newTaskPoints.toString()}
                  onChangeText={(text) => setNewTaskPoints(parseInt(text) || 0)}
                  keyboardType="numeric"
                />
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
                <TouchableOpacity style={styles.submitButton} onPress={() => setIsConfirmVisible(true)}>
                  <Text style={styles.submitButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
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

