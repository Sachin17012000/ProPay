import React, { useCallback } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import Text from "../../CommonComponent/Text";
import Input from "../../CommonComponent/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./style";
import { useFocusEffect } from "@react-navigation/native";
import { loginSchema } from "./validations";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { loginThunk } from "../../store/features/user/userThunk";
import ProPayLogo from "../../../assets/ProPayLogo.png";

const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    const result = await dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
    } else {
      Alert.alert("Login Failed", result.payload || "Invalid login");
    }
  };

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={ProPayLogo} style={styles.imageStyle} />
      </View>
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        <Text textType="mediumSemiBold" style={styles.registerLink}>
          Forgot Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
