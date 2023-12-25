// import React, { useRef, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   Button,
//   TextInput,
// } from 'react-native';
// import RBSheet from "react-native-raw-bottom-sheet";
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// // import MapView, { Marker } from 'react-native-maps';
// import Mapbox, { UserLocation, Camera } from '@rnmapbox/maps';
// import { Defs, G, Filter, Path, Rect, Svg } from 'react-native-svg';
import { SelectList } from 'react-native-dropdown-select-list';

// Mapbox.setAccessToken(
//   'sk.eyJ1IjoiYWxhbmRheXNtZWRpYSIsImEiOiJjbHB3eG55NWMwZzF4MmtvaHNta2kzZnF1In0.pxtwsKed6WLY4zP8c1UBmQ',
// );

// const initialRegion = {
//   latitude: 53.361496,
//   longitude: -2.997529,
//   latitudeDelta: 0.1,
//   longitudeDelta: 0.1,
// };

// const CENTER_COORD = [53.361496, -2.997529];

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const refRBSheet = useRef();
//   const [locheigth, setLocheigth] = useState(80)
//   return (
//     <View style={{ backgroundColor: "red", height: Dimensions.get("screen").height }}>
//       {/* <Image style={{ height: Dimensions.get("screen").height,width: Dimensions.get("screen").width,opacity:0.4,backgroundColor:'gray' }} source={require("../asssets/Basemap.png")} /> */}
//       <View style={{ backgroundColor: "red", height: Dimensions.get("screen").height }}>
//         <View style={styles.card1}>
//           <Mapbox.MapView
//             style={styles.map}

//             userLocation={true}
//             projection="globe"
//             initialCenterCoordinate={{
//               latitude: 53.361496,
//               longitude: -2.997529,
//             }}
//             followUserMode="heading"
//             zoomLevel={25}

//             pitchEnabled={true}
//           >

//             <Camera
//               defaultSettings={{ centerCoordinate: CENTER_COORD, zoomLevel: 14 }}
//               // centerCoordinate={[53.361496, -2.997529]}
//               zoomLevel={20}
//               followUserLocation
//               followZoomLevel={1}
//             />


//           </Mapbox.MapView>
//         </View>
//       </View>



//       <TouchableOpacity style={{ position: "absolute", right: 15, bottom: 170 }}>
//             <Svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <G filter="url(#filter0_bd_229_642)">
//                 <Rect x="4" width="55" height="55" rx="27.5" fill="white" />
//               </G>
//               <Path d="M32 12V42M47 26.9893H17M44.8571 26.9893C44.8566 30.4 43.5021 33.6711 41.0914 36.0838C38.6806 38.4966 35.4107 39.8537 32 39.8571C24.9007 39.8571 19.1429 34.0843 19.1429 26.9893C19.1446 23.5807 20.5 20.3123 22.911 17.9028C25.3221 15.4934 28.5914 14.1401 32 14.1407C35.4084 14.1407 38.6774 15.4941 41.0883 17.9035C43.4993 20.3128 44.8549 23.5808 44.8571 26.9893Z" stroke="black" stroke-width="2" stroke-linecap="square" />

//             </Svg>
//           </TouchableOpacity>

//       <View style={{ position: "absolute", zIndex: 100, bottom: 180 }}>
//         <View style={{ flexDirection: "row", justifyContent: "center", width: Dimensions.get("screen").width }}>
//           {/* <TouchableOpacity style={styles.mapBtn} onPress={() => {
//             setLocheigth(-260)
//             refRBSheet.current.open()
//           }}>
//             <Text style={{ color: "#000" }}>Farms
//             </Text>
//             <View >
//               <Svg style={{ alignSelf: "center", marginTop: 7 }} width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <Path d="M1 1L7.5 7L14 1" stroke="black" stroke-width="2" stroke-linecap="round" />
//               </Svg>
//             </View>
//           </TouchableOpacity> */}



//         </View>
//         <View style={{ alignItems:'center'}}>

//         <SelectList
//           setSelected={() => console.log("sasd")}
//           placeholder="Farms"
//           // defaultOption={{ key: values?.gender || "", value: values?.gender || "" }}
//           data={[
//             { key: 'Farm 1', value: 'Farm 1' },
//             { key: 'Farm 2', value: 'Farm 2' },
//             { key: 'Farm 3', value: 'Farm 3' },
//           ]}
//           boxStyles={[styles.input, styles.shadow]}

//           dropdownStyles={[{
//             height: 200,
//             width: 250,
//             backgroundColor: 'rgba(255,255,255,0.4)',
//             borderWidth: 1,
//             borderColor: 'rgba(255,255,255,0.4)',
//             borderRadius: 15,
//             marginTop: 20
//           }]}
//           save="value"
//         />
//         </View>
//         {/* <RBSheet
//           ref={refRBSheet}
//           closeOnDragDown={true}
//           onClose={() => setLocheigth(80)}
//           closeOnPressMask={false}
//           height={400}
//           minClosingHeight={100}
//           animationType='slide'
//           customStyles={{
//             wrapper: {
//               backgroundColor: "transparent",
//               zIndex: -100
//             },
//             container: {
//               borderTopEndRadius: 40,
//               borderTopStartRadius: 40,
//             },
//             draggableIcon: {
//               backgroundColor: "#000"
//             }
//           }}
//         >

//           <View style={{ flexDirection: "row", justifyContent: "center", width: Dimensions.get("screen").width }}>
//             <View>
//               <SelectList
//                 setSelected={() => console.log("sasd")}
//                 placeholder="Farms"
//                 // defaultOption={{ key: values?.gender || "", value: values?.gender || "" }}
//                 data={[
//                   { key: 'Farm 1', value: 'Farm 1' },
//                   { key: 'Farm 2', value: 'Farm 2' },
//                   { key: 'Farm 3', value: 'Farm 3' },
//                 ]}
//                 boxStyles={[styles.input, styles.shadow]}
//                 save="value"
//               />
//               <TextInput style={[{
//                 height: 200,
//                 width: 250,
//                 backgroundColor: '#fff',
//                 borderWidth: 1,
//                 borderColor: "#C0C0C0",
//                 borderRadius: 15,
//                 marginTop: 20
//               }, styles.shadow]} />
//             </View>


//           </View>
//         </RBSheet> */}
//       </View>
//     </View >

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     // paddingHorizontal: 10,
//   },
//   map: {
//     flex: 1,
//   },

//   mapBtn: {
//     borderRadius: 30,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: "#C0C0C0",
//     width: 150,
//     alignContent: 'center',
//     justifyContent: "space-around", flexDirection: "row",
//     alignSelf: "center",
//     height: 45,
//     paddingHorizontal: 20,
//     paddingVertical: 8
//   },
//   card1: {
//     backgroundColor: '#a9a9a9',
//     flex: 1,

//     width: '100%',
//     // alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//   },
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,

//     elevation: 6,
//   },
//   input: {
//     width: 150,

//     position: "relative",
//     height: 40,
//     backgroundColor: 'rgba(255,255,255,0.4)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     borderRadius: 30,
//     marginTop: 20,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "center",
//     // justifyContent: "space-between",
//   },
//   cardTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'black',
//   },

//   mapContainer: {
//     height: 300,
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   // map: {
//   //   ...StyleSheet.absoluteFillObject,
//   // },
//   mapImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 30,
//     resizeMode: 'cover',
//   },
// });

// export default HomeScreen;
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
const HomeScreen = () => {
  const polygonCoordinates = [
    { latitude: 31.5497, longitude: 74.3436 }, // Lahore
    { latitude: 31.5204, longitude: 74.3387 }, // Some other point in Lahore
    { latitude: 31.5104, longitude: 74.3387 }, // Some other point in Lahore
    { latitude: 31.5204, longitude: 74.3587 }, // Some other point in Lahore
    { latitude: 31.5497, longitude: 74.3865 }, // Another point in Lahore
    { latitude: 31.5497, longitude: 74.3444 }, // Another point in Lahore
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 31.5928548,
          longitude: 74.3640665,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: 31.5948548,
            longitude: 74.3640665,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        // image={imagePath.icGreenMarker}
        />
        <Polygon
          coordinates={polygonCoordinates}
          fillColor="rgba(0, 200, 0, 0.3)"
          strokeColor="#FF0000" // Change to red color
          strokeWidth={1}

        />
        {/* Markers */}
        {polygonCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title={`Point ${index + 1}`}
            description={`Marker at ${coordinate.latitude}, ${coordinate.longitude}`}

            pinColor="green"
          />
        ))}
      </MapView>
      <View style={{ position: "absolute", zIndex: 100, bottom: 200 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", width: Dimensions.get("screen").width }}>


        </View>
        <View style={{ alignItems: 'center' }}>

          <SelectList
            setSelected={() => console.log("sasd")}
            placeholder="Farms"
            // defaultOption={{ key: values?.gender || "", value: values?.gender || "" }}
            data={[
              { key: 'Farm 1', value: 'Farm 1' },
              { key: 'Farm 2', value: 'Farm 2' },
              { key: 'Farm 3', value: 'Farm 3' },
            ]}
            boxStyles={[styles.input, styles.shadow]}

            dropdownStyles={[{
              height: 200,
              width: 250,
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.9)',
              borderRadius: 15,
              marginTop: 20
            }, styles.shadow]}
            save="value"
          />
        </View>

      </View>
    </View>
  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 888,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    width: 150,

    position: "relative",
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 30,
    marginTop: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    // justifyContent: "space-between",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})