import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text } from 'react-native';
import ToDoItem from '../components/ToDoItem';

const TasksScreen: React.FC = () => {
  const todoList = [
    { id: 1, text: 'Buy groceries', emoji: '🛒' },
    { id: 2, text: 'Walk the dog', emoji: '🐕' },
    { id: 3, text: 'Do laundry', emoji: '🧺' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {todoList.map(item => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </ScrollView>
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
});

export default TasksScreen;
