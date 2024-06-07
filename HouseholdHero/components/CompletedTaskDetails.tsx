import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { Task } from '../context/PointsContext';

interface TaskDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  task: Task | null;
  users: { id: number; name: string; isAdmin: boolean }[];
  imageUrl: string | null;
}

const CompletedTaskDetails: React.FC<TaskDetailsModalProps> = ({ visible, onClose, task, users, imageUrl }) => {
  if (!task) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.taskName}>{task.emoji} {task.text}</Text>
          <Text style={styles.label}>Assigned To: {users.find(user => user.id === task.assignedTo)?.name}</Text>
          <Text style={styles.label}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
          <Text style={styles.label}>Completed Date: {new Date(task.completedDate).toLocaleDateString()}</Text>
          <Text style={styles.label}>Points: {task.points}</Text>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.noPhotoText}>No photo uploaded</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  emoji: {
    fontSize: 40,
  },
  taskName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  noPhotoText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CompletedTaskDetails;
