import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarGraph from '../components/BarGraph';
import { usePoints } from '../context/PointsContext';
import styles from '../styles/InsightScreenStyles';

const InsightScreen: React.FC = () => {
  const { points, tasks, users } = usePoints();
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);

  const userTasks = tasks.filter(task => task.completedBy === selectedUserId);
  const completedTasks = userTasks.filter(task => task.completed);
  const incompleteTasks = userTasks.filter(task => !task.completed);

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
  const aggregatePointsForUser = () => {
    const today = new Date();
    const last7Days = Array(7).fill(0).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toDateString();
    });

    const pointsByDay = Array(7).fill(0);

    completedTasks.forEach(task => {
        const completedDate = new Date(task.completedDate).toDateString();
        const index = last7Days.indexOf(completedDate);
        if (index !== -1) {
            pointsByDay[index] += task.points;
        }
    });

    return pointsByDay.reverse(); // Reverse to match the labels
  };

  const selectedUserPoints = aggregatePointsForUser();
  const chartData = labels.map((label, index) => ({ 
    label, 
    users: [{ value: selectedUserPoints[index], userId: selectedUserId }],
  }));

  const calculateDaysDifference = (dueDate: Date) => {
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>User Insights</Text>

        <View style={styles.userPicker}>
          {users.map(user => (
            <TouchableOpacity key={user.id} onPress={() => setSelectedUserId(user.id)} style={[styles.userButton, selectedUserId === user.id && styles.selectedUserButton]}>
              <Text style={[styles.userButtonText, selectedUserId === user.id && styles.selectedUserButtonText]}>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subHeaderText}>Weekly Points</Text>
        <View style={styles.chartContainer}>
          <BarGraph data={chartData} users={users.filter(user => user.id === selectedUserId)} />
        </View>
        <Text style={styles.totalPointsText}>Total Points: {selectedUserPoints.reduce((a, b) => a + b, 0)}</Text>

        <Text style={styles.subHeaderText}>Incomplete Tasks</Text>
        {incompleteTasks.map(task => {
          const daysDiff = calculateDaysDifference(new Date(task.dueDate));
          return (
            <View key={task.id} style={styles.taskContainer}>
              <View style={styles.taskTextContainer}>
                <Text style={styles.taskText}>
                  {task.emoji} {task.text}
                </Text>
                <Text style={styles.dueDateText}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
                <Text style={styles.dueDateText}>
                  {daysDiff >= 0 ? `${daysDiff} days left` : `${Math.abs(daysDiff)} days overdue`}
                </Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.subHeaderText}>Completed Tasks</Text>
        {completedTasks.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskText}>
              {task.emoji} {task.text}
            </Text>
            <Text style={styles.dueDateText}>Completed on: {new Date(task.completedDate).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightScreen;
