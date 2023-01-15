import { auth } from '@supabase/supabase-js';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from "react";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import theme from "../config/theme";

export default function SettingsScreen({ navigation }) {

  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings page</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.settingsButtons}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Show Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal
      animationType='fade'
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>This is the modal content</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  settingsButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: "80%",
    height: "20%",
    margin: 0,
  },
});