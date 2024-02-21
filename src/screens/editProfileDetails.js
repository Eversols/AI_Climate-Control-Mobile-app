import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Modal, StyleSheet, Image, ImageBackground, TextInput, Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Path, Circle } from 'react-native-svg';
import * as ImagePicker from 'react-native-image-picker';
import { put } from '../utils/axios';

const EditProfileDetails = (navigation) => {
    const { user } = useSelector((state) => state.authReducer)

    const navigateToUserProfile = () => {
        navigation.navigate('UserProfileView', { user });
    };
  
    const [editMode, setEditMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [occupation, setOccupation] = useState(user.occupation);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePhoneChange = (text) => {
        setPhone(text);
    };

    const handleOccupationChange = (text) => {
        setOccupation(text);
    };

    const openImagePicker = () => {
        setModalVisible(true);
    };

    const handleCameraSelect = () => {
        ImagePicker.launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel) {
                setSelectedImage(response.uri);
            }
        });
    };

    const handleGallerySelect = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel) {
                setSelectedImage(response.uri);
            }
        });
    };

    const saveChanges = async () => {
        try {
            const payload = {
                user_name: name,
                email: email,
                phone: phone,
                occupation: occupation,
            };
    
            console.log('Sending request with payload:', payload); // Add this line
    
            const response = await put(`/editUser/${user.id}`, payload);
    
            console.log('useriddddddddddd', user.id);
            console.log('Server response:', response);
    
            if (response.data.success) {
                dispatch(setUser(response.data.data.user)); // Dispatch setUser action
                console.log('Profile updated successfully');
            } else {
                console.error('Failed to update profile:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    
    

    
    return (
        <ImageBackground
            source={require('../../asssets/profileBack.png')}
            style={styles.backgroundImage}>
                <ScrollView>
            <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                    <TouchableOpacity style={styles.circularBorder} onPress={openImagePicker}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                        ) : (
                            <Image source={require('../../asssets/profilePic.png')} style={styles.profileImage} />
                        )}
                          <TouchableOpacity  style={styles.uploadIcon}  onPress={openImagePicker}>
                            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="20" cy="20" r="20" fill="#E4EAE3" />
                                <Path d="M15.8242 12.2446L15.418 13.4286H12.5C11.1211 13.4286 10 14.5176 10 15.8571V25.5714C10 26.9109 11.1211 28 12.5 28H27.5C28.8789 28 30 26.9109 30 25.5714V15.8571C30 14.5176 28.8789 13.4286 27.5 13.4286H24.582L24.1758 12.2446C23.9219 11.5009 23.207 11 22.3984 11H17.6016C16.793 11 16.0781 11.5009 15.8242 12.2446ZM20 17.0714C20.9946 17.0714 21.9484 17.4552 22.6517 18.1384C23.3549 18.8216 23.75 19.7481 23.75 20.7143C23.75 21.6804 23.3549 22.607 22.6517 23.2902C21.9484 23.9733 20.9946 24.3571 20 24.3571C19.0054 24.3571 18.0516 23.9733 17.3483 23.2902C16.6451 22.607 16.25 21.6804 16.25 20.7143C16.25 19.7481 16.6451 18.8216 17.3483 18.1384C18.0516 17.4552 19.0054 17.0714 20 17.0714Z" fill="#3C3C3C" />
                            </Svg>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>


                <View style={styles.userInfo}>

                <TouchableOpacity style={styles.btn}>
                        <TextInput
                            style={styles.userInfoText}
                            value={name}
                            onChangeText={handleNameChange}
                            placeholder="Name"
                        />
                         <TouchableOpacity style={styles.editIcon} onPress={toggleEditMode}>
                                <Svg width="19" height="19" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08196 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" />
                                </Svg>
                            </TouchableOpacity>
                    </TouchableOpacity>
            
                    <TouchableOpacity style={styles.btn}>
                        <TextInput
                            style={styles.userInfoText}
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="Email"
                        />
                 

                            <TouchableOpacity style={styles.editIcon} onPress={toggleEditMode}>
                                <Svg width="19" height="19" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08196 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" />
                                </Svg>
                            </TouchableOpacity>
                        </TouchableOpacity>
                   
                        <TouchableOpacity style={styles.btn}>
                        <TextInput
                            style={styles.userInfoText}
                            value={phone}
                            onChangeText={handlePhoneChange}
                            placeholder="Phone Number"
                        />
                            <TouchableOpacity style={styles.editIcon} onPress={toggleEditMode}>
                                <Svg width="19" height="19" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08196 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" />
                                </Svg>
                            </TouchableOpacity>
                        </TouchableOpacity>
                
                        <TouchableOpacity style={styles.btn}>
                        <TextInput
                            style={styles.userInfoText}
                            value={occupation}
                            onChangeText={handleOccupationChange}
                            placeholder="Occupation"
                        />
                            <TouchableOpacity style={styles.editIcon} onPress={toggleEditMode}>
                                <Svg width="19" height="19" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08196 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" />
                                </Svg>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        
                    <TouchableOpacity style={styles.nextBtn} onPress={saveChanges}>
                        <Text style={styles.nextBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>


            </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.chooseFrom}>Choose from</Text>
                        <TouchableOpacity  onPress={handleGallerySelect}>
                            <Text style={styles.optionButtonText}>Photos</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={handleCameraSelect}>
                            <Text style={styles.optionButtonText}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        borderColor:'#FFF',
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
    chooseFrom: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight:'600',
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius:29,
        padding: 20,
        fontSize:16,
        fontWeight:'400',
        width: '80%',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight:'400', 
    },
    nextBtn: {
        backgroundColor: '#FCFCFC',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 40, // Adjust as needed
        width: 200,
        alignItems: 'center',
    },
    nextBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight:'700'
    },
    userInfo: {
        marginTop: 25,
        alignItems: 'center',
    },
    userInfoText: {
        // textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontWeight: '400',
        width:'90%',
        lineHeight: 27,
        height:50,
        textAlignVertical:'center',
    },
    btn: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#FCFCFC',
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 2,
        height: 40,
        paddingHorizontal: 20,
        width: 280,
        justifyContent: 'space-between', // Space evenly between icon and text
        borderColor: "#FFFFFF",
    },
    editIcon: {
        width:18,
        height:18
    }
});

export default EditProfileDetails;

