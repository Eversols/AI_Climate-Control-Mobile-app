import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupScreen from './src/signup';
import HomeScreen from './src/homeScreen';
import FarmSection from './src/farmSection';
import DetectedPests from './src/detectedPests';
import UsedPesticides from './src/usedPesticides';
import UserPanel from './src/screens/userPanel/userPanel';
import UserPanel2 from './src/screens/userPanel/userPanel2'
import VisionCameraScreen from './src/visionCamera';
import BottomNavigation from './src/BottomNavigation';
import PestScreen1 from './src/screens/pestScreens/pestScreen1';
import PestScreen2 from './src/screens/pestScreens/pestScreen2';
import Profile from './src/profile';
import PestScreen3 from './src/screens/pestScreens/pestScreen3';
import Dashboard from './src/screens/dashboard/dashboard';
import Dashboard2 from './src/screens/dashboard/dashboard2';
import LoginScreen from './src/screens/auth/LoginScreen';
import ForgotPasswordScreen from './src/screens/auth/forgetPassword';
import AuthenticationCodeScreen from './src/screens/authenticationCode';
import NewPasswordScreen from './src/newPassword';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import AccountSuccessScreen from './src/screens/accountSuccessScreen';
import FarmSelectionModal from './src/components/farmSelectionModal';
import FarmImageSelection from './src/screens/selectFarmImage';

import store from './src/redux/index'
import { Provider } from 'react-redux';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Provider store={store}>
        <Stack.Navigator initialRouteName='createAccount'>
            <Stack.Screen name="bottom_navigation" component={BottomNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='pestScreen1' component={PestScreen1} options={{ headerShown: false }} />
            <Stack.Screen name='pestScreen2' component={PestScreen2} options={{ headerShown: false }} />
            <Stack.Screen name='pestScreen3' component={PestScreen3} options={{ headerShown: false }} />
            <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='dashboard' component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name='dashboard2' component={Dashboard2} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='forgetPassword' component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name='authenticationCode' component={AuthenticationCodeScreen} options={{ headerTransparent: true, headerTitle: 'Authentication Code' }} />
            <Stack.Screen name='createAccount' component={SignUpScreen} options={{headerShown:false}}/>
            <Stack.Screen name='accountSuccess' component={AccountSuccessScreen} options={{headerShown:false}}/>
            <Stack.Screen name="FarmSelection" component={FarmSelectionModal} options={{headerShown:false}}/>
            <Stack.Screen name="FarmImageSelection" component={FarmImageSelection} options={{headerShown:false}}/>
            <Stack.Screen name='newPassword' component={NewPasswordScreen} options={{ headerTransparent: true, headerTitle: "New Password" }} />
            {/* <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='farmSection' component={FarmSection} options={{ headerShown: false }} />
            <Stack.Screen name='detectedPests' component={DetectedPests} options={{ headerShown: false }} />
            <Stack.Screen name='usedPesticides' component={UsedPesticides} options={{ headerShown: false }} />
            <Stack.Screen name='userPanel' component={UserPanel} options={{ headerShown: false }} />
            <Stack.Screen name='userPanel2' component={UserPanel2} options={{ headerShown: false }} />
            <Stack.Screen name='VisionCameraScreen' component={VisionCameraScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        </Provider>
    );
};

export default AppNavigator;
