import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthenticationCodeScreen = () => {
  const navigation = useNavigation();

  const codeInputs = Array(6).fill(null);

  const handleCodeChange = (index, value) => {
    if (value && index < codeInputs.length - 1) {
      const nextInput = this[`inputRef_${index + 1}`];
      nextInput && nextInput.focus();
    }
  };

  return (
    <ImageBackground source={require('../assets/images/image124.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter authentication code</Text>
        <Text style={styles.subtitle}>Enter the 6-digit that we have sent via the phone number +34 409-3049-3245</Text>
        <View style={styles.codeContainer}>
          {codeInputs.map((_, index) => (
            <View key={index} style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                ref={(input) => (this[`inputRef_${index}`] = input)}
                onKeyPress={({ nativeEvent }) => handleCodeChange(index, nativeEvent.key)}
              />
              <View style={styles.codeInputLine} />
            </View>
          ))}
        </View>
        <Text style={styles.resendText}>
        Don't have a code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={()=> navigation.navigate('newPassword')}>
          <Text>Next</Text>
        </TouchableOpacity>
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
    paddingTop: 60, 
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 15,
    marginTop:30,
    alignItems: 'center',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInputContainer: {
    position: 'relative',
  },
  codeInput: {
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  codeInputLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'black',
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

export default AuthenticationCodeScreen;
