import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { noramlize } from "./FontDynam";

export default function Login() {
  // State to determine when font is loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Pacifico: require("./assets/Fonts/Pacifico-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.welcomText, styles.text, styles.shadow]}>
        Login
      </Text>
      <Text style={[styles.text, styles.shadow]}>*Login Input Here*</Text>
      <Pressable>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomText: {
    fontFamily: "Pacifico",
    fontSize: noramlize(22),
    textAlign: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  text: {
    color: "white",
    margin: 5,
  },
  shadow: {
    textShadowColor: 'rgba(100, 100, 100, 0.85)',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 5
  }
});