import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const VerifyIdentityScreen = ({ navigation }) => {
    const navigateToPhoneNumberVerification = () => {
        navigation.navigate('PhoneNumberVerificationScreen');
    };

    const navigateToEmailVerification = () => {
        navigation.navigate('EmailVerificationScreen');
    };

    return (
        <ImageBackground
            source={require('../../../asssets/profileBack.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.subheading}>Choose a method to identify yourself</Text>
                <TouchableOpacity style={styles.btn} onPress={navigateToPhoneNumberVerification}>
                    <Text style={styles.optionText}>Phone Number</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={navigateToEmailVerification}>
                    <Text style={styles.optionText}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextText}>Next</Text>
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
        marginTop: 100,
        alignItems: 'center',
    },
  
    subheading: {
        marginTop:60,
        fontSize: 16,
        fontWeight:'500',
        marginBottom: 20,
        color: '#000000',

    },
  
    optionText: {
        fontSize: 18,
        color: '#000000',
        fontWeight:'400'
    },

  nextText: {
        fontSize: 18,
        color: '#000000',
        fontWeight:'600'
    },
    nextButton: {
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        marginTop:100,
        paddingHorizontal: 70,
        justifyContent: 'center',
        borderColor: "#FFFFFF",
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 5, // Elevation for Android
    },
    
    btn: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#FCFCFC',
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        paddingHorizontal: 20,
        width: 290,
        justifyContent: 'center', // Space evenly between icon and text
        borderColor: "#FFFFFF",
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 5, // Elevation for Android
    },
    
});

export default VerifyIdentityScreen;
