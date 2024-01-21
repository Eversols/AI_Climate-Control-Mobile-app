import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomComponent from '../../components/customComponent';
import { RadioButton } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import { Formik } from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import { signInAsync } from '../../redux/slices/authSlice';
import { post } from '../../utils/axios';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignIn = async (values) => {
    try {
      const payload = {
        email: values.email.trim(),
        password: values.password,
      };
      
  
      const response = await post('/login', payload);
  
      console.log('Server response:', response);
  
      if (response.data && response.data.code === 0) {
        console.log('Authentication data:', response.data.data);
  
        dispatch(signInAsync(response.data.data));
  
        navigation.navigate('bottom_navigation');
      } else {
        console.error('Sign-in failed', response.data && response.data.message);
      }
    } catch (error) {
      console.error('Sign-in failed', error.response?.status, error.response?.data);
    }
  };
  
  

  return (
    <ImageBackground source={require('../../../assets/images/image119.png')} style={styles.backgroundImage} blurRadius={5}>
 <View style={styles.overlay} />
      <ScrollView>
        <View style={styles.container}>
          <CustomComponent style={styles.logoContainer}>
            <Text style={styles.logoText}>Logo</Text>
          </CustomComponent>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Text style={styles.label}>Email Address</Text>
                <CustomComponent style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </CustomComponent>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <Text style={styles.label}>Password</Text>
                <CustomComponent style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </CustomComponent>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.checkboxContainer}>
                  <View style={styles.checkboxRow}>
                    <RadioButton
                      value="remember"
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(!checked)}
                      color='black'
                    />
                    <Text style={styles.checkboxText}>Remember Me</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
                    <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.btn, { width: "65%" }]}
                  onPress={handleSubmit}
                >
                  <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Log In</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialContainer}>
              {/* <Image source={require('../assets/images/Group1000007855.png')} style={styles.socialImage} /> */}
              <Svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialImage}>
                <Path d="M25.3031 13.366C25.3031 12.3633 25.2185 11.6316 25.0355 10.8728H13.1343V15.3985H20.12C19.9792 16.5232 19.2187 18.2169 17.5285 19.3551L17.5048 19.5066L21.2678 22.3111L21.5285 22.3361C23.9228 20.2088 25.3031 17.0787 25.3031 13.366Z" fill="#4285F4" />
                <Path d="M13.1343 25.2901C16.5568 25.2901 19.4299 24.206 21.5286 22.3362L17.5286 19.3551C16.4582 20.0733 15.0216 20.5746 13.1343 20.5746C9.7823 20.5746 6.9373 18.4473 5.92313 15.507L5.77448 15.5191L1.86172 18.4324L1.81055 18.5692C3.895 22.5529 8.17663 25.2901 13.1343 25.2901Z" fill="#069DF0" />
                <Path d="M5.92314 15.507C5.65555 14.7482 5.50068 13.9352 5.50068 13.0951C5.50068 12.255 5.65555 11.442 5.90906 10.6832L5.90198 10.5216L1.94018 7.56152L1.81055 7.62084C0.951451 9.27397 0.458496 11.1304 0.458496 13.0951C0.458496 15.0599 0.951451 16.9162 1.81055 18.5693L5.92314 15.507Z" fill="#FBBC05" />
                <Path d="M13.1343 5.61541C15.5145 5.61541 17.1201 6.60456 18.0356 7.43117L21.613 4.07074C19.416 2.10598 16.5568 0.900024 13.1343 0.900024C8.17663 0.900024 3.895 3.63711 1.81055 7.6208L5.90906 10.6832C6.9373 7.7428 9.7823 5.61541 13.1343 5.61541Z" fill="#EB4335" />
              </Svg>

              <Text style={styles.socialText}>Connect with Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialRow}>
            {/* <CustomComponent onPress={() => console.log('Connect with Apple ID pressed')} style={styles.socialContainer}> */}
              <TouchableOpacity style={styles.socialContainer}>
                <Svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialImage}>
                  <Path d="M19.9966 26.8766C18.4459 28.3542 16.7527 28.1209 15.1229 27.421C13.3981 26.7055 11.8157 26.6744 9.99598 27.421C7.71736 28.3853 6.51476 28.1053 5.15392 26.8766C-2.56807 19.0532 -1.42876 7.1391 7.3376 6.7036C9.4738 6.81247 10.9612 7.85456 12.2113 7.94789C14.0785 7.5746 15.8666 6.5014 17.8604 6.64138C20.2498 6.82803 22.0537 7.76124 23.2405 9.44103C18.3035 12.3496 19.4744 18.7421 24 20.5307C23.098 22.8638 21.9271 25.1813 19.9808 26.8922L19.9966 26.8766ZM12.0531 6.61028C11.8157 3.14183 14.6798 0.279965 17.9712 0C18.43 4.01283 14.2684 6.99912 12.0531 6.61028Z" fill="white" />
                </Svg>
                <Text style={styles.socialText}>Connect with Apple ID</Text>
              </TouchableOpacity>
            {/* </CustomComponent> */}
          </View>
          <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialContainer}>

              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialImage}>
                <Path d="M24 12.0743C24 5.40402 18.6248 0 12 0C5.37075 0 0 5.40402 0 12.0743C0 18.0994 4.38675 23.0952 10.125 24V15.5653H7.07775V12.0751H10.125V9.41345C10.125 6.38808 11.9138 4.71729 14.6558 4.71729C15.969 4.71729 17.3438 4.95274 17.3438 4.95274V7.92378H15.828C14.34 7.92378 13.875 8.85577 13.875 9.8104V12.0743H17.2028L16.668 15.5646H13.875V23.9992C19.6087 23.0944 24 18.0987 24 12.0736V12.0743Z" fill="#4285F4" />
              </Svg>

              <Text style={styles.socialText}>Connect with Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 150,
    height: 100,
    // width: windowWidth * 0.5,
    // height: windowHeight * 0.2,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  label: {
    fontSize: 16,
    lineHeight: 30,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: "90%",
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  socialContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius:40,
  },
  socialImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 15,
  },
  socialText: {
    paddingVertical: 10,
    color: 'black',
    fontSize: 16,

  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  signupText: {
    marginRight: 5,
    fontSize: 14,
    color: 'black',
  },
  signupLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
    color: 'black',

  },
  forgotPasswordLink: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 13,
    color: 'black',


  },
});

export default LoginScreen;
