import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePoints } from "../context/PointsContext";
import styles from "../styles/SettingsScreenStyles"; // Import the styles
import { usePageTimer, useTaskAddTimer } from "../utils/metrics";

const SettingsScreen: React.FC = () => {
  const { users, currentUser, changeUser, addUser } = usePoints();
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);

  const { startTaskAddTimer, endTaskAddTimer } = useTaskAddTimer();
  usePageTimer('SettingsScreen');

  const handleAddUser = () => {
    if (newUserName) {
      addUser(newUserName, newUserIsAdmin);
      setNewUserName("");
      setNewUserIsAdmin(false);
      setIsAddUserVisible(false);
      endTaskAddTimer();
    }
  };

  const handleStartAddUser = () => {
    setIsAddUserVisible(!isAddUserVisible);
    startTaskAddTimer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <Text style={styles.subHeaderText}>Current User: {currentUser.name}</Text>
      <View style={styles.userList}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userButton}
            onPress={() => changeUser(user.id)}
          >
            <Text
              style={[
                styles.userButtonText,
                user.id === currentUser.id && styles.selectedUser,
              ]}
            >
              {user.name} {user.isAdmin && "(Admin)"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleStartAddUser}
      >
        <Text style={styles.addButtonText}>
          {isAddUserVisible ? "Cancel" : "Add User"}
        </Text>
      </TouchableOpacity>
      {isAddUserVisible && (
        <View style={styles.addUserContainer}>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            value={newUserName}
            onChangeText={setNewUserName}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Admin:</Text>
            <Switch value={newUserIsAdmin} onValueChange={setNewUserIsAdmin} />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleAddUser}>
            <Text style={styles.submitButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
