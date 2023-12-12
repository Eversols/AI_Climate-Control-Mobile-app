import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomComponent from './component/customComponent';
import { RadioButton } from 'react-native-paper';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);

  const handleLoginPress = () => {
    // Handle login press
    console.log('Login Pressed!');
    navigation.navigate('forgetPassword');
  };

  const handleSignupPress = () => {
    // Handle signup press
    console.log('Signup Pressed!');
  };

  return (
    <ImageBackground source={require('../assets/images/image119.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <CustomComponent style={styles.logoContainer}>
          <Text style={styles.logoText}>Logo</Text>
        </CustomComponent>
        <Text style={styles.label}>Email Address</Text>
        <CustomComponent>
          <TextInput style={styles.input} placeholder="Email" />
        </CustomComponent>
        <Text style={styles.label}>Password</Text>
        <CustomComponent>
          <TextInput style={styles.input} secureTextEntry placeholder="Password" />
        </CustomComponent>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <RadioButton
              value="remember"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.checkboxText}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
            <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <CustomComponent onPress={handleLoginPress} label="Login">
          <Text style={styles.loginButtonText}>Login</Text>
        </CustomComponent>
        <View style={styles.socialRow}>
          <CustomComponent onPress={() => console.log('Connect with Google pressed')} style={styles.socialContainer}>
            <Image source={require('../assets/images/Group1000007855.png')} style={styles.socialImage} />
            <Text style={styles.socialText}>Connect with Google</Text>
          </CustomComponent>
        </View>
        <View style={styles.socialRow}>
          <CustomComponent onPress={() => console.log('Connect with Apple ID pressed')} style={styles.socialContainer}>
            <Image source={require('../assets/images/Vector.png')} style={styles.socialImage} />
            <Text style={styles.socialText}>Connect with Apple ID</Text>
          </CustomComponent>
        </View>
        <View style={styles.socialRow}>
          <CustomComponent onPress={() => console.log('Connect with Facebook pressed')} style={styles.socialContainer}>
            <Image source={require('../assets/images/Vector(1).png')} style={styles.socialImage} />
            <Text style={styles.socialText}>Connect with Facebook</Text>
          </CustomComponent>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignupPress}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.5, // Adjusted logo container width based on window width
    height: windowHeight * 0.2, // Adjusted logo container height based on window height
    // width:100,
    // height:70,
    alignSelf: 'center', // Centered the logo container
    borderRadius: 8,
    marginBottom: 20, // Added margin at the bottom
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    lineHeight:35,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    // color: 'white',
    // borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    // color: 'white',

  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  socialImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  socialText: {
    // color: 'white',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Added margin at the top
  },
  signupText: {
    // color: 'white',
    marginRight: 5,
  },
  signupLink: {
    // color: 'white',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    // color: 'white',
    marginLeft: 8,
  },
  forgotPasswordLink: {
    // color: 'white',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
