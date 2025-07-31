import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "./style";
import Text from "../../CommonComponent/Text";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  logoutThunk,
  updateUserThunk,
} from "../../store/features/user/userThunk";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name ?? "");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => dispatch(logoutThunk()),
      },
    ]);
  };
  const handleSaveName = async () => {
    if (name.trim()) {
      const resultAction = await dispatch(updateUserThunk({ name }));
      if (updateUserThunk.fulfilled.match(resultAction)) {
        setEditing(false);
      }
    } else {
      Alert.alert("Error", "Name cannot be empty.");
    }
  };
  const handleClearTransactions = () => {
    Alert.alert(
      "Delete All Transactions",
      "Are you sure you want to delete all transaction history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Profile
      </Text>
      <View style={styles.profileCircle}>
        <Text textType="largeBold" style={styles.initials}>
          {user?.name?.[0]?.toUpperCase() ?? "?"}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text textType="baseRegularBold">Name:</Text>
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Text textType="link">Edit</Text>
          </TouchableOpacity>
        </View>
        {editing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter new name"
          />
        ) : (
          <Text textType="baseRegular">{user?.name}</Text>
        )}
        {editing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text textType="baseRegularBold" style={styles.saveButtonText}>
                Save Name
              </Text>
            )}
          </TouchableOpacity>
        )}

        <Text textType="baseRegularBold" style={styles.label}>
          Email:
        </Text>
        <Text textType="baseRegular">{user?.email}</Text>

        <Text textType="baseRegularBold" style={styles.label}>
          Wallet Balance:
        </Text>
        <Text textType="baseRegular">₹{user?.balance ?? 0}</Text>
        <Text textType="baseRegularBold" style={styles.label}>
          Total Transactions:
        </Text>
        <Text textType="baseRegular">{transactions?.length ?? 0}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleClearTransactions}>
        <Text textType="baseRegularBold" style={styles.buttonText}>
          Delete All Transactions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={handleLogout}
      >
        <Text textType="baseRegularBold" style={styles.buttonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
