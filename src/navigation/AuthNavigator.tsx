import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStackParamList } from "./types";
import SwiperScreen from "../screens/Auth/SwiperComponents/SwiperScreen";
import LoginScreen from "../screens/Auth/Login";
import SignupScreen from "../screens/Auth/Signup";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ChangePassword from "../screens/Auth/ForgotPassword/ChangePassword";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Swiper" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Swiper" component={SwiperScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
            <Stack.Screen name="Forgot" component={ForgotPassword}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        </Stack.Navigator>
    )
};

export default AuthNavigator;