import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import CustomComponent from './component/customComponent';
import { useNavigation } from '@react-navigation/native';

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/images/1509(1).png')} style={styles.backgroundImage}>
      <View style={styles.overlay}/>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.label}>Email Address</Text>
          <CustomComponent style={styles.socialContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor={'black'}

            />
          </CustomComponent>

          <Text style={styles.label}>Name</Text>
          <CustomComponent style={styles.socialContainer}>

            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor={'black'}

            />
          </CustomComponent>

          <Text style={styles.label}>Password</Text>
          <CustomComponent style={styles.socialContainer}>

            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={'black'}

              secureTextEntry
            />
          </CustomComponent>

          <Text style={styles.label}>Confirm Password</Text>
          <CustomComponent style={styles.socialContainer}>

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={'black'}

              secureTextEntry
            />
          </CustomComponent>

          <Text style={styles.label}>Occupation</Text>
          <CustomComponent style={styles.socialContainer}>

            <TextInput
              style={styles.input}
              placeholder="Enter your Occupation"
              placeholderTextColor={'black'}
            />
          </CustomComponent>

          <TouchableOpacity
            style={[styles.btn, { width: "65%" }]}
            onPress={() => navigation.navigate('accountSuccess')}
          >
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.resendText}>
              Already have an Account? <Text style={styles.resendLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    color:'black',
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    color:'black',

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust the opacity as needed
  },
});

export default CreateAccountScreen;
