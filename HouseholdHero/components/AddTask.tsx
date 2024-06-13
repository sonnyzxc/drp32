import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddTaskProps {
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  newTaskEmoji: string;
  setNewTaskEmoji: (text: string) => void;
  newTaskPoints: number;
  setNewTaskPoints: (points: number) => void;
  newTaskDueDate: Date;
  setNewTaskDueDate: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  handleDateChange: (event: any, date: Date | undefined) => void;
  selectPoints: (points: number) => void;
  users: { id: number; name: string; isAdmin: boolean }[];
  handleAddTask: () => void;
  setIsConfirmVisible: (visible: boolean) => void;
}

const AddTask: React.FC<AddTaskProps> = ({
  newTaskText,
  setNewTaskText,
  newTaskEmoji,
  setNewTaskEmoji,
  newTaskPoints,
  setNewTaskPoints,
  newTaskDueDate,
  setNewTaskDueDate,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
  selectPoints,
  users,
  handleAddTask,
  setIsConfirmVisible,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={newTaskText}
        onChangeText={setNewTaskText}
      />
      <TouchableOpacity
        style={styles.advancedButton}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <Text style={styles.advancedButtonText}>
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </Text>
      </TouchableOpacity>
      {showAdvanced && (
        <>
          <Text style={styles.inputLabel}>Points (optional):</Text>
          <View style={styles.pointsLabelContainer}>
            <Text style={styles.pointsLabelText}>Easy</Text>
            <Text style={styles.pointsLabelText}>Hard</Text>
          </View>
          <View style={styles.pointsContainer}>
            {[1, 2, 3, 4, 5].map((point) => (
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
          <Text style={styles.selectedDateText}>
            Selected Date: {newTaskDueDate.toLocaleDateString()}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Emoji (optional, e.g., 😊)"
            value={newTaskEmoji}
            onChangeText={setNewTaskEmoji}
          />
        </>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={() => setIsConfirmVisible(true)}>
        <Text style={styles.submitButtonText}>Add Task</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  advancedButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  advancedButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  pointsLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointsLabelText: {
    fontSize: 14,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pointBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedPointBox: {
    backgroundColor: '#007AFF',
  },
  pointText: {
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
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

export default AddTask;
