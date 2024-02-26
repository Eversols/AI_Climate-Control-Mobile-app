import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Path, Circle } from 'react-native-svg';

const UserProfileScreen = ({ navigation }) => {
    const { user } = useSelector((state) => state.authReducer);
    console.log('userrrrrrrrrrrr', user);
    const navigateToEditProfile = () => {
        // navigation.navigate('editProfileDetails', { user });
        navigation.navigate('VerifyIdentityScreen')
    };

    // Function to handle image upload
    const handleImageUpload = () => {
        // Implement your logic to trigger image upload from device
        console.log('Upload image from device');
    };

    return (
        <ImageBackground
            source={require('../../asssets/profileBack.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.circularBorder}>
                        <Image
                            source={user.avatar ? { uri: user.avatar } : require('../../asssets/profilePic.png')}
                            style={styles.profileImage}
                        />

                    </View>
                </View>

                <View style={styles.userInfo}>
                    {/* <Text style={styles.userName}>{user.user_name.toUpperCase()}</Text> */}
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.user_name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.occupation}</Text>
                    </TouchableOpacity>
                </View>

                {/* Move the Edit Details button to the bottom */}
                <TouchableOpacity style={styles.editDetailsBtn} onPress={navigateToEditProfile}>
                    <Text style={styles.btnText}>Edit Details</Text>
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
        marginTop: 70,
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    circularBorder: {
        position: 'relative',
        borderWidth: 1,
        borderColor: '#FFF',
        // borderColor: '#3C3C3C',
        borderRadius: 100,
        overflow: 'visible',
        width: 120,
        height: 120,
    },

    uploadIcon: {
        position: 'absolute',
        bottom: -3,
        right: -3,
        zIndex: 1,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    userInfo: {
        marginTop: 25,
        alignItems: 'center',
    },
    userName: {
        textAlign: 'center',
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
    },
    editDetailsBtn: {
        backgroundColor: '#FCFCFC',
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        position: 'absolute', // Position at the bottom
        bottom: 20, // Adjust bottom spacing
    },
    btnText: {
        fontWeight: '400',
        fontSize: 18,
        color: '#000000',
    },
    btn: {
        backgroundColor: '#FCFCFC',
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 2,
        // height: 50,
        paddingHorizontal: 20,
        paddingVertical: 8,
        width: 250,
        // justifyContent: 'center',
        borderColor: "#FFFFFF",
        flexDirection: "row",
    }
});

export default UserProfileScreen;
