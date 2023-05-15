import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import normalize from "./FontDynam";
import axios from "axios";

export default function Courses({ route }) {
    
    const [fontLoaded, setFontLoaded] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const URL = "https://myselena.org"

    //  This function takes a token and validates it
    const validateToken =  async (token) => {
    try {
        const response = await axios.post(
        URL + '/wp-json/learnpress/v1/token/validate',
        {},
        {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.data.status === 200) {
        console.log(response.data.message);
        }
        else {
        console.log(response.data.data.status)
        }
    }
    catch (error){
        console.log(error);
    }
    }

    const handlePressIn = () => {
        setIsPressed(true);
    }

    const handlePressOut = () => {
        setIsPressed(false);
    } 


    // Loads Font for use in screen
    useEffect(() => {
    async function loadFont() {
        await Font.loadAsync({
        Pacifico: require("./assets/Fonts/Pacifico-Regular.ttf"),
        });
        setFontLoaded(true);
    }

    loadFont();
    }, []);
    // Keeps loading till fonts are loaded and ready
    if (!fontLoaded) {
    return <Text>Loading...</Text>;
    }

    return (
    <View style={styles.container}>
        <Text style={[styles.welcomeText, styles.text, styles.shadow]}>
        Hello {route.params.name}
        </Text>

        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.submit, isPressed ? styles.active : null]}>
        <Text style={[styles.submitText, isPressed ? styles.activeText : null]}>
            Great
        </Text>
        </Pressable>
        
        <StatusBar style="light" />
    </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3D0000",
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText: {
        fontFamily: "Pacifico",
        fontSize: normalize(22),
        textAlign: "center",
        marginTop: Dimensions.get('screen').height * 0.05,
    },
    text: {
        color: "white",
        margin: 5,
    },
    shadow: {
        textShadowColor: 'rgba(100, 100, 100, 0.85)',
        textShadowOffset: {width: -2, height: 1},
        textShadowRadius: 5
    },

    inputBox: {
        backgroundColor: 'rgb(255,100, 50)',
        borderColor: 'rgb(50,50, 50)',
        color: 'white',
        borderRadius: 5,
        fontSize: normalize(18),
        textAlign: 'center',
        padding: 5,
        width: 0.5 * Dimensions.get('screen').width,
        margin: 5
    },
    submit: {
        borderColor: '#A0D2DB',
        borderWidth: 10,
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 2,
        width: 0.25 * Dimensions.get('screen').width,
        backgroundColor: '#BEE7E8',
        margin: 5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    active: {
        borderColor: '#4B5267',
        borderWidth: 10,
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 2,
        width: 0.25 * Dimensions.get('screen').width,
        backgroundColor: '#BA9790',
        margin: 5
    },
    submitText: {
        fontSize: normalize(18),
        color: '#4B5267',
        textAlign: 'center',
        fontFamily: 'Pacifico',
    },
    activeText: {
        color: '#3D0000'
    },
    });