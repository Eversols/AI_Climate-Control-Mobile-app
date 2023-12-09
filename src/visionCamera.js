import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Svg, { Circle, Path } from 'react-native-svg';

const VisionCameraScreen = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.length > 0 ? devices[0] : null;
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log('Devices:', devices);
      console.log(`Camera Permission status: ${permission}`);
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  function renderCamera() {
    if (device == null) {
      return (
        <View style={{ flex: 1 }}>
          <Text>Camera not available</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} device={device} isActive={true} enableZoomGesture />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={() => capturePhoto()}>
              {/* <View>
                <Svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Circle cx="36" cy="36" r="36" fill="#F37421" />
                  <Path
                    d="M43.9999 27.9998C43.1866 27.9998 42.4399 27.5332 42.0666 26.8132L41.1066 24.8798C40.4932 23.6665 38.8932 22.6665 37.5332 22.6665H34.4799C33.1066 22.6665 31.5066 23.6665 30.8932 24.8798L29.9332 26.8132C29.5599 27.5332 28.8132 27.9998 27.9999 27.9998C25.1066 27.9998 22.8132 30.4398 22.9999 33.3198L23.6932 44.3332C23.8532 47.0798 25.3332 49.3332 29.0132 49.3332H42.9866C46.6666 49.3332 48.1332 47.0798 48.3066 44.3332L48.9999 33.3198C49.1866 30.4398 46.8932 27.9998 43.9999 27.9998ZM33.9999 29.6665H37.9999C38.5466 29.6665 38.9999 30.1198 38.9999 30.6665C38.9999 31.2132 38.5466 31.6665 37.9999 31.6665H33.9999C33.4532 31.6665 32.9999 31.2132 32.9999 30.6665C32.9999 30.1198 33.4532 29.6665 33.9999 29.6665ZM35.9999 44.1598C33.5199 44.1598 31.4932 42.1465 31.4932 39.6532C31.4932 37.1598 33.5066 35.1465 35.9999 35.1465C38.4932 35.1465 40.5066 37.1598 40.5066 39.6532C40.5066 42.1465 38.4799 44.1598 35.9999 44.1598Z"
                    fill="white"
                  />
                </Svg>
              </View> */}
              <View
          style={{
            backgroundColor: 'white',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            zIndex: 40,
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            width: 370,
            height: 110,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 40,
              alignItems: 'center',
              top: 20,
            }}>
            <Svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Circle cx="24" cy="24" r="23.5" stroke="#E3E7F7" />
              <Path
                d="M14.5798 31.0098L14.5598 31.0298C14.2898 30.4398 14.1198 29.7698 14.0498 29.0298C14.1198 29.7598 14.3098 30.4198 14.5798 31.0098Z"
                fill="#F37421"
              />
              <Path
                d="M21.0001 22.3801C22.3146 22.3801 23.3801 21.3146 23.3801 20.0001C23.3801 18.6857 22.3146 17.6201 21.0001 17.6201C19.6857 17.6201 18.6201 18.6857 18.6201 20.0001C18.6201 21.3146 19.6857 22.3801 21.0001 22.3801Z"
                fill="#F37421"
              />
              <Path
                d="M28.19 14H19.81C16.17 14 14 16.17 14 19.81V28.19C14 29.28 14.19 30.23 14.56 31.03C15.42 32.93 17.26 34 19.81 34H28.19C31.83 34 34 31.83 34 28.19V25.9V19.81C34 16.17 31.83 14 28.19 14ZM32.37 24.5C31.59 23.83 30.33 23.83 29.55 24.5L25.39 28.07C24.61 28.74 23.35 28.74 22.57 28.07L22.23 27.79C21.52 27.17 20.39 27.11 19.59 27.65L15.85 30.16C15.63 29.6 15.5 28.95 15.5 28.19V19.81C15.5 16.99 16.99 15.5 19.81 15.5H28.19C31.01 15.5 32.5 16.99 32.5 19.81V24.61L32.37 24.5Z"
                fill="#F37421"
              />
            </Svg>
            <TouchableOpacity
              onPress={capturePhoto}
            >
              <View>
                <Svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Circle cx="36" cy="36" r="36" fill="#F37421" />
                  <Path
                    d="M43.9999 27.9998C43.1866 27.9998 42.4399 27.5332 42.0666 26.8132L41.1066 24.8798C40.4932 23.6665 38.8932 22.6665 37.5332 22.6665H34.4799C33.1066 22.6665 31.5066 23.6665 30.8932 24.8798L29.9332 26.8132C29.5599 27.5332 28.8132 27.9998 27.9999 27.9998C25.1066 27.9998 22.8132 30.4398 22.9999 33.3198L23.6932 44.3332C23.8532 47.0798 25.3332 49.3332 29.0132 49.3332H42.9866C46.6666 49.3332 48.1332 47.0798 48.3066 44.3332L48.9999 33.3198C49.1866 30.4398 46.8932 27.9998 43.9999 27.9998ZM33.9999 29.6665H37.9999C38.5466 29.6665 38.9999 30.1198 38.9999 30.6665C38.9999 31.2132 38.5466 31.6665 37.9999 31.6665H33.9999C33.4532 31.6665 32.9999 31.2132 32.9999 30.6665C32.9999 30.1198 33.4532 29.6665 33.9999 29.6665ZM35.9999 44.1598C33.5199 44.1598 31.4932 42.1465 31.4932 39.6532C31.4932 37.1598 33.5066 35.1465 35.9999 35.1465C38.4932 35.1465 40.5066 37.1598 40.5066 39.6532C40.5066 42.1465 38.4799 44.1598 35.9999 44.1598Z"
                    fill="white"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
            <Svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Circle cx="24" cy="24" r="23.5" stroke="#E3E7F7" />
              <Path
                d="M29.91 22.7199H26.82V15.5199C26.82 13.8399 25.91 13.4999 24.8 14.7599L24 15.6699L17.23 23.3699C16.3 24.4199 16.69 25.2799 18.09 25.2799H21.18V32.4799C21.18 34.1599 22.09 34.4999 23.2 33.2399L24 32.3299L30.77 24.6299C31.7 23.5799 31.31 22.7199 29.91 22.7199Z"
                fill="#F37421"
              />
            </Svg>
          </View>
        </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  return <View style={styles.container}>{renderCamera()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center', // Adjust the alignment as needed
    // marginTop: 20,
  },
  camButton: {
    // padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VisionCameraScreen;
