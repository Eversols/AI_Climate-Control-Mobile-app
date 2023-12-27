
import { SelectList } from 'react-native-dropdown-select-list';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import Svg, { Path, Rect, G, Defs, ClipPath, Line } from 'react-native-svg';
import { BlurView } from '@react-native-community/blur';
import CustomComponent from './component/customComponent';

const HomeScreen = () => {
  const [isAddFarmVisible, setAddFarmVisible] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const [isAddPolygonMode, setAddPolygonMode] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  useEffect(() => {
    setAddFarmVisible(false);
    setShowSearchButton(false);
    setShowContinueButton(false);
  }, []);

  const handleAddFarmPress = () => {
    setAddFarmVisible(true);
    setShowSearchButton(false);
    setShowContinueButton(false);
  };

  const handleOKPress = () => {
    setAddFarmVisible(false);
    setShowSearchButton(true);
    setShowContinueButton(true);
  };
  const handleAddPolygonPress = () => {
    // console.log('Add Polygon ');
    setAddFarmVisible(false);
    setShowSearchButton(false);
    setShowContinueButton(false);
    setAddPolygonMode(true);
    setPolygonCoordinates([]); 
    setPolygonButtonPressed(true); 
  };

  const [isPolygonButtonPressed, setPolygonButtonPressed] = useState(false);

  const handleMapPress = (event) => {
    if (isAddPolygonMode) {
      const newCoordinate = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };
      setPolygonCoordinates((prevCoordinates) => {
        const updatedCoordinates = [...prevCoordinates, newCoordinate];
        // console.log('updateddddd:', updatedCoordinates);
        return updatedCoordinates;
      });
    }
  };


  const thepolygonCoordinates = [
    { latitude: 31.5497, longitude: 74.3436 }, // Lahore
    { latitude: 31.5204, longitude: 74.3387 }, // Some other point in Lahore
    { latitude: 31.5104, longitude: 74.3387 }, // Some other point in Lahore
    { latitude: 31.5204, longitude: 74.3587 }, // Some other point in Lahore
    { latitude: 31.5497, longitude: 74.3865 }, // Another point in Lahore
    { latitude: 31.5497, longitude: 74.3444 }, // Another point in Lahore
  ];
  const renderFarmIcons = (onAddPolygonPress) => {
    const farmIcons = [
      (
        // <TouchableOpacity onPress={handleAddPolygonPress}>
        <TouchableOpacity
          onPress={handleAddPolygonPress}
          onPressIn={() => setPolygonButtonPressed(true)} 
          onPressOut={() => setPolygonButtonPressed(false)} 
        >
          
            {isPolygonButtonPressed ? (
              <View
              style={{
                borderWidth: 5, // Add a border width
                borderRadius: 30,
                borderColor: '#228b22', // Set border color to green when pressed
              }}
              key={0}
            >
              <Svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0_612_1957)">
                  <Path d="M13.0565 14.2294C10.7413 16.5451 9.44061 19.6855 9.44061 22.9601C9.44061 26.2346 10.7413 29.3751 13.0565 31.6907C13.378 32.0233 13.556 32.4688 13.5522 32.9313C13.5484 33.3938 13.3631 33.8364 13.0362 34.1636C12.7093 34.4908 12.267 34.6765 11.8045 34.6807C11.3419 34.685 10.8963 34.5074 10.5634 34.1862C8.71673 32.3403 7.35385 30.0674 6.59549 27.5689C5.83714 25.0704 5.70673 22.4234 6.21582 19.8624C6.72492 17.3015 7.85779 14.9056 9.51408 12.8871C11.1704 10.8686 13.2989 9.28977 15.7112 8.29048C18.1235 7.29119 20.745 6.9023 23.3435 7.15826C25.942 7.41421 28.4372 8.30712 30.6082 9.75786C32.7791 11.2086 34.5587 13.1724 35.7894 15.4753C37.02 17.7782 37.6636 20.349 37.6633 22.9601C37.6633 23.4279 37.4774 23.8766 37.1466 24.2074C36.8158 24.5382 36.3671 24.7241 35.8993 24.7241C35.4314 24.7241 34.9827 24.5382 34.6519 24.2074C34.3211 23.8766 34.1353 23.4279 34.1353 22.9601C34.135 20.5181 33.4106 18.131 32.0538 16.1006C30.6969 14.0703 28.7685 12.4878 26.5124 11.5533C24.2563 10.6189 21.7737 10.3743 19.3786 10.8507C16.9835 11.327 14.7834 12.5028 13.0565 14.2294Z" fill="black" />
                  <Path d="M20.3446 20.179C20.6614 19.996 21.0273 19.9161 21.3915 19.9502C21.7558 19.9843 22.1005 20.1309 22.3777 20.3696L31.8215 28.4971C32.0802 28.7204 32.2684 29.0141 32.3633 29.3425C32.4582 29.6708 32.4557 30.0197 32.356 30.3466C32.2563 30.6735 32.0639 30.9645 31.8019 31.184C31.54 31.4036 31.22 31.5424 30.8807 31.5835L29.0877 31.7985L30.3987 34.0648C30.6326 34.4703 30.6959 34.9522 30.5746 35.4043C30.4532 35.8565 30.1573 36.242 29.7517 36.4759C29.3462 36.7098 28.8644 36.7731 28.4122 36.6518C27.96 36.5305 27.5746 36.2345 27.3407 35.829L26.0342 33.5614L24.9551 35.0048C24.7502 35.279 24.4699 35.4876 24.1484 35.6053C23.827 35.7229 23.4782 35.7445 23.1447 35.6674C22.8112 35.5903 22.5073 35.4178 22.2701 35.1709C22.0329 34.9241 21.8727 34.6135 21.809 34.2772L19.4926 22.0339C19.4249 21.6745 19.4705 21.303 19.6231 20.9707C19.7757 20.6384 20.0278 20.3617 20.3446 20.179Z" fill="black" />
                  <Path d="M17.4438 27.5043C16.692 26.7521 16.1372 25.8261 15.8287 24.8083C15.5201 23.7905 15.4673 22.7124 15.6749 21.6693C15.8825 20.6263 16.344 19.6505 17.0187 18.8284C17.6935 18.0063 18.5605 17.3632 19.543 16.9562C20.5256 16.5492 21.5933 16.3907 22.6517 16.4948C23.7101 16.5989 24.7265 16.9624 25.6109 17.5531C26.4953 18.1438 27.2204 18.9435 27.722 19.8813C28.2236 20.8191 28.4862 21.8661 28.4865 22.9296C28.4865 23.3975 28.6724 23.8461 29.0032 24.177C29.334 24.5078 29.7827 24.6936 30.2505 24.6936C30.7184 24.6936 31.1671 24.5078 31.4979 24.177C31.8287 23.8461 32.0145 23.3975 32.0145 22.9296C32.0147 21.2857 31.6094 19.6671 30.8346 18.2172C30.0597 16.7674 28.9393 15.531 27.5725 14.6176C26.2056 13.7042 24.6346 13.142 22.9986 12.9808C21.3626 12.8196 19.7121 13.0644 18.1933 13.6935C16.6745 14.3226 15.3343 15.3165 14.2914 16.5873C13.2485 17.8581 12.5352 19.3664 12.2145 20.9788C11.8938 22.5911 11.9757 24.2577 12.453 25.8308C12.9303 27.4039 13.7882 28.8351 14.9507 29.9974C15.1122 30.1707 15.307 30.3097 15.5233 30.4061C15.7397 30.5026 15.9733 30.5544 16.2102 30.5586C16.447 30.5628 16.6823 30.5192 16.9019 30.4305C17.1216 30.3418 17.3211 30.2097 17.4886 30.0422C17.6561 29.8747 17.7882 29.6752 17.8769 29.4555C17.9656 29.2359 18.0092 29.0006 18.005 28.7637C18.0008 28.5269 17.949 28.2933 17.8526 28.0769C17.7562 27.8605 17.6172 27.6658 17.4438 27.5043Z" fill="black" />
                </G>
                <Defs>
                  <ClipPath id="clip0_612_1957">
                    <Rect width="37.6322" height="37.6322" fill="white" transform="translate(0 10) rotate(-15)" />
                  </ClipPath>
                </Defs>
              </Svg>
              </View>
            ) : (
              <View
            style={{
              borderWidth: 2, // Add a border width
              borderRadius: 20,
              borderColor:  'transparent', // Set border color to green when pressed
            }}
            key={0}
          >
              <Svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0_612_1957)">
                  <Path d="M13.0565 14.2294C10.7413 16.5451 9.44061 19.6855 9.44061 22.9601C9.44061 26.2346 10.7413 29.3751 13.0565 31.6907C13.378 32.0233 13.556 32.4688 13.5522 32.9313C13.5484 33.3938 13.3631 33.8364 13.0362 34.1636C12.7093 34.4908 12.267 34.6765 11.8045 34.6807C11.3419 34.685 10.8963 34.5074 10.5634 34.1862C8.71673 32.3403 7.35385 30.0674 6.59549 27.5689C5.83714 25.0704 5.70673 22.4234 6.21582 19.8624C6.72492 17.3015 7.85779 14.9056 9.51408 12.8871C11.1704 10.8686 13.2989 9.28977 15.7112 8.29048C18.1235 7.29119 20.745 6.9023 23.3435 7.15826C25.942 7.41421 28.4372 8.30712 30.6082 9.75786C32.7791 11.2086 34.5587 13.1724 35.7894 15.4753C37.02 17.7782 37.6636 20.349 37.6633 22.9601C37.6633 23.4279 37.4774 23.8766 37.1466 24.2074C36.8158 24.5382 36.3671 24.7241 35.8993 24.7241C35.4314 24.7241 34.9827 24.5382 34.6519 24.2074C34.3211 23.8766 34.1353 23.4279 34.1353 22.9601C34.135 20.5181 33.4106 18.131 32.0538 16.1006C30.6969 14.0703 28.7685 12.4878 26.5124 11.5533C24.2563 10.6189 21.7737 10.3743 19.3786 10.8507C16.9835 11.327 14.7834 12.5028 13.0565 14.2294Z" fill="black" />
                  <Path d="M20.3446 20.179C20.6614 19.996 21.0273 19.9161 21.3915 19.9502C21.7558 19.9843 22.1005 20.1309 22.3777 20.3696L31.8215 28.4971C32.0802 28.7204 32.2684 29.0141 32.3633 29.3425C32.4582 29.6708 32.4557 30.0197 32.356 30.3466C32.2563 30.6735 32.0639 30.9645 31.8019 31.184C31.54 31.4036 31.22 31.5424 30.8807 31.5835L29.0877 31.7985L30.3987 34.0648C30.6326 34.4703 30.6959 34.9522 30.5746 35.4043C30.4532 35.8565 30.1573 36.242 29.7517 36.4759C29.3462 36.7098 28.8644 36.7731 28.4122 36.6518C27.96 36.5305 27.5746 36.2345 27.3407 35.829L26.0342 33.5614L24.9551 35.0048C24.7502 35.279 24.4699 35.4876 24.1484 35.6053C23.827 35.7229 23.4782 35.7445 23.1447 35.6674C22.8112 35.5903 22.5073 35.4178 22.2701 35.1709C22.0329 34.9241 21.8727 34.6135 21.809 34.2772L19.4926 22.0339C19.4249 21.6745 19.4705 21.303 19.6231 20.9707C19.7757 20.6384 20.0278 20.3617 20.3446 20.179Z" fill="black" />
                  <Path d="M17.4438 27.5043C16.692 26.7521 16.1372 25.8261 15.8287 24.8083C15.5201 23.7905 15.4673 22.7124 15.6749 21.6693C15.8825 20.6263 16.344 19.6505 17.0187 18.8284C17.6935 18.0063 18.5605 17.3632 19.543 16.9562C20.5256 16.5492 21.5933 16.3907 22.6517 16.4948C23.7101 16.5989 24.7265 16.9624 25.6109 17.5531C26.4953 18.1438 27.2204 18.9435 27.722 19.8813C28.2236 20.8191 28.4862 21.8661 28.4865 22.9296C28.4865 23.3975 28.6724 23.8461 29.0032 24.177C29.334 24.5078 29.7827 24.6936 30.2505 24.6936C30.7184 24.6936 31.1671 24.5078 31.4979 24.177C31.8287 23.8461 32.0145 23.3975 32.0145 22.9296C32.0147 21.2857 31.6094 19.6671 30.8346 18.2172C30.0597 16.7674 28.9393 15.531 27.5725 14.6176C26.2056 13.7042 24.6346 13.142 22.9986 12.9808C21.3626 12.8196 19.7121 13.0644 18.1933 13.6935C16.6745 14.3226 15.3343 15.3165 14.2914 16.5873C13.2485 17.8581 12.5352 19.3664 12.2145 20.9788C11.8938 22.5911 11.9757 24.2577 12.453 25.8308C12.9303 27.4039 13.7882 28.8351 14.9507 29.9974C15.1122 30.1707 15.307 30.3097 15.5233 30.4061C15.7397 30.5026 15.9733 30.5544 16.2102 30.5586C16.447 30.5628 16.6823 30.5192 16.9019 30.4305C17.1216 30.3418 17.3211 30.2097 17.4886 30.0422C17.6561 29.8747 17.7882 29.6752 17.8769 29.4555C17.9656 29.2359 18.0092 29.0006 18.005 28.7637C18.0008 28.5269 17.949 28.2933 17.8526 28.0769C17.7562 27.8605 17.6172 27.6658 17.4438 27.5043Z" fill="black" />
                </G>
                <Defs>
                  <ClipPath id="clip0_612_1957">
                    <Rect width="37.6322" height="37.6322" fill="white" transform="translate(0 10) rotate(-15)" />
                  </ClipPath>
                </Defs>
              </Svg>
            
          </View>
            )}
        </TouchableOpacity>
      ),
      (
        <TouchableOpacity>
          <View style={{ borderColor: 'white', borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0 }} key={0}>

            <Svg width="30" height="30" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M13.5 17.5C14.4281 17.5 15.2229 17.1576 15.8844 16.4727C16.5459 15.7879 16.8761 14.9637 16.875 14C16.875 13.0375 16.5448 12.2138 15.8844 11.529C15.2241 10.8442 14.4292 10.5012 13.5 10.5C12.5719 10.5 11.7776 10.843 11.1173 11.529C10.4569 12.215 10.1261 13.0387 10.125 14C10.125 14.9625 10.4558 15.7867 11.1173 16.4727C11.7788 17.1588 12.573 17.5012 13.5 17.5ZM13.5 35C8.97187 31.0042 5.59013 27.293 3.35475 23.8665C1.11937 20.44 0.001125 17.2678 0 14.35C0 9.975 1.35731 6.48958 4.07194 3.89375C6.78656 1.29792 9.92925 0 13.5 0C17.0719 0 20.2151 1.29792 22.9297 3.89375C25.6444 6.48958 27.0011 9.975 27 14.35C27 17.2667 25.8823 20.4388 23.6469 23.8665C21.4116 27.2942 18.0293 31.0053 13.5 35Z" fill="black" />
            </Svg>
          </View>
        </TouchableOpacity>
      ),
      (
        <TouchableOpacity>
          <View style={{ borderColor: 'white', borderWidth: 5, borderBottomWidth: 5, borderTopWidth: 5 }} key={0}>

            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M20 11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286Z" fill="black" />
            </Svg>
          </View>
        </TouchableOpacity>
      ),
      (
        <TouchableOpacity>
          <View style={{ borderColor: 'white', borderWidth: 5, borderBottomWidth: 5, borderTopWidth: 5 }} key={0}>

            <Svg width="20" height="20" viewBox="0 0 20 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Line y1="1.5" x2="20" y2="1.5" stroke="black" stroke-width="3" />
            </Svg>
          </View>
        </TouchableOpacity>
      )

    ];
    return (
      <View style={styles.farmIconsContainer}>
        {farmIcons.map((icon, index) => (
          <View key={index} style={styles.farmIconContainer}>
            <View style={styles.circularBackground} />
            {icon}
          </View>
        ))}
      </View>
    );

  };
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
        onPress={handleMapPress}
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
        {/* <Polygon
          coordinates={thepolygonCoordinates}
          fillColor="rgba(0, 200, 0, 0.3)"
          strokeColor="#FF0000" // Change to red color
          strokeWidth={1}

        /> */}
        {/* Markers */}
        {/* {thepolygonCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title={`Point ${index + 1}`}
            description={`Marker at ${coordinate.latitude}, ${coordinate.longitude}`}

            pinColor="green"
          />
        ))} */}

        {isAddPolygonMode && polygonCoordinates.length > 0 && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 200, 0, 0.3)"
            strokeColor="#FF0000"
            strokeWidth={1}
          />
      
        )}
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


      {!isAddFarmVisible && !showSearchButton && (
        <ImageBackground
          source={require('../assets/images/Rectangle13.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.selectFarmContainer}>
            <TouchableOpacity style={styles.addFarmButton} onPress={handleAddFarmPress}>
              <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: '700' }}>
                Add Another Farm
              </Text>
              <Svg style={{ marginLeft: 40 }} width="14" height="14" viewBox="0 0 14 14" fill="black" xmlns="http://www.w3.org/2000/svg">
                <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectFarmButton}>
              <Text style={{ marginHorizontal: 70, fontSize: 16, fontWeight: '700' }}>
                Select a Farm
              </Text>
              <Svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 13L7 7L0.999999 1" stroke="black" stroke-width="2" stroke-linecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}

      {isAddFarmVisible && (
        <View style={styles.instructionTextContainer}>
          <View style={styles.textBox}>
            <Text style={styles.instructionText}>
              Draw the location of your farm by selecting the corners of it on the map to continue.
            </Text>
          </View>
          <TouchableOpacity onPress={handleOKPress} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {showSearchButton && !isAddFarmVisible && (
        <View style={styles.searchContainer}>
          <CustomComponent style={styles.socialContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search Farm Location"
              placeholderTextColor={'black'}
            />
          </CustomComponent>
        </View>
      )}

      {showContinueButton && !isAddFarmVisible && (
        <View style={{ justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 20, padding: 5, bottom: 30, width: '60%' }}>
          <TouchableOpacity style={styles.input}>
            <Text style={{ marginVertical: 10, fontWeight: '600', fontSize: 16, color: 'black' }}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.farmIconsContainer, { zIndex: 101 }]}>
        {renderFarmIcons(handleAddPolygonPress)}
      </View>
    </View>
  )
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  backgroundImage: {
    position: 'absolute',
    top: '70%',
    width: '100%',
    height: '60%', // Adjust the height percentage as needed
    // resizeMode: 'cover', // or 'stretch' or 'contain'
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,

    borderRadius: 40,
    paddingHorizontal: 45,
    // flexDirection: "row",
    // alignItems: "center",
    // alignSelf: "center",
    // justifyContent: "space-between",
  },

  searchContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // width:"90%",

  },
  socialContainer: {
    position: 'absolute',
    top: 0,
    width: '80%',
    padding: 5,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: 'black',
    zIndex: 100,
  },
  circularBackground: {
    backgroundColor: 'white',
    borderRadius: 35, // Adjust the radius to match your SVG icon size
    width: 70, // Adjust the width to match your SVG icon size
    height: 70, // Adjust the height to match your SVG icon size
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  farmIconsContainer: {
    position: 'absolute',
    top: 25,
    right: 3,
    flexDirection: 'column',
    alignItems: 'flex-end',

  },

  farmIconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginVertical: 5,
    padding: 5,
    overflow: 'hidden',
  },
  selectFarmContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,

  },

  selectFarmButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  addFarmButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginHorizontal: 70,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',

  },

  instructionTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: '100%',
    width: '100%'
  },

  textBox: {
    borderWidth: 2,
    borderColor: '#3cb371',
    borderRadius: 25,
    padding: 10,
    paddingVertical: 15,
    marginTop: 100,
    backgroundColor: '#f5f5dc',
    marginBottom: 30, // Add margin for separation
  },

  instructionText: {
    fontSize: 18,
  },

  okButton: {
    backgroundColor: '#f8f8ff',
    borderRadius: 20,
    paddingVertical: 10,
    borderWidth: 1,
    marginTop: 40,
    paddingHorizontal: 30,
  },

  okButtonText: {
    fontSize: 16,
  },
})