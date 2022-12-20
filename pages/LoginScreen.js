import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Ionicons from "@expo/vector-icons/Ionicons";

import supabase from "../config/supabaseClient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [passwordReqMet, setPasswordReqMet] = useState(false); // added state variable to track if password requirements are met

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRemember = () => {
    setRemember(!remember);
  };

  // added function to check if password requirements are met
  const checkPasswordRequirements = () => {
    // requirements for password:
    // - at least 8 characters long
    // - contains at least one uppercase letter
    // - contains at least one lowercase letter
    // - contains at least one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password.match(passwordRegex)) {
      setPasswordReqMet(true);
    } else {
      setPasswordReqMet(false);
    }
  };
  const checkLength = () => {
    return password.length >= 8;
  };

  const checkUppercase = () => {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  };

  const checkLowercase = () => {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(password);
  };

  const checkNumber = () => {
    const numberRegex = /[0-9]/;
    return numberRegex.test(password);
  };

  const handleLogin = async () => {
    try {
      console.log(email);
      console.log(password);
      const { user, error } = await supabase.auth.signUp({
        //change to 'signUp' to sign up new user
        email: email,
        password: password,
      });
      if (error == null) {
        navigation.navigate("Home");
        Alert.alert(
          "Success",
          `You have been successfully logged in as ${email}`
        );
      } else {
        Alert.alert(`Not logged in beacuse ${error}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Back</Text>
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
          checkPasswordRequirements(); // check password requirements when password is changed
        }}
      />
      <View style={styles.requirementsPhrase}>
        <View style={styles.requirementsTxt}>
          {checkLength() ? (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="checkmark-outline"
              color="green"
              size={18}
            />
          ) : (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="close-outline"
              color="red"
              size={18}
            />
          )}
          <Text style={styles.requirementsTxt}>8 caractère ou plus</Text>
        </View>
        <View style={styles.requirementsTxt}>
          {checkUppercase() ? (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="checkmark-outline"
              color="green"
              size={18}
            />
          ) : (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="close-outline"
              color="red"
              size={18}
            />
          )}
          <Text style={styles.requirementsTxt}>Au moins une majuscule</Text>
        </View>
        <View style={styles.requirementsTxt}>
          {checkLowercase() ? (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="checkmark-outline"
              color="green"
              size={18}
            />
          ) : (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="close-outline"
              color="red"
              size={18}
            />
          )}
          <Text style={styles.requirementsTxt}>Au moins une minuscule</Text>
        </View>
        <View style={styles.requirementsTxt}>
          {checkNumber() ? (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="checkmark-outline"
              color="green"
              size={18}
            />
          ) : (
            <Ionicons
              style={styles.passwordCheckIcon}
              name="close-outline"
              color="red"
              size={18}
            />
          )}
          <Text style={styles.requirementsTxt}>Au moins un chiffre</Text>
        </View>
      </View>
      <View style={styles.loginButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.buttonText}>
            {showPassword ? "Hide" : "Show"} Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleRemember}>
          <Text style={styles.buttonText}>
            {remember ? "Forget" : "Remember"} Me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
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
