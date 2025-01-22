import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Camera } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

const DetectedPests = () => {
  const navigation = useNavigation();
  const camera = useRef(null);

  const handleImagePress = () => {
    navigation.navigate('VisionCameraScreen');
  };



  return (
    <ScrollView>
      <LinearGradient colors={['#1e90ff', '#f0e68c']} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Detected Pests</Text>
          {/* 
        <View style={styles.card1}>
          <Text style={styles.cardTitle}>Image</Text>
        </View> */}
          <TouchableOpacity onPress={handleImagePress}>
            <View style={styles.card1}>
              <Text style={styles.cardTitle}>Image</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.touchablesContainer}>
            <TouchableOpacity style={styles.touchable1} >
              <Text style={styles.touchableText}>Select Insect</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card2}>
            <TextInput style={styles.input} placeholder="Species" />
            <TextInput style={styles.input} placeholder="Description" />
            <TextInput style={styles.input} placeholder="Habitat" />
            <TextInput style={styles.input} placeholder="Location" />
            <TextInput style={styles.input} placeholder="Physical Characteristics" />
          </View>

          <View style={{ marginTop: 15 }}>
            <TouchableOpacity style={styles.touchable3} >
              <Text style={styles.touchableText2}>Recomended Pesticides</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.touchablesContainer}>

            <TouchableOpacity style={styles.touchable2} >
              <Text style={styles.touchableText2}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable2} >
              <Text style={styles.touchableText2}>User Account</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.fullWidthTouchable} >
            <Text style={styles.fullWidthTouchableText}>Terms and Conditions</Text>
          </TouchableOpacity>

          <View style={styles.betaSection}>
            <Text style={styles.betaText}>BETA</Text>
            <View style={styles.line}></View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    marginTop: 70,
    color: '#fff',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  card1: {
    backgroundColor: '#a9a9a9',
    height: 180,
    marginLeft: 20,
    paddingVertical: 20,
    width: 250,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  card2: {
    // backgroundColor: '#a9a9a9',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 15,
    width: 370,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  touchablesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  touchable1: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  touchable2: {
    backgroundColor: '#ff8c00',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  touchable3: {
    backgroundColor: '#ff8c00',
    paddingVertical: 8,
    paddingHorizontal: 80,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  touchableText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  touchableText2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fullWidthTouchable: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  fullWidthTouchableText: {
    color: '#464647',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
  betaSection: {
    // position: 'absolute',
    // bottom: 10,
  },
  betaText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 2,
  },
  listItem: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  input: {
    // height: 35,
    borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 2,
    paddingLeft: 10,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    color: 'black',
    borderColor: '#ffffff',
  },
  input22: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
    marginBottom: 2,
  },
});

export default DetectedPests;
