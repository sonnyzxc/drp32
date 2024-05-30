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

const SettingsScreen: React.FC = () => {
  const { users, currentUser, changeUser, addUser } = usePoints();
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);

  const handleAddUser = () => {
    if (newUserName) {
      addUser(newUserName, newUserIsAdmin);
      setNewUserName("");
      setNewUserIsAdmin(false);
      setIsAddUserVisible(false);
    }
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
        onPress={() => setIsAddUserVisible(!isAddUserVisible)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subHeaderText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  userList: {
    marginTop: 20,
  },
  userButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  userButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  selectedUser: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addUserContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SettingsScreen;
