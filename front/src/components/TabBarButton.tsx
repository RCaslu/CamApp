import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { icon } from "../constants/icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/src/component/View";

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top: top,
    };
  });

  const animatedTextSyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <AnimatedView style={animatedIconStyle}>
        {icon[routeName]({
          style: { color: isFocused ? "#FFF" : "#222" },
        })}
      </AnimatedView>
      <Animated.Text
        style={[{ color: isFocused ? "#FFF" : "#222", fontSize: 12 },animatedTextSyle]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = {
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
