import React from 'react';
import ToDoItem from '@/components/ToDoItem';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '@/navigation/BottomTabNavigation';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { PointsProvider } from '@/context/PointsContext';

const App: React.FC = () => {
  return (
    <PointsProvider>
    <BottomTabNavigator />
    </PointsProvider>
  );
};

export default App;

/*
const App = () => {
  const todoList = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Walk the dog' },
    { id: 3, text: 'Do laundry' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
    backgroundColor: '#fff',
  },
});

export default App;
*/
