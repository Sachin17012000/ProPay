import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useForm } from "react-hook-form";
import Input from "../../CommonComponent/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validations";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { registerThunk } from "../../store/features/user/userThunk";
import { RegisterFormData } from "../../types";
import colors from "../../CommonComponent/Theme/Color";
import ProPayLogo from "../../../assets/ProPayLogo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const { loading } = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(
      registerThunk({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
    if (registerThunk.fulfilled.match(result)) {
    } else {
      Alert.alert(
        "Registration Failed",
        result.payload || "Something went wrong"
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewStyle}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image source={ProPayLogo} style={styles.imageStyle} />
        </View>
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
            <ActivityIndicator color={colors.ivory} />
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
      </View>
    </KeyboardAwareScrollView>
  );
}
