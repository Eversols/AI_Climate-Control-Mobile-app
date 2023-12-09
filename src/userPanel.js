import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const UserPanel = () => {
  const navigation = useNavigation();
  const handleImagePress = () => {
    navigation.navigate('VisionCameraScreen');
  };

  return (

    <LinearGradient colors={['#1e90ff', '#f0e68c']} style={styles.container}>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>User Panel</Text>


          <TouchableOpacity onPress={handleImagePress}>
            <View style={styles.card1}>
              <Text style={styles.cardTitle}>Allow Access to Camera </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.touchablesContainer}>
            <TouchableOpacity style={styles.touchable1} onPress={() => navigation.navigate('userPanel2')}>
              <Text style={styles.touchableText}>Upload Image</Text>
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
      </ScrollView>
    </LinearGradient>

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
    width: 300,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
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
    paddingHorizontal: 20,
    borderRadius: 40,
    marginHorizontal: 5,
    marginBottom: 200,
  },
  touchable2: {
    backgroundColor: '#a9a9a9',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  touchableText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
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
  },

});

export default UserPanel;
