import { StyleSheet, View, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";
interface SkeletonViewProps {
  CardStyle?: ViewStyle;
}
export default function SkeletonView({ CardStyle }: SkeletonViewProps) {
  return (
    <Animatable.View
      animation="pulse"
      easing="ease-in-out"
      iterationCount="infinite"
      style={[styles.skeletonCard, CardStyle]}
    >
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: "60%" }]} />
    </Animatable.View>
  );
}
const styles = StyleSheet.create({
  skeletonCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginBottom: 12,
    overflow: "hidden",
    alignContent: "center",
    justifyContent: "center",
  },
  skeletonLine: {
    width: "80%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.12)",
    marginBottom: 8,
  },
});
