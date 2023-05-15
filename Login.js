import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import normalize from "./FontDynam";
import axios from "axios";

export default function Login({ navigation }) {
  // State to determine when font is loaded
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setToken] = useState('');
  const [validateStatus, setValidateStatus] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const URL = "https://myselena.org"
  
  // Login function which obtains a token and validates it
  const Login = async(usrname, pass) => {
    // console.log(username);
    // console.log(pass);

    try {
      const response = await axios.post(URL + '/wp-json/learnpress/v1/token', {
        username: usrname,
        password: pass
      })
      
      if (response.status === 200){
        setToken(response.data.token);
        // console.log(userToken);
        // Checks token is validated
        setValidateStatus(validateToken(userToken));
        //
        setDisplayName(response.data.user_display_name);
        console.log(displayName);
        navigateToCourses(userToken, displayName);
      }
    } catch(error) {
      console.log(error);
      }
  }


  const navigateToCourses = (token, name) => {
    if (validateStatus)
      navigation.navigate('Courses', {token, name})
    else{
      console.log("Sorry was unable to proceed");
    }
  }

  /*
    This function takes a token and validates it
  */

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
        return true;
      }
      else {
        console.log(response.data.data.status)
        return false
      }
    }
    catch (error){
      console.log(error);
    }
  }

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

  
  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.welcomeText, styles.text, styles.shadow]}>
        Login
      </Text>
      <TextInput
        placeholder="email@mail.com" 
        onChangeText={
          text => {
            setuserName(text)
            }
          } 
        style={
          styles.inputBox
        }
      >
      </TextInput>
      <TextInput 
        placeholder="123456" 
        secureTextEntry={true} 
        onChangeText={
          text => {
            setPassword(text)
          }
        }
        style={
          styles.inputBox
        }
      >
      </TextInput>
      <Pressable onPress={() => Login(userName, password)} style={styles.submit}>
        <Text style={styles.submitText}>
          Login
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
    margin: 5
  },
  submitText: {
    fontSize: normalize(18),
    color: '#4B5267',
    textAlign: 'center',
    fontFamily: 'Pacifico',
  }
});