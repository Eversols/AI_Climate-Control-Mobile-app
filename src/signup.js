import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignupScreen = () => {
  const navigation = useNavigation();
  const handleSignup = (values) => {
    navigation.navigate('Home');

  };
  return (


    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#1e90ff', '#f0e68c']} style={[styles.container, { paddingHorizontal: 30 }]}>

        <Text style={styles.title}>AI Climate Smart Pest Management</Text>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          // validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 45,
    marginTop: 50,
    alignItems: 'center',
    textAlign: "center"
    // marginHorizontal: 35,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "600",
    color: '#ffffff',
    // marginLeft: 20,
    textAlign: "center",
    marginBottom: 80,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    color: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 110,
    alignItems: 'center',
    maxWidth: 220,
    marginHorizontal: 60,
  },
  button2: {
    backgroundColor: '#228b22',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 10,
    marginTop: 40,
    maxWidth: 260,
    marginHorizontal: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
