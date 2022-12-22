import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import supabase from "../config/supabaseClient";

export default function SignUpScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      console.log(email);
      console.log(password);
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error == null) {
        navigation.navigate("Home");
        Alert.alert(
          "Success",
          `You have been successfully sign in as ${email}`
        );
      } else {
        Alert.alert(`Not sign in beacuse ${error}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In page</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <View style={styles.loginButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.buttonText}>
            {showPassword ? "Hide" : "Show"} Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#fff",
  },
  button: {
    width: "80%",
    backgroundColor: "#444",
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  passwordCheckIcon: {
    width: 20,
    height: 20,
    marginBottom: 20,
  },
  requirementsPhrase: {
    display: "flex",
    justifyContent: "flex-start",
  },
  requirementsTxt: {
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    color: "#fff"
  },
  loginButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
