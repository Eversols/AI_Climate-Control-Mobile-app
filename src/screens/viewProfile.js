import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Path, Circle } from 'react-native-svg';

const UserProfileScreen = ({navigation}) => {
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
                        <Image source={require('../../asssets/profilePic.png')} style={styles.profileImage} />
                        <TouchableOpacity onPress={handleImageUpload} style={styles.uploadIcon}>
                            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20" cy="20" r="20" fill="#E4EAE3" />
                                <Path d="M15.8242 12.2446L15.418 13.4286H12.5C11.1211 13.4286 10 14.5176 10 15.8571V25.5714C10 26.9109 11.1211 28 12.5 28H27.5C28.8789 28 30 26.9109 30 25.5714V15.8571C30 14.5176 28.8789 13.4286 27.5 13.4286H24.582L24.1758 12.2446C23.9219 11.5009 23.207 11 22.3984 11H17.6016C16.793 11 16.0781 11.5009 15.8242 12.2446ZM20 17.0714C20.9946 17.0714 21.9484 17.4552 22.6517 18.1384C23.3549 18.8216 23.75 19.7481 23.75 20.7143C23.75 21.6804 23.3549 22.607 22.6517 23.2902C21.9484 23.9733 20.9946 24.3571 20 24.3571C19.0054 24.3571 18.0516 23.9733 17.3483 23.2902C16.6451 22.607 16.25 21.6804 16.25 20.7143C16.25 19.7481 16.6451 18.8216 17.3483 18.1384C18.0516 17.4552 19.0054 17.0714 20 17.0714Z" fill="#3C3C3C" />
                            </Svg>
                        </TouchableOpacity>
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
                        <Text style={styles.btnText}>Phone Number{user.phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Occupation{user.occupation}</Text>
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
        marginTop:70,
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    circularBorder: {
        position: 'relative',
        borderWidth: 1,
        borderColor:'#FFF',
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
