import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Courses from './Courses'
import Lessons from './Lessons'

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
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Courses" component={Courses} />
                <Stack.Screen name="Lessons" component={Lessons} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
