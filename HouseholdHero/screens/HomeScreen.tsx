import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarGraph from '../components/BarGraph';
import ConfirmationModal from '../components/ConfirmationModal';
import { usePoints } from '../context/PointsContext';

const screenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  const { points, tasks, currentUser, users, addTask } = usePoints();
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskEmoji, setNewTaskEmoji] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState(0);
  const [assignedUserId, setAssignedUserId] = useState(users[0].id);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const incompleteTasks = tasks.filter(task => !task.completed);

  // Weekly labels
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
    };
    addTask(newTask);
    setNewTaskText('');
    setNewTaskEmoji('');
    setNewTaskPoints(0);
    setIsAddTaskVisible(false);
    setIsConfirmVisible(false);
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
        {incompleteTasks.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskText}>{task.emoji} {task.text} - Assigned to {users.find(user => user.id === task.assignedTo)?.name}</Text>
          </View>
        ))}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: 20,
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
  },
  adminContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  userPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  userOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedUser: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

