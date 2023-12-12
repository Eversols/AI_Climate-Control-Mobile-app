import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';

const AccountSuccessScreen = () => {
  return (
    <ImageBackground source={require('../assets/images/image131.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Centered image with blurred background */}
        <View style={styles.centeredImageContainer}>
          <Image source={require('../assets/images/Group1000007856.png')} style={styles.centeredImage} />
        </View>

        {/* Text indicating successful account addition */}
        <Text style={styles.successText}>Your account has been successfully added</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredImageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  centeredImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 15,
    marginTop:30,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default AccountSuccessScreen;
