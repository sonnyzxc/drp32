import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../context/PointsContext';

interface IncompleteTasksProps {
  tasks: Task[];
  users: { id: number; name: string; isAdmin: boolean }[];
  currentUser: { id: number; name: string; isAdmin: boolean };
  calculateDaysDifference: (dueDate: Date) => number;
  confirmTaskCompletion: (taskId: number) => void;
}

const IncompleteTasks: React.FC<IncompleteTasksProps> = ({ tasks, users, currentUser, calculateDaysDifference, confirmTaskCompletion }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Incomplete Tasks</Text>
      {tasks.map(task => {
        const daysDiff = calculateDaysDifference(new Date(task.dueDate));
        return (
          <TouchableOpacity
            key={task.id}
            onPress={() => {
              confirmTaskCompletion(task.id);
            }}
            style={styles.taskContainer}
          >
            <View style={styles.textContainer}>
              <Text style={styles.taskText}>
                {task.emoji} {task.text}
              </Text>
              <Text style={styles.dueDateText}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
              <Text style={styles.dueDateText}>
                {daysDiff >= 0 ? `${daysDiff} days left` : `${Math.abs(daysDiff)} days overdue`}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap', // Ensure text wraps
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default IncompleteTasks;
