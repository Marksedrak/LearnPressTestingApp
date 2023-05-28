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


export default function Courses({ route, navigation }) {

    const disName = route.params.name
    const token = route.params.token
    const [fontLoaded, setFontLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = 'https://myselena.org'


    // Loads Font for use in screen
    useEffect(() => {
        if (validateToken(token)){
            async function loadFontAndCourses() {
                await Font.loadAsync({
                Pacifico: require("./assets/Fonts/Pacifico-Regular.ttf"),
                });
                setFontLoaded(true);
                
                // Fetching courses into response and setting courses
                let courses = [];
                let page = 1;
                let perPage = 10;
                while (true) {
                    try {
                        const response = await axios.get(
                            `${URL}/wp-json/learnpress/v1/courses`,
                            {
                                params: {
                                    page,
                                    perPage
                                },
                                headers: {
                                'Authorization': `Bearer ${token}`
                                },
                            }
                        );
                        courses.push(...response.data);
                        if(response.headers.link && response.headers.link.includes('rel="next"')){
                            // There are more pages
                            page++;
                            console.log("nextPage")
                        } else {
                            // No more pages
                            break;
                        }
                    } catch (error) {
                        console.log("Could not get courses")
                        // console.log(response.data)
                        console.log(error);
                        throw error;
                    }
                }
                setCourses(courses);
                setLoading(false);
            }

            loadFontAndCourses();
        }
    }, []);

    // Keeps loading till fonts and courses are loaded and ready
    if (!fontLoaded || loading) {
        return <LoadingScreen />;
    }


    const renderCard= ({ item }) => {

        const handleCoursePress = () => {
            navigation.navigate('Lessons', { 
                courseId : item.id,
                displayName: disName, 
                token: token, 
                courseTitle: item.name, 
                courseDuration: item.duration,
                courseImage: item.image
            });
            console.log("Successfully navigated to Lessons " + item.id)
        }
        return (
            <Card key={item.id} title={item.name} duration={item.duration} image={item.image} onPress={handleCoursePress} />
        )
    };

    return (
    <View style={styles.container}>
        <Text style={[styles.welcomeText, styles.text, styles.shadow]}>
        Hello {disName}
        </Text>
        <FlatList
            data={courses}
            renderItem={renderCard}
            keyExtractor={item => item.id.toString()}
            numColumns={1}
            contentContainerStyle={styles.cardContainer}
        />
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
    cardContainer: {
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 20,
    }
    });