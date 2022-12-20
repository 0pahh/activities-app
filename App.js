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
