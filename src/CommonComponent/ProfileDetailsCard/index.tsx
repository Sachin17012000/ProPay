import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../Text";
import colors from "../Theme/Color";
import { formatCurrency } from "../../utils/utils";
import styles from "./style";
import { updateUserThunk } from "../../store/features/user/userThunk";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
export default function ProfileDetailsCard() {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
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
  return (
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
            <ActivityIndicator color={colors.ivory} />
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
      <Text textType="baseRegular">{formatCurrency(user?.balance ?? 0)}</Text>
      <Text textType="baseRegularBold" style={styles.label}>
        Total Transactions:
      </Text>
      <Text textType="baseRegular">{transactions?.length ?? 0}</Text>
    </View>
  );
}
