import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import CustomComponent from './component/customComponent';
import Svg, {Path} from 'react-native-svg';
const NewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    return (
        <ImageBackground source={require('../assets/images/1509.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>New Password</Text>
                <View style={styles.socialRow}>
                <CustomComponent>
                    <Svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.38333 6.06177C2.59583 6.06177 1 7.36843 1 11.2876C1 15.2076 2.59583 16.5143 7.38333 16.5143C12.1708 16.5143 13.7675 15.2076 13.7675 11.2876C13.7675 7.36843 12.1708 6.06177 7.38333 6.06177Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M7.38346 10.5051V12.356" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M11.1838 6.54446V4.75363C11.158 2.65446 9.43467 0.974461 7.33634 1.00029C5.28051 1.02613 3.61801 2.68113 3.58301 4.73696V6.54446" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </CustomComponent>
                </View>
                <View style={styles.socialRow}>
                <CustomComponent>
                    <Svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.38333 6.06177C2.59583 6.06177 1 7.36843 1 11.2876C1 15.2076 2.59583 16.5143 7.38333 16.5143C12.1708 16.5143 13.7675 15.2076 13.7675 11.2876C13.7675 7.36843 12.1708 6.06177 7.38333 6.06177Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M7.38346 10.5051V12.356" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M11.1838 6.54446V4.75363C11.158 2.65446 9.43467 0.974461 7.33634 1.00029C5.28051 1.02613 3.61801 2.68113 3.58301 4.73696V6.54446" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                    <TextInput
                        style={styles.input}
                        placeholder="Re-enter Your Password"
                        onChangeText={(text) => setReEnterPassword(text)}
                        secureTextEntry
                    />
                </CustomComponent>
                </View>
                <TouchableOpacity style={styles.nextButton}>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        color: 'white',
    },
    nextButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },

    input: {
        height: 40,
        // borderColor: 'gray',
        // borderWidth: 1,
        paddingHorizontal: 10,
        color: 'white',
    },
    nextButton: {
        backgroundColor: 'white',
        padding: 15,
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 8,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
});

export default NewPasswordScreen;
