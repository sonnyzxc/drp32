import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCheckbox from '@/components/CustomCheckBox';

interface ToDoItemProps {
  item: { id: number; text: string; emoji?: string };
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item }) => {
const [isChecked, setIsChecked] = useState(false);

return (
  <TouchableOpacity
    onPress={() => setIsChecked(!isChecked)}
    style={styles.container}
  >
    <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
      {isChecked && <View style={styles.checkboxTick} />}
    </View>
    <Text style={styles.emoji}>{item.emoji || "😊"}</Text>
    <Text style={[styles.text, isChecked && styles.completedText]}>
      {item.text}
    </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "#eee",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      marginVertical: 3,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1.5, // Adjust border width accordingly
      borderColor: "#007AFF",
      borderRadius: 3, // Adjust border radius
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    checkedCheckbox: {
      backgroundColor: "#007AFF",
    },
    checkboxTick: {
      width: 10, // Smaller tick width
      height: 10, // Smaller tick height
      backgroundColor: "#fff",
      borderRadius: 2,
    },
    emoji: {
      fontSize: 24,
      marginRight: 10,
    },
    text: {
      fontSize: 18,
      color: "#333",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });

export default ToDoItem;
