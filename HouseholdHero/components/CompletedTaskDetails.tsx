import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Task, usePoints } from '../context/PointsContext';
import TaskIncompleteModal from '../components/TaskIncompleteModal';

interface CompletedTaskDetailsProps {
  visible: boolean;
  onClose: () => void;
  task: Task | null;
  users: { id: number; name: string; isAdmin: boolean }[];
  imageUrl: string | null;
  onTaskMarkedIncomplete: () => void;
}

const CompletedTaskDetails: React.FC<CompletedTaskDetailsProps> = ({ visible, onClose, task, users, imageUrl, onTaskMarkedIncomplete, }) => {
  const { currentUser, markTaskAsIncomplete } = usePoints();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const confirmMarkAsIncomplete = () => {
    setSelectedTask(task);
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    if (selectedTask) {
      markTaskAsIncomplete(selectedTask);
      setSelectedTask(null);
      onTaskMarkedIncomplete();
    }
    setIsConfirmVisible(false);
  };

  if (!task) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.taskName}>{task.emoji} {task.text}</Text>
          <Text style={styles.label}>Completed By: {users.find(user => user.id === task.completedBy)?.name}</Text>
          <Text style={styles.label}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
          <Text style={styles.label}>Completed Date: {new Date(task.completedDate).toLocaleDateString()}</Text>
          <Text style={styles.label}>Points: {task.points}</Text>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.noPhotoText}>No photo uploaded</Text>
          )}
          {currentUser.isAdmin && (
                <TouchableOpacity
                  style={styles.incompleteButton}
                  onPress={() => confirmMarkAsIncomplete(task)}
                >
                  <Text style={styles.incompleteButtonText}>Mark as Incomplete</Text>
                </TouchableOpacity>
              )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TaskIncompleteModal
        visible={isConfirmVisible}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmVisible(false)}
        message="Are you sure you want to mark this task as incomplete?"
      />
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
  taskName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
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
    marginVertical: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  incompleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  incompleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CompletedTaskDetails;
