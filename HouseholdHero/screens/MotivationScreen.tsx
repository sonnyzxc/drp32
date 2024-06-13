import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { usePoints } from '../context/PointsContext';

const screenWidth = Dimensions.get('window').width;

const MotivationScreen: React.FC = () => {
  const { tasks } = usePoints();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    return tasks.some(task => {
      const taskDate = new Date(task.completedDate);
      return (
        task.completed &&
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderDayItem = (date: Date) => {
    const hasCompletedTasks = checkTasksForDate(date);
    return (
      <View key={date.toDateString()} style={styles.dayContainer}>
        <Image
          source={hasCompletedTasks ? require('../assets/images/happy.png') : require('../assets/images/normal.png')}
          style={styles.faceImage}
        />
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </View>
    );
  };

  const renderMiniMapItem = (date: Date, index: number) => {
    const hasCompletedTasks = checkTasksForDate(date);
    return (
      <View key={date.toDateString()} style={[styles.miniMapItem, currentIndex === index && styles.selectedMiniMapItem]}>
        <Image
          source={hasCompletedTasks ? require('../assets/images/happy.png') : require('../assets/images/normal.png')}
          style={styles.miniFaceImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
      >
        {days.map(renderDayItem)}
      </ScrollView>
      <View style={styles.miniMapContainer}>
        {days.map((date, index) => renderMiniMapItem(date, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceImage: {
    width: 150,
    height: 150,
  },
  dateText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  miniMapContainer: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniMapItem: {
    marginHorizontal: 5,
  },
  selectedMiniMapItem: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  miniFaceImage: {
    width: 30,
    height: 30,
  },
});

export default MotivationScreen;
