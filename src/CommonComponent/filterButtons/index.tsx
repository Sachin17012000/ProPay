import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../../CommonComponent/Text";
import colors from "../Theme/Color";

export interface FilterData<T extends string> {
  title: string;
  type: T;
}

interface FilterButtonsProps<T extends string> {
  buttonArray: FilterData<T>[];
  filter: T;
  setFilter: React.Dispatch<React.SetStateAction<T>>;
  resetCustomRange?: () => void;
}

function FilterButtons<T extends string>({
  buttonArray,
  filter,
  setFilter,
  resetCustomRange,
}: FilterButtonsProps<T>) {
  const renderFilterButton = (type: T, label: string) => (
    <TouchableOpacity
      key={type}
      style={[
        styles.filterButton,
        filter === type && styles.activeFilterButton,
      ]}
      onPress={() => {
        if (type !== filter) {
          if (resetCustomRange) resetCustomRange();
          setFilter(type);
        }
      }}
    >
      <Text
        textType="baseRegular"
        style={[
          styles.filterButtonText,
          filter === type && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.filterContainer}>
      {buttonArray.map((button) =>
        renderFilterButton(button.type, button.title)
      )}
    </View>
  );
}

export default FilterButtons;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  filterButtonText: {
    color: colors.black,
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  activeFilterButtonText: {
    color: colors.ivory,
  },
});
