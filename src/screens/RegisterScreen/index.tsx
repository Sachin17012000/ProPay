import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useForm } from "react-hook-form";
import Input from "../../CommonComponent/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validations";
import { useAuth } from "../../context/AuthContext";
import { registerService } from "../../services/authService";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function RegisterScreen() {
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const { login } = useAuth();
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await registerService(data.name, data.email, data.password);
    setLoading(false);

    if (res.success && res.user) {
      login(res.user);
    } else {
      Alert.alert("Register Failed", res.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="largeBold" style={styles.title}>
        Create An Account
      </Text>
      <Input
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        control={control}
        error={errors.name?.message as string}
      />
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
        placeholder="Enter password"
        secureTextEntry
        control={control}
        error={errors.password?.message as string}
      />

      <Input
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        secureTextEntry
        control={control}
        error={errors.confirmPassword?.message as string}
      />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.6 }]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
      <View style={styles.linkTextView}>
        <Text textType="mediumSemiBold">Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text textType="mediumSemiBold" style={styles.loginButton}>
            LogIn
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
