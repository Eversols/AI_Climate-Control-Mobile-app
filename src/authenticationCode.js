import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CodeInput from 'react-native-confirmation-code-input';

const AuthenticationCodeScreen = () => {
  const navigation = useNavigation();
  const codeInputRef = useRef();

  const handleCodeChange = (code) => {
   
    console.log(code);
  };

  return (
    <ImageBackground source={require('../assets/images/image124.png')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Enter authentication code</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code that we have sent via the phone number +34 409-3049-3245</Text>
        <CodeInput
          ref={codeInputRef}
          variant="clear"
          autoFocus={true}
          codeLength={6}
          // ignoreCase={true}
          inputProps={{ keyboardType: 'numeric' }}
          onFulfill={handleCodeChange}
          containerStyle={styles.codeContainer}
          codeInputStyle={styles.codeInput}
          codeInputLineContainerStyle={styles.codeInputContainer}
          codeInputLineViewStyle={styles.codeInputLine}
          // secureTextEntry
        />
        <Text style={styles.resendText}>
          Don't have a code? <Text style={styles.resendLink}>Re-send</Text>
        </Text>

        <TouchableOpacity
          style={[styles.btn, { width: '65%' }]}
          onPress={() => navigation.navigate('newPassword')}
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
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, 
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 25,
    color: 'black',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: 'black',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInputContainer: {
    height: 50,
    
  },
  codeInput: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
  codeInputLine: {
    height: 2,
    backgroundColor: 'black',
  },
  resendText: {
    fontSize: 14,
    color: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'center',
    marginTop: 55,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: '90%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
});

export default AuthenticationCodeScreen;
