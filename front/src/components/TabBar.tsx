// biome-ignore lint/style/useImportType: <explanation>
import { StyleSheet, View, LayoutChangeEvent } from "react-native";
// biome-ignore lint/style/useImportType: <explanation>
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import TabBarButton from "./TabBarButton";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  })

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 30,
        marginHorizontal: 12,
        width: buttonWidth - 25,
        height: dimensions.height - 15,
      }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton 
          key={route.name}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.tabbarItem}
          isFocused={isFocused}
          routeName={route.name}
          color={ isFocused ? "#FFF" : "#222" }
          label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "50%",
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
