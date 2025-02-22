import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function explore() {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
