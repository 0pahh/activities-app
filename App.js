import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import SettingsScreen from "./pages/SettingsScreen";

import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import supabase from "./config/supabaseClient.js";

export default function App() {
  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    loadActivitiesType();
  }, []);

  const loadActivitiesType = async () => {
    try {
      const { data, error } = await supabase.from("activity_type").select();
      if (data) setActivities(data);
    } catch (error) {
      setActivities(null);
      setErrors("Error loading activities type");
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
