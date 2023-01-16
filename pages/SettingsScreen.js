import { auth } from '@supabase/supabase-js';
import { Modal, StyleSheet, View, TouchableOpacity, Text, TextInput, Switch } from 'react-native';
import React, { useState } from "react";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import theme from "../config/theme";

export default function SettingsScreen({ navigation }) {

  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings page</Text>
      <View style={styles.sectionContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.switchContainer}>
              <Text>Others settings</Text>
              <Switch style={styles.switch} />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.switchContainer}>
              <Text>Others settings</Text>
              <Switch style={styles.switch} />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.switchContainer}>
              <Text>Dark Mode</Text>
              <Switch style={styles.switch} />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.switchContainer}>
              <Text>Others settings</Text>
              <Switch style={styles.switch} />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.switchContainer}>
              <Text>Others settings</Text>
              <Switch style={styles.switch} />
            </View>
          </View>
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
    width: "100%",
    height: "100%",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.primary,
    marginBottom: 20,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    width: '100%',
    
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '48%',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#90E0EF',
    borderRadius: 20,
  },
  switch: {
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});