import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable} from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import normalize from "./FontDynam";
import Card from "./Card";
import axios from "axios";
import { FlatList } from "react-native";
import LoadingScreen from "./Loading";
import validateToken from "./tvalidate"


export default function Lessons({ route }) {
    
    const { courseDuration, courseId, courseTitle, displayName, token, courseImage} = route.params;
    // const name = route.params.displayName
    // const token = route.params.token;
    // const course_id = route.params.courseId;
    const [fontLoaded, setFontLoaded] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = 'https://myselena.org'

    // Loads Font for use in screen
    useEffect(() => {
        if (validateToken(token)){
            async function loadFontAndLessons() {
                await Font.loadAsync({
                Pacifico: require("./assets/Fonts/Pacifico-Regular.ttf"),
                });
                setFontLoaded(true);
                
                // Fetching courses into response and setting courses
                try {
                    const response = await axios.get(
                        `${URL}/wp-json/learnpress/v1/courses/${courseId}`,
                        {
                            headers: {
                                'Authorization': `Bearer: ${token}`
                            }
                        }
                    );
                    const items = response.data.sections[0].items;
                    setLessons(items);
                } catch (error) {
                    console.log("Could not get courses")
                    console.log(error);
                }

                setLoading(false);
            }

            loadFontAndLessons();
        }
    }, []);

    // Keeps loading till fonts and courses are loaded and ready
    if (!fontLoaded || loading) {
        return <LoadingScreen />;
    }


    const renderCard= ({ item }) => (
        <Card key={item.id} title={item.title} />
    );

    return (
    <View style={styles.container}>
        <Text style={[styles.welcomeText, styles.text, styles.shadow]}>
            Hello {displayName}
        </Text>
        <Card
             title={courseTitle}
             duration={courseDuration}
             image={courseImage}
        />
        <View style={styles.flatListContainer}> 
            <FlatList
                data={lessons}
                renderItem={renderCard}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                contentContainerStyle={styles.cardContainer}
            />
        </View>
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
    flatListContainer: {
        flex: 1,
        width: '100%',
    },
    cardContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
    });