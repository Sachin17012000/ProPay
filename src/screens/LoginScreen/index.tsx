import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import styles from "./style";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To the Wallet App</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.registerLink}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
