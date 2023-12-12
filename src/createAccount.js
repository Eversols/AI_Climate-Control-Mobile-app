import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import CustomComponent from './component/customComponent';

const CreateAccountScreen = () => {
  return (
    <ImageBackground source={require('../assets/images/1509(1).png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text>Email Address</Text>
        <CustomComponent>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            // Add necessary props or styling
          />
        </CustomComponent>

        <Text>Name</Text>
        <CustomComponent>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            // Add necessary props or styling
          />
        </CustomComponent>

        <Text>Password</Text>
        <CustomComponent>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            // Add necessary props or styling
          />
        </CustomComponent>

        <Text>Confirm Password</Text>
        <CustomComponent>
          <TextInput
            style={styles.input}
            placeholder="Enter Confirm Password"
            secureTextEntry
            // Add necessary props or styling
          />
        </CustomComponent>

        <Text>Occupation</Text>
        <CustomComponent>
          <TextInput
            style={styles.input}
            placeholder="Enter your Occupation"
            // Add necessary props or styling
          />
        </CustomComponent>

        <TouchableOpacity style={styles.signUpButton} onPress={() => {/* Handle sign-up press */}}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.resendText}>
        Already have an Account?  <Text style={styles.resendLink}>Log in</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  resendText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  resendLink: {
    textDecorationLine: 'underline',
  },
});

export default CreateAccountScreen;
