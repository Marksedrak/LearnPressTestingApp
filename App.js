import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import Login from './Login'
import Courses from './Courses'

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitle: null,
                    headerBackTitleVisible: true,
                    headerShown: false,
                }}
            >
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Courses" component={Courses} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
