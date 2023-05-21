import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState, useRef } from "react";
import normalize from "./FontDynam";
import axios from "axios";

export default function Login({ navigation }) {
  // All necessary States being set
  const [loading, setLoading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState('');
  // const [validateStatus, setValidateStatus] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const URL = "https://myselena.org"

  const passwordInput = useRef(null);
  
  // Login function which obtains a token and validates it
  const Login = async(usrname, pass) => {
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/wp-json/learnpress/v1/token`, {
        username: usrname,
        password: pass
      })
      
      if (response.status === 200){
        // Gets token information
        const token = response.data.token
        // Gets user's display name to pass with token later
        setDisplayName(response.data.user_display_name);
        setUserToken(token);
        // setValidateStatus(true);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (userToken !== '') {
      const isValid = validateToken(userToken);

      if (isValid) {
        // Navigates to Courses screen if login was successful
        navigateToCourses(userToken, displayName);
      }
    }
  }, [userToken]);

  const navigateToCourses = (token, name) => {
    if (token != '')
      navigation.navigate('Courses', {token: token, name: name})
    else{
      console.log("Sorry was unable to proceed");
    }
  }

  
  // This function takes a token and validates it
  const validateToken =  async (token) => {
    try {
      const response = await axios.post(
        `${URL}/wp-json/learnpress/v1/token/validate`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );

      console.log(response.data.message);
      return true;  
    } catch (error) {
      console.log(error);
    }
  };


  // Loads necessary Fonts
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

  const focusNextInput = (nextInputRef) => {
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={[styles.welcomeText, styles.text, styles.shadow]}>
          Login
        </Text>
        <TextInput
          placeholder="Username" 
          onSubmitEditing={() => focusNextInput(passwordInput)}
          onChangeText={
            text => {
              setUserName(text)
              }
            } 
          style={
            styles.inputBox
          }
        >
        </TextInput>
        <TextInput 
          ref={passwordInput}
          placeholder="**********" 
          onSubmitEditing={() => Login(userName, password)}
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
        {loading ? (
            <ActivityIndicator color="white" size="large" style={{marginTop: 15}} />
          ) : (
        <Pressable onPress={() => Login(userName, password)} style={styles.submit}>
          <Text style={styles.submitText}>
            Login
          </Text>
        </Pressable>
        )}
        
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
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