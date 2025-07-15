import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import styles from "./style";
import Text from "../../CommonComponent/Text";

export default function ProfileScreen() {
  const { user, logout, deleteTransaction, updateUser } = useAuth();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name ?? "");
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
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
          onPress: () => {
            user?.transactions.forEach((txn) => deleteTransaction(txn.id));
          },
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
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              if (name.trim()) {
                updateUser({ name: name });
                setEditing(false);
              } else {
                Alert.alert("Error", "Name cannot be empty.");
              }
            }}
          >
            <Text textType="baseRegularBold" style={styles.saveButtonText}>
              Save Name
            </Text>
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
        <Text textType="baseRegular">{user?.transactions?.length ?? 0}</Text>
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
