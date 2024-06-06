import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text } from 'react-native';
import ToDoItem from '../components/ToDoItem';
import ConfirmationModal from '../components/ConfirmationModal';
import { usePoints } from '../context/PointsContext';
import styles from '../styles/TasksScreenStyles'; // Import the styles

const TasksScreen: React.FC = () => {
  const { tasks, currentUser, toggleTaskCompletion } = usePoints();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Filter tasks assigned to the current user and not completed
  const userTasks = tasks.filter(task => task.assignedTo === currentUser.id && !task.completed);

  // Group tasks by their due dates
  const groupedTasks = userTasks.reduce((acc, task) => {
    const dueDate = new Date(task.dueDate).toLocaleDateString();
    if (!acc[dueDate]) {
      acc[dueDate] = [];
    }
    acc[dueDate].push(task);
    return acc;
  }, {});

  const handleToggleTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsConfirmVisible(true);
  };

  const handleConfirmToggle = () => {
    if (selectedTaskId !== null) {
      toggleTaskCompletion(selectedTaskId, imageUri);
      setSelectedTaskId(null);
    }
    setIsConfirmVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Tasks</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Object.entries(groupedTasks).map(([dueDate, tasks]) => (
          <View key={dueDate}>
            <Text style={styles.dueDateTitle}>Due: {dueDate}</Text>
            {tasks.map(task => (
              <View key={task.id}>
                <ToDoItem item={task} onToggle={() => handleToggleTask(task.id)} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <ConfirmationModal
        visible={isConfirmVisible}
        onSelectPhoto={setImageUri}
        onConfirm={handleConfirmToggle}
        onCancel={() => setIsConfirmVisible(false)}
        message="Are you sure you want to mark this task as complete?"
      />
    </SafeAreaView>
  );
};

export default TasksScreen;

