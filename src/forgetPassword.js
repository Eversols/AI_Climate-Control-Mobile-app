import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import CustomComponent from './component/customComponent';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = React.useRef(null);

  return (
    <ImageBackground source={require('../assets/images/image122.png')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.titleText}>Forget Password</Text>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your phone number, then we will send you a code to reset your password</Text>

        <CustomComponent style={styles.phoneInputContainer}>
        <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="first"
            onChangeText={(text) => setPhoneNumber(text)}
            withDarkTheme
            withShadow
            // autoFocus
            // style={{ color: 'black', fontSize: 16, paddingVertical: 10 }}
            // textContainerStyle={styles.customTextContainerStyle}
            placeholder="Your phone number"
            containerStyle={{borderRadius:40,color:'transparent', height:50,width:'100%', backgroundColor: 'rgba(255, 255, 255, 0.4)'}}
            textContainerStyle={{backgroundColor:'transparent',paddingVertical:5,borderRadius:40}}
          />
        </CustomComponent>

        <TouchableOpacity
          style={[styles.btn, { width: '65%' }]}
          onPress={() => { navigation.navigate('authenticationCode') }}
        >
          <Text style={{ fontWeight: '700', fontSize: 18, color: '#000' }}>Next</Text>
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
  },

  titleText: {
    fontSize: 24,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginVertical: 30,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginBottom: 10,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  phoneInputContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent', 
    borderRadius: 30, // Adjust border radius to match the button
    // borderWidth: 1,
    // borderColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 5, // Adjust padding to match the button
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: '90%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
});

export default ForgotPasswordScreen;
