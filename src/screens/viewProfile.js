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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ padding: 20, marginTop: 10, marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
                    </Svg>
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 24, fontWeight: "700", color: "#000", paddingTop: 20, marginLeft: -30 }}>Profile</Text> */}
                

            </View>
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
                        <Text style={styles.btnText}>{user.user_name || 'Name'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.email || 'Email'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.phone || 'Phone Number'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>{user.occupation || 'Occupation'}</Text>
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
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: 320,
        // justifyContent: 'center',
        borderColor: "#FFFFFF",
        flexDirection: "row",
    }
});

export default UserProfileScreen;
