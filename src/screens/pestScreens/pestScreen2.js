import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import {
  Svg,
  Path,
  Rect,
  Mask,
  G,
  Defs,
  ClipPath,
  Circle,
} from 'react-native-svg';

// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import {setPestImage} from '../../redux/slices/pesticidesSlice';
import {useDispatch, useSelector} from 'react-redux';
import {post} from '../../utils/axios';
import axios from 'axios';

const PestScreen2 = ({navigation, route}) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80);
  const [camerOn, setCamerOn] = useState(true);
  const {farm} = route.params;

  const camera = useRef(null); // Create a ref
  const [currentImage, setImage] = useState();

  const {pestImage} = useSelector(state => state.pest);

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back || devices[0];
  const format = useCameraFormat(device, [
    {videoResolution: 'max'},
    {photoResolution: 'max'},
  ]);
  const dispatch = useDispatch();
  const takePhoto = async () => {
    try {
      const path = await camera.current.takePhoto();
      dispatch(setPestImage({...path, path: `file://${path.path}`}));
      setCamerOn(false);
    } catch (err) {
      console.log('camera error', err);
    }
  };

  useEffect(() => {
    console.log('image for farm to be processed by AI', farm);
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    // const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log(newCameraPermission);
  };
  console.log('kkkkkkkkkkkkkkkkkkkkk', pestImage);
  if (device == null)
    return (
      <ActivityIndicator
        style={{marginTop: 300, alignSelf: 'center'}}
        color={'gray'}
        size={100}
      />
    );

  const handleSubmit = async () => {
    try {
      const body = {
        detection_list: [pestImage?.path],
      };
      const response = await axios.post(
        'https://02egvwurf5.execute-api.eu-north-1.amazonaws.com/test_sagemaker/detect/pest/pest',
        {
          ...body,
        },
      );
      if (response?.data) {
        navigation.navigate('pestScreen4', {insectData: response.data[0]});
      }
      console.log(
        'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        response.data,
      );
    } catch (error) {}
  };

  return (
    <>
      {camerOn ? (
        <>
          <Camera
            // {...props}
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            format={format}
            // fps={fps}
            photo={true}
          />
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
              height: 170,
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 40,
                alignItems: 'center',
                top: 50,
              }}>
              <Svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Circle cx="24" cy="24" r="23.5" stroke="gray" />
                <Path
                  d="M14.5798 31.0098L14.5598 31.0298C14.2898 30.4398 14.1198 29.7698 14.0498 29.0298C14.1198 29.7598 14.3098 30.4198 14.5798 31.0098Z"
                  fill="#6b9d5f"
                />
                <Path
                  d="M21.0001 22.3801C22.3146 22.3801 23.3801 21.3146 23.3801 20.0001C23.3801 18.6857 22.3146 17.6201 21.0001 17.6201C19.6857 17.6201 18.6201 18.6857 18.6201 20.0001C18.6201 21.3146 19.6857 22.3801 21.0001 22.3801Z"
                  fill="#6b9d5f"
                />
                <Path
                  d="M28.19 14H19.81C16.17 14 14 16.17 14 19.81V28.19C14 29.28 14.19 30.23 14.56 31.03C15.42 32.93 17.26 34 19.81 34H28.19C31.83 34 34 31.83 34 28.19V25.9V19.81C34 16.17 31.83 14 28.19 14ZM32.37 24.5C31.59 23.83 30.33 23.83 29.55 24.5L25.39 28.07C24.61 28.74 23.35 28.74 22.57 28.07L22.23 27.79C21.52 27.17 20.39 27.11 19.59 27.65L15.85 30.16C15.63 29.6 15.5 28.95 15.5 28.19V19.81C15.5 16.99 16.99 15.5 19.81 15.5H28.19C31.01 15.5 32.5 16.99 32.5 19.81V24.61L32.37 24.5Z"
                  fill="#6b9d5f"
                />
              </Svg>
              <TouchableOpacity onPress={takePhoto}>
                <View>
                  <Svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="36" cy="36" r="36" fill="#6b9d5f" />
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
                <Circle cx="24" cy="24" r="23.5" stroke="gray" />
                <Path
                  d="M29.91 22.7199H26.82V15.5199C26.82 13.8399 25.91 13.4999 24.8 14.7599L24 15.6699L17.23 23.3699C16.3 24.4199 16.69 25.2799 18.09 25.2799H21.18V32.4799C21.18 34.1599 22.09 34.4999 23.2 33.2399L24 32.3299L30.77 24.6299C31.7 23.5799 31.31 22.7199 29.91 22.7199Z"
                  fill="#6b9d5f"
                />
              </Svg>
            </View>
          </View>
        </>
      ) : (
        <ImageBackground
          source={require('../../../asssets/dashboard-bg.jpg')} // Replace with the path to your image
          style={styles.backgroundImage}
          blurRadius={32}>
          <View
            style={{
              backgroundColor: '#ffffff33',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <TouchableOpacity
            style={{padding: 20, margin: 10}}
            onPress={() => navigation.goBack()}>
            <Svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z"
                fill="black"
              />
            </Svg>
          </TouchableOpacity>

          <View style={{flexDirection: "row-reverse", paddingHorizontal: 15}} >
            <Text
              style={{
                backgroundColor: '#ffffffaa',
                color: '#000000',
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderColor: '#ffffff',
                borderWidth: 1,
              }}>
              {farm}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              justifyContent: 'center',
            }}>
            <Image
              style={{width: '85%', height: 350, resizeMode: 'contain'}}
              source={
                pestImage
                  ? {uri: `${pestImage?.path}`}
                  : require('../../../asssets/minibutter.png')
              }
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setCamerOn(true);
              // navigation.navigate("pestScreen3")
            }}
            style={[styles.btn, {width: '70%'}]}>
            <Text style={{fontWeight: '700', fontSize: 18, color: '#000'}}>
              {pestImage ? 'Retake' : 'Take'} Image
            </Text>
          </TouchableOpacity>
          {pestImage && (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, {width: '70%'}]}>
              <Text style={{fontWeight: '700', fontSize: 18, color: '#000'}}>
                Send
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: '90%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default PestScreen2;
