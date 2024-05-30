import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckbox = ({ isChecked, onPress }: { isChecked: boolean, onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
                {isChecked && <View style={styles.checkboxTick} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  },
});

export default CustomCheckbox;
