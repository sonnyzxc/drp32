import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomCheckbox from '@/components/CustomCheckBox';

const ToDoItem = ({ item }: { item: any }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <CustomCheckbox
                isChecked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={[styles.text, isChecked && styles.completedText]}>
                {item.text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default ToDoItem;
