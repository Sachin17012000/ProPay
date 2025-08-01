import { ScrollView } from "react-native";
import Text from "../../CommonComponent/Text";
import styles from "./style";
export default function ExpenseTracker() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text textType="headingBold" style={styles.title}>
        Expense Tracker
      </Text>
    </ScrollView>
  );
}
