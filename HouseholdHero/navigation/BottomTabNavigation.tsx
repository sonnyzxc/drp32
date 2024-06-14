import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InsightScreen from '../screens/InsightScreen';
import MotivationScreen from '../screens/MotivationScreen'; // Import the new screen
import { Ionicons } from '@expo/vector-icons';
import { usePoints } from '../context/PointsContext'; // Import the usePoints hook

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const { currentUser } = usePoints();
  const isAdmin = currentUser.isAdmin; // Check if the current user is an admin

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      {/* Conditionally render the InsightScreen tab based on the admin status */}
      {isAdmin && (
        <Tab.Screen
          name="Insight"
          component={InsightScreen}
          options={{
            tabBarLabel: 'Insight',
            tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" color={color} size={size} />,
          }}
        />
      )}
      <Tab.Screen
        name="Houses" // Add new screen to the tab navigator
        component={MotivationScreen}
        options={{
          tabBarLabel: 'Houses',
          tabBarIcon: ({ color, size }) => <Ionicons name="happy-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

      /*
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
      */

export default BottomTabNavigator;
