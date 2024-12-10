import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const FarmSection = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#1e90ff', '#f0e68c']} style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>My Farm Section</Text>

          <View style={styles.card1}>
            <Text style={styles.cardTitle}>Choose your farm</Text>
          </View>

          <View style={styles.touchablesContainer}>
            <TouchableOpacity
              style={styles.touchable1}
              onPress={() => navigation.navigate('detectedPests')}>
              <Text style={styles.touchableText}>Detected Pests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable1}
              onPress={() => navigation.navigate('usedPesticides')}>
              <Text style={styles.touchableText}>Used Pesticides</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card2}>
            <Text style={styles.cardTitle}>Farm Map</Text>
          </View>

          <View style={styles.touchablesContainer}>
            <TouchableOpacity style={styles.touchable2}>
              <Text style={styles.touchableText2}>Saved Locations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable2}>
              <Text style={styles.touchableText2}>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable2}>
              <Text style={styles.touchableText2}>User Account</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.fullWidthTouchable}>
            <Text style={styles.fullWidthTouchableText}>
              Terms and Conditions
            </Text>
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
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    marginTop: 20,
    color: '#fff',
    marginHorizontal: 30,
    marginBottom: 80,
  },
  card1: {
    backgroundColor: '#a9a9a9',
    marginTop: 20,
    // marginLeft: 20,
    paddingVertical: 20,
    width: '90%',

    // marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 50,
  },
  card2: {
    backgroundColor: '#a9a9a9',
    marginTop: 20,
    height: 200,
    // marginLeft: 20,
    // marginRight: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  touchablesContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  touchable1: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 2,
    marginBottom: 10,
  },
  touchable2: {
    backgroundColor: '#ff8c00',

    padding: 10,
    borderRadius: 20,

    marginHorizontal: 2,
  },
  touchableText: {
    color: '#464647',
    fontWeight: 'bold',
    fontSize: 20,
  },
  touchableText2: {
    color: '#464647',
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
});

export default FarmSection;
