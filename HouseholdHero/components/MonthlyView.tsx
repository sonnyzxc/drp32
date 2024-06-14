import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { usePoints } from '../context/PointsContext';

const screenWidth = Dimensions.get('window').width;

const MonthlyView: React.FC<{ tasks: Task[]; users: User[] }> = ({ tasks, users }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

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

  const renderDayItem = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const completedTasks = checkTasksForDate(date);
    return (
      <View key={day.toString()} style={styles.dayContainer}>
        <Image
          source={completedTasks.length > 0 ? require('../assets/images/happy.png') : require('../assets/images/normal.png')}
          style={styles.faceImage}
        />
        <Text style={styles.dateText}>{day}</Text>
      </View>
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
  const startDayOfMonth = getStartDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < startDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDayContainer} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(renderDayItem(i));
    }
    return days;
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentMonth(newDate);
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.container}>
      <View style={styles.monthNavigation}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text style={styles.navigationText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text style={styles.navigationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dayLabelsContainer}>
        {dayLabels.map((label, index) => (
          <Text key={index} style={styles.dayLabelText}>{label}</Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {renderCalendar()}
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
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.8,
    marginVertical: 20,
  },
  navigationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dayLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: screenWidth * 0.9,
  },
  dayLabelText: {
    width: screenWidth * 0.1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: screenWidth * 0.9,
  },
  dayContainer: {
    width: screenWidth * 0.10,
    height: screenWidth * 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: screenWidth * 0.01,
  },
  emptyDayContainer: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    margin: screenWidth * 0.01,
  },
  faceImage: {
    width: 30,
    height: 30,
  },
  dateText: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default MonthlyView;
