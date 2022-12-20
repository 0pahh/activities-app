import { StyleSheet, Text, View } from "react-native";
import { SUPABASE_KEY } from "@env";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/HomeScreen'
import LoginScreen from './pages/LoginScreen'
import SettingsScreen from './pages/SettingsScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import supabase from "./Database.js";

export default function App() {
  const [activities, setActivities] = useState(null);
  useEffect(() => {
    const test = async () => {
      try {
        const { data, error } = await supabase.from("activities").select();
        // console.log(data);
        setActivities(data);
        console.log(activities);
      } catch (error) {
        console.log(error);
      }
      console.log("fir2st");
    };
    test();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
