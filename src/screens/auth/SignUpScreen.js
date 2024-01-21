import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import CustomComponent from '../../components/customComponent';
import { useNavigation } from '@react-navigation/native';
import { signUpAsync } from '../../redux/slices/authSlice'
import * as Yup from 'yup'


import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { post } from '../../utils/axios';
const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    occupation: '',
  };


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    occupation: Yup.string().notRequired(), // Allow it to be optional
  });

const handleSubmit = async (values) => {
  try {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
      occupation: values.occupation,
    };

    const response = await post('/registration', payload);

    console.log('Server response:', response);

    if (response.data && response.data.code === 0) {
      dispatch(signUpAsync(response.data.data));
      navigation.navigate('accountSuccess');
    } else {
      console.error('Registration failed', response.data && response.data.message);
    }
  } catch (error) {
    console.error('Registration failed', error);
  }
};





  return (
    <ImageBackground
      source={require('../../../assets/images/1509(1).png')}
      style={styles.backgroundImage} // Add the style prop here
    >
      <View style={styles.overlay}>
        <ScrollView>
          <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <>
                  <Text style={styles.label}>Email Address</Text>
                  <CustomComponent style={styles.socialContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      placeholderTextColor={'black'}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </CustomComponent>
                  {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

                  <Text style={styles.label}>Name</Text>
                  <CustomComponent style={styles.socialContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Name"
                      placeholderTextColor={'black'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </CustomComponent>
                  {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

                  <Text style={styles.label}>Password</Text>
                  <CustomComponent style={styles.socialContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Password"
                      placeholderTextColor={'black'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                  </CustomComponent>
                  {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

                  <Text style={styles.label}>Confirm Password</Text>
                  <CustomComponent style={styles.socialContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor={'black'}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry
                    />
                  </CustomComponent>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                  )}

                  <Text style={styles.label}>Occupation</Text>
                  <CustomComponent style={styles.socialContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your Occupation"
                      placeholderTextColor={'black'}
                      onChangeText={handleChange('occupation')}
                      onBlur={handleBlur('occupation')}
                      value={values.occupation}
                    />
                  </CustomComponent>
                  {touched.occupation && errors.occupation && <Text style={{ color: 'red' }}>{errors.occupation}</Text>}

                  <TouchableOpacity style={[styles.btn, { width: '65%' }]} onPress={handleSubmit}>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: '#000' }}>Sign Up</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>



            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.resendText}>
                Already have an Account? <Text style={styles.resendLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    width: '90%',
    // marginVertical: 5,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  label: {
    fontSize: 16,
    lineHeight: 35,
    color: 'black',
  },
  socialContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: "#FFFFFF",
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
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    color: 'black',

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust the opacity as needed
  },
});

export default SignUpScreen;
