import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../context/PointsContext';

interface CompletedTasksProps {
  tasks: Task[];
  users: { id: number; name: string; isAdmin: boolean }[];
  onTaskPress: (task: Task) => void; // New prop for handling task press
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks, users, onTaskPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Chore History</Text>
      {tasks.map(task => (
        <TouchableOpacity key={task.id} style={styles.taskContainer} onPress={() => onTaskPress(task)}>
          <Text style={styles.taskText}>
            {task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}
          </Text>
          <Text style={styles.dueDateText}>Completed on: {new Date(task.completedDate).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CompletedTasks;
