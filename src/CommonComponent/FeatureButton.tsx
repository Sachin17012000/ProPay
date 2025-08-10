import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "./Text";
import colors from "./Theme/Color";

export function FeatureButton({ icon, label, onPress, color }) {
  return (
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <Text textType="baseRegularBold" style={styles.featureText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  featureButton: {
    width: "48%",
    backgroundColor: colors.lightOffWhite,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: colors.lightShadowBlack,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    marginTop: 8,
    color: colors.lightBlack,
  },
});
