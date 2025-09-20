import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "../Text";
import { Controller, Control } from "react-hook-form";
import colors from "../Theme/Color";
import Icon from "@react-native-vector-icons/feather";

type InputProps = TextInputProps & {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: object;
  error?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
};

export default function Input({
  name,
  control,
  label,
  rules,
  error,
  containerStyle,
  disabled = false,
  ...inputProps
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = inputProps.secureTextEntry !== undefined;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text textType="smallRegular" style={styles.label}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                disabled && styles.disbaledContainer,
                error && styles.inputError,
                inputProps.style,
                isPasswordField && { paddingRight: 40 },
              ]}
              editable={!disabled}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...inputProps}
              secureTextEntry={isPasswordField && !showPassword}
            />
            {isPasswordField && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.iconWrapper}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color={colors.onyx}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {error && (
        <Text textType="smallRegular" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: colors.onyx,
  },
  input: {
    backgroundColor: colors.greyish,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: colors.lightShadowBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.crimson,
  },
  error: {
    marginTop: 4,
    color: colors.crimson,
  },
  disbaledContainer: {
    opacity: 0.6,
  },
  iconWrapper: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
});
