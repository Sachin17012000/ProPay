import React from "react";
import { Modal, View, Pressable, StyleSheet, FlatList } from "react-native";
import Text from "../../CommonComponent/Text";
import colors from "../../CommonComponent/Theme/Color";
import { categories } from "../../utils/staticData";

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
}

export default function CategoryModal({
  visible,
  onClose,
  onSelect,
}: CategoryModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text textType="mediumSemiBold" style={styles.title}>
            Select Category
          </Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  pressed && { backgroundColor: colors.white },
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text textType="baseRegular" style={styles.optionText}>
                  {item}
                </Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text textType="baseRegularBold" style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.shadowBlack,
  },
  sheet: {
    backgroundColor: colors.offWhite,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
    shadowColor: colors.lightShadowBlack,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    color: colors.black,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  optionText: {
    color: colors.black,
  },
  separator: {
    height: 1,
    backgroundColor: colors.ash,
    opacity: 0.3,
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.ash,
  },
  cancelButtonText: {
    color: colors.crimson,
  },
});
