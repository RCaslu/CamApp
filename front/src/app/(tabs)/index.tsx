import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-reanimated/src/Animated";

export default function Page() {
  return (
    <View style={styles.container}>
      <Image source={{
        uri: "https://imgs.search.brave.com/_s_xtg7j0znjEWfF8zB1ZAKgwbCimSFwxvjddjk4KhA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4w/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvUGludGVyZXN0/LzUxMi9QaW50ZXJl/c3RfRmF2aWNvbi5w/bmc",
      }} style={styles.image} />
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black', 
    borderRadius: 30,
  },
});
