import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCheckbox from '@/components/CustomCheckBox';

interface ToDoItemProps {
  item: { id: number; text: string; emoji?: string; points: number; completed: boolean };
  onToggle: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, item.completed && styles.checkedCheckbox]}>
        {item.completed && <View style={styles.checkboxTick} />}
      </View>
      <Text style={styles.emoji}>{item.emoji || '😊'}</Text>
      <Text style={[styles.text, item.completed && styles.completedText]} numberOfLines={2} ellipsizeMode="tail">
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    flexWrap: 'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default ToDoItem;
