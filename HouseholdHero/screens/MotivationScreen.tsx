import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Button, Modal } from 'react-native';
import styles from "../styles/MotivationScreenStyles";
import { usePoints } from '../context/PointsContext';
import MonthlyView from '../components/MonthlyView'; // Import the MonthlyView component

const screenWidth = Dimensions.get('window').width;

const MotivationScreen: React.FC = () => {
  const { tasks, users } = usePoints(); // Assuming tasks and users are provided by usePoints context
  const [currentIndex, setCurrentIndex] = useState(6); // Start with the rightmost element
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily'); // State to switch between daily and monthly view
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

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
    const user1Tasks = completedTasks.filter(task => task.completedBy === 1);
    const user2Tasks = completedTasks.filter(task => task.completedBy === 2);

    let imageSource = require('../assets/images/lvl1.png'); // Default image

    if ((user1Tasks.length === 0 && user2Tasks.length > 0) || (user1Tasks.length > 0 && user2Tasks.length === 0)) {
      imageSource = require('../assets/images/lvl2.png'); // Only one user has done chores
    } else if (user1Tasks.length > 0 && user2Tasks.length > 0) {
      imageSource = require('../assets/images/lvl3.png'); // Both users have done chores
    }

    return (
      <View key={date.toDateString()} style={styles.dayContainer}>
        <Image
          source={imageSource}
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
    const user1Tasks = completedTasks.filter(task => task.completedBy === 1);
    const user2Tasks = completedTasks.filter(task => task.completedBy === 2);
  
    let imageSource = require('../assets/images/lvl1.png'); // Default image
  
    if ((user1Tasks.length === 0 && user2Tasks.length > 0) || (user1Tasks.length > 0 && user2Tasks.length === 0)) {
      imageSource = require('../assets/images/lvl2.png'); // Only one user has done chores
    } else if (user1Tasks.length > 0 && user2Tasks.length > 0) {
      imageSource = require('../assets/images/lvl3.png'); // Both users have done chores
    }

    return (
      <View key={date.toDateString()} style={[styles.miniMapItem, currentIndex === index && styles.selectedMiniMapItem]}>
        <Image
          source={imageSource}
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
      {viewMode === 'daily' ? (<Text style={styles.headerText}>Happy Street</Text>) : (<Text style={styles.headerText}>Happy City</Text>)}
      <TouchableOpacity style={styles.helpIcon} onPress={() => setIsHelpModalVisible(true)}>
        <Text style={styles.helpIconText}>?</Text>
      </TouchableOpacity>
      <Button title={viewMode === 'daily' ? "Switch to City (Monthly) View" : "Switch to Street (Weekly) View"} onPress={() => setViewMode(viewMode === 'daily' ? 'monthly' : 'daily')} />
      {viewMode === 'daily' ? (
        <>
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
        </>
      ) : (
        <MonthlyView tasks={tasks} users={users} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isHelpModalVisible}
        onRequestClose={() => setIsHelpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Help</Text>
            <Text style={styles.modalText}>
            Build your happy street with daily happy houses! Each day, your family gets a new house.
            No chores done? The house stays cozy at level 1. 
            If one family member does chores, the house levels up to level 2!
            And if both family members join in, the house transforms to an awesome level 3! 
            Let's make our city shine by completing chores together!
            </Text>
            <Button title="Close" onPress={() => setIsHelpModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MotivationScreen;
