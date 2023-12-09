import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {WebView} from 'react-native-webview';
import Mapbox, {UserLocation, Camera} from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWxhbmRheXNtZWRpYSIsImEiOiJjbHB3eG55NWMwZzF4MmtvaHNta2kzZnF1In0.pxtwsKed6WLY4zP8c1UBmQ',
);

const initialRegion = {
  latitude: 53.361496,
  longitude: -2.997529,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const CENTER_COORD = [53.361496, -2.997529];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.card1}>
      <Mapbox.MapView
        style={styles.map}
        userLocation={true}
        projection="globe"
        initialCenterCoordinate={{
          latitude: 53.361496,
          longitude: -2.997529,
        }}
        followUserMode="heading"
        zoomLevel={25}

        pitchEnabled={true}
        >
        
        <Camera
        defaultSettings={{ centerCoordinate: CENTER_COORD, zoomLevel: 14 }}
            // centerCoordinate={[53.361496, -2.997529]}
            zoomLevel={20}
            followUserLocation
            followZoomLevel={1}
          />


        </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  map: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
    // marginHorizontal: 30,
  },
  card1: {
    backgroundColor: '#a9a9a9',
    flex:1,
    // marginLeft: 20,
    width: '100%',
    // marginRight: 20,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  card2: {
    backgroundColor: '#a9a9a9',
    marginTop: 20,
    height: 150,
    // marginLeft: 20,
    // marginRight: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 20,
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
    paddingHorizontal: 35,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  touchable2: {
    backgroundColor: '#ff8c00',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
    // marginHorizontal: 40,
    marginBottom: 5,
    marginRight: 30,
  },
  touchableText: {
    color: '#464647',
    fontWeight: 'bold',
    fontSize: 20,
  },
  touchableText2: {
    color: '#464647',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fullWidthTouchable: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginVertical: 10,
    // marginHorizontal:16,
    fontSize: 12,
    borderRadius: 10,
    // marginVertical: 640,
    // position: 'absolute',
    // left: 0,
    // right: 0,
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
    color: '#464647',
    fontWeight: 'bold',
    fontSize: 28,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 2,
  },
  mapContainer: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
