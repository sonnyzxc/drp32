import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from "../styles/MotivationScreenStyles";
import { usePoints } from '../context/PointsContext';
import CompletedTasks from '../components/CompletedTasks';

const screenWidth = Dimensions.get('window').width;

const MotivationScreen: React.FC = () => {
  const { tasks, users } = usePoints(); // Assuming tasks and users are provided by usePoints context
  const [currentIndex, setCurrentIndex] = useState(6); // Start with the rightmost element

  const scrollRef = useRef<ScrollView>(null);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const days = getLast7Days();

  const checkTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.completedDate);
      return (
        task.completed &&
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderDayItem = (date: Date, index: number) => {
    const completedTasks = checkTasksForDate(date);
    return (
      <View key={date.toDateString()} style={styles.dayContainer}>
        <Image
          source={completedTasks.length > 0 ? require('../assets/images/happy.png') : require('../assets/images/normal.png')}
          style={styles.faceImage}
        />
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        {completedTasks.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskText}>
              {task.emoji} {task.text}
            </Text>
            <Text style={styles.dueDateText}>Completed on: {new Date(task.completedDate).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderMiniMapItem = (date: Date, index: number) => {
    const completedTasks = checkTasksForDate(date);
    return (
      <View key={date.toDateString()} style={[styles.miniMapItem, currentIndex === index && styles.selectedMiniMapItem]}>
        <Image
          source={completedTasks.length > 0 ? require('../assets/images/happy.png') : require('../assets/images/normal.png')}
          style={styles.miniFaceImage}
        />
      </View>
    );
  };

  const scrollToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: screenWidth * (days.length - 1), animated: false });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Family Forest</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
        onLayout={scrollToRight}
      >
        {days.map(renderDayItem)}
      </ScrollView>
      <View style={styles.miniMapContainer}>
        {days.map((date, index) => renderMiniMapItem(date, index))}
      </View>
    </View>
  );
};

export default MotivationScreen;
