import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Text from "../../CommonComponent/Text";
import Input from "../../CommonComponent/Input";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./style";
import { useFocusEffect } from "@react-navigation/native";
import { loginSchema } from "./validations";
import { loginService } from "../../services/authService";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await loginService(data.email, data.password);
    setLoading(false);

    if (response.success && response.user) {
      login(response.user);
    } else {
      Alert.alert("Login Failed", response.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text textType="largeBold" style={styles.title}>
        Welcome To the Pro Pay App
      </Text>
      <Input
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        control={control}
        error={errors.email?.message as string}
      />
      <Input
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        control={control}
        error={errors.password?.message as string}
      />
      <TouchableOpacity
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit(onSubmit)}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text textType="mediumSemiBold" style={styles.registerLink}>
          Don’t have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
