import { auth } from '@supabase/supabase-js'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from "react";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import supabase from "../config/supabaseClient";
import theme from "../config/theme";

export default function SignOutScreen({ navigation }) {


  const [error, setError] = useState("");

  const handleLogout = async () => {
    const session = await auth.currentSession()
    if (session) {
      await auth.logout()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log Out page</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.logoutButtons}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.primary,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    backgroundColor: theme.colors.lightblue,
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.whiteTxt,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700"
  },
  logoutButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
