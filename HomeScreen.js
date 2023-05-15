import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import normalize from "./FontDynam";

export default function HomeScreen({ navigation }) {
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
        Welcome to my LearnPress Training App!
      </Text>
      <Text style={[styles.text, styles.shadow]}>*Press the Button to begin*</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Button Here</Text>
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
    fontSize: normalize(22),
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
