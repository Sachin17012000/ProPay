import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import Text from "../Text";
import { Controller, Control } from "react-hook-form";
import colors from "../Theme/Color";

type InputProps = TextInputProps & {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: object;
  error?: string;
};

export default function Input({
  name,
  control,
  label,
  rules,
  error,
  ...inputProps
}: InputProps) {
  return (
    <View style={styles.container}>
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
          <TextInput
            style={[
              styles.input,
              error ? styles.inputError : null,
              inputProps.style,
            ]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
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
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    marginTop: 4,
    color: colors.error,
  },
});
