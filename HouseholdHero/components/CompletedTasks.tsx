import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../context/PointsContext';
import { usePoints } from '../context/PointsContext';
import ConfirmationModal from '../components/ConfirmationModal';

interface CompletedTasksProps {
  tasks: Task[];
  users: { id: number; name: string; isAdmin: boolean }[];
  onTaskPress: (task: Task) => void; // New prop for handling task press
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks, users, onTaskPress }) => {
  const { currentUser, markTaskAsIncomplete } = usePoints();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const confirmMarkAsIncomplete = (task: Task) => {
    setSelectedTask(task);
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    if (selectedTask) {
      markTaskAsIncomplete(selectedTask);
      setSelectedTask(null);
    }
    setIsConfirmVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Chore History</Text>
      {tasks.map(task => (
        <TouchableOpacity key={task.id} style={styles.taskContainer} onPress={() => onTaskPress(task)}>
          <View style={styles.textContainer}>
            <Text style={styles.taskText}>
              {task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}
            </Text>
            <View style={styles.dateAndButtonContainer}>
              <Text style={styles.dueDateText}>Completed on: {new Date(task.dueDate).toLocaleDateString()}</Text>
              {currentUser.isAdmin && (
                <TouchableOpacity
                  style={styles.incompleteButton}
                  onPress={() => confirmMarkAsIncomplete(task)}
                >
                  <Text style={styles.incompleteButtonText}>Mark as Incomplete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <ConfirmationModal
        visible={isConfirmVisible}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmVisible(false)}
        message="Are you sure you want to mark this task as incomplete?"
      />
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
    flex: 1,
    flexDirection: 'column',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap', // Ensure text wraps
  },
  dateAndButtonContainer: {
    flexDirection: 'column', // Align date and button vertically
    alignItems: 'flex-start',
    marginTop: 5,
  },
  dueDateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5, // Add space between date text and button
  },
  incompleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5, // Adjust padding to make it smaller
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incompleteButtonText: {
    color: '#fff',
    fontSize: 12, // Adjust font size to make it smaller
  },
});

export default CompletedTasks;
