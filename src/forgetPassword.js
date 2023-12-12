import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal'; // Import CountryPicker
import CustomComponent from './component/customComponent';
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null); // Add state for the selected country

  const handleNextPress = () => {
    // Handle the next button press
    console.log('Next Pressed with Code:', code);
    // You can add logic to verify the code and navigate to the next screen
  };

  return (
    <ImageBackground source={require('../assets/images/image122.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Forget Password</Text>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your phone number then we will send you a code to reset your password</Text>

        <CustomComponent style={styles.countryPickerContainer}>
          {/* Use CountryPicker instead of CustomComponent */}
          <CountryPicker
            {...{
              withFilter: true,
              withFlag: true,
              withCountryNameButton: true,
              withAlphaFilter: true,
              onSelect: (country) => setSelectedCountry(country), // Handle country selection
              countryCode: selectedCountry ? selectedCountry.cca2 : 'US', // Set the initial country code
            }}
          >
            <Text style={styles.countryPickerText}>
              {/* {selectedCountry ? selectedCountry.name : 'Select Country'} */}
              Your phone number
            </Text>
          </CountryPicker>
        </CustomComponent>

        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('authenticationCode')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  titleText:{
    fontSize:28,
    fontWeight:'600',
    alignItems:'center',
    justifyContent:"center",
    color:'black',
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  countryPickerContainer: {
    marginBottom: 20,
  },
  countryPickerText: {
    // color: 'white',
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
