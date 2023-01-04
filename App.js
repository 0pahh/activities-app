import { NavigationContainer }        from "@react-navigation/native";
import { createBottomTabNavigator }   from "@react-navigation/bottom-tabs";
import Ionicons                       from "@expo/vector-icons/Ionicons";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import HomeScreen     from "./pages/HomeScreen";
import SignInScreen   from "./pages/SignInScreen";
import SignUpScreen   from "./pages/SignUpScreen";
import SignOutScreen  from "./pages/SignOutScreen";
import SettingsScreen from "./pages/SettingsScreen";

const Tab = createBottomTabNavigator();

import theme from "./config/theme";

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="grid" color={theme.colors.heavyblue} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="person" color={theme.colors.heavyblue} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="log-in" color={theme.colors.heavyblue} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SignOut"
            component={SignOutScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="log-out" color={theme.colors.heavyblue} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ size }) => (
                <Ionicons name="cog" color={theme.colors.heavyblue} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
