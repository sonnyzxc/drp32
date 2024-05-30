import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text } from 'react-native';
import ToDoItem from '../components/ToDoItem';
import ConfirmationModal from '../components/ConfirmationModal';
import { usePoints } from '../context/PointsContext';

const TasksScreen: React.FC = () => {
  const { tasks, currentUser, toggleTaskCompletion } = usePoints();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // Filter tasks assigned to the current user and not completed
  const userTasks = tasks.filter(task => task.assignedTo === currentUser.id && !task.completed);

  const handleToggleTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsConfirmVisible(true);
  };

  const handleConfirmToggle = () => {
    if (selectedTaskId !== null) {
      toggleTaskCompletion(selectedTaskId);
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
        {userTasks.length > 0 ? (
          userTasks.map(task => (
            <ToDoItem key={task.id} item={task} onToggle={() => handleToggleTask(task.id)} />
          ))
        ) : (
          <Text style={styles.noTasksText}>No tasks assigned to you.</Text>
        )}
      </ScrollView>
      <ConfirmationModal
        visible={isConfirmVisible}
        onConfirm={handleConfirmToggle}
        onCancel={() => setIsConfirmVisible(false)}
        message="Are you sure you want to mark this task as complete?"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    paddingVertical: 10,
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});

export default TasksScreen;