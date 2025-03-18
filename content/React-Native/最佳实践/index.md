---
title: "最佳实践"
date: 2024-09-03T07:31:22+08:00
draft: false
---

nativewind[https://www.nativewind.dev/]

## transform 设置中心点坐标

```js
import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet, SafeAreaView, Easing } from "react-native";

const App = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.transformOriginWrapper}>
        <Animated.View
          style={[
            styles.transformOriginView,
            {
              transform: [
                { translateX: -50 },
                { translateY: 50 },
                { rotate: spin },
                { translateX: 50 },
                { translateY: -50 },
              ],
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  transformOriginWrapper: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  transformOriginView: {
    backgroundColor: "pink",
    width: 100,
    height: 100,
  },
});

export default App;
```
