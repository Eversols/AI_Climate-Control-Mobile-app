
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import Svg, { Path, Rect, G, Defs, ClipPath, Line } from 'react-native-svg';
import FarmSelectionModal from './components/farmSelectionModal';
import CustomComponent from './component/customComponent';
import GetLocation from 'react-native-get-location';

const HomeScreen = () => {
  const [farmStep, setFarmStep] = useState(0);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [innerPolygonCoordinates, setInnerPolygonCoordinates] = useState([]);
  const [isPolygonButtonPressed, setPolygonButtonPressed] = useState(false);
  const [innerPolygonButtonPressed, setInnerPolygonButtonPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddFarmPressed, setIsAddFarmPressed] = useState(false);
  const [screenState, setScreenState] = useState({
    isAddFarmVisible: true,
    showSearchButton: true,
    showContinueButton: false,
    isAddPolygonMode: false,
  });

  const [timer, setTimer] = useState(0);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 31.5948548,
    longitude: 74.3640665,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });


  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setTimeout(() => { setTimer(timer + 1) }, 2000)
        setCurrentLocation((pre) => ({ ...pre, latitude: location.latitude, longitude: location.longitude }))
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

  useEffect(() => {
    getCurrentLocation()
  }, [timer])


  useEffect(() => {
    setScreenState((prevState) => ({
      ...prevState,
      showSearchButton: false,
      showContinueButton: false,
    }));
  }, []);

  const handleAddFarmPress = () => {
    setFarmStep(1);
    setScreenState((prevState) => ({
      ...prevState,
      isAddFarmVisible: true,
      showSearchButton: false,
      showContinueButton: false,
    }));
  };

  const handleOKPress = () => {
    setFarmStep(0);
    setScreenState((prevState) => ({ ...prevState, showContinueButton: true }));
    setIsAddFarmPressed(true);
  };

  const handleAddPolygonPress = () => {
    setScreenState((prevState) => ({
      ...prevState,
      isAddFarmVisible: !prevState.isAddFarmVisible,
      showSearchButton: false,
      showContinueButton: isPolygonButtonPressed,
      isAddPolygonMode: !prevState.isAddPolygonMode,
    }));
    setPolygonButtonPressed(!isPolygonButtonPressed);
    setTimeout(() => { setPolygonCoordinates([]) }, 1000)
  };


  const handleMapPress = (event) => {
    if (screenState.isAddPolygonMode) {
      if (innerPolygonButtonPressed) {
        const newCoordinate = {
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
        };
        setInnerPolygonCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);

      } else {
        const newCoordinate = {
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
        };
        setPolygonCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinate]);

      }
    }
  };


  const renderFarmIcons = () => {
    const farmIcons = [
      (
        <>

          {innerPolygonButtonPressed != true && isAddFarmPressed != false && (
            <View style={styles.farmIconContainer}>
              < TouchableOpacity
                onPress={handleAddPolygonPress}
              >

                {isPolygonButtonPressed ? (
                  <View style={{ borderWidth: 10, borderRadius: 30, borderColor: '#79B66E', backgroundColor: "#79B66E" }}
                    key={0} >
                    <Svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <G clip-path="url(#clip0_612_1957)">
                        <Path d="M13.0565 14.2294C10.7413 16.5451 9.44061 19.6855 9.44061 22.9601C9.44061 26.2346 10.7413 29.3751 13.0565 31.6907C13.378 32.0233 13.556 32.4688 13.5522 32.9313C13.5484 33.3938 13.3631 33.8364 13.0362 34.1636C12.7093 34.4908 12.267 34.6765 11.8045 34.6807C11.3419 34.685 10.8963 34.5074 10.5634 34.1862C8.71673 32.3403 7.35385 30.0674 6.59549 27.5689C5.83714 25.0704 5.70673 22.4234 6.21582 19.8624C6.72492 17.3015 7.85779 14.9056 9.51408 12.8871C11.1704 10.8686 13.2989 9.28977 15.7112 8.29048C18.1235 7.29119 20.745 6.9023 23.3435 7.15826C25.942 7.41421 28.4372 8.30712 30.6082 9.75786C32.7791 11.2086 34.5587 13.1724 35.7894 15.4753C37.02 17.7782 37.6636 20.349 37.6633 22.9601C37.6633 23.4279 37.4774 23.8766 37.1466 24.2074C36.8158 24.5382 36.3671 24.7241 35.8993 24.7241C35.4314 24.7241 34.9827 24.5382 34.6519 24.2074C34.3211 23.8766 34.1353 23.4279 34.1353 22.9601C34.135 20.5181 33.4106 18.131 32.0538 16.1006C30.6969 14.0703 28.7685 12.4878 26.5124 11.5533C24.2563 10.6189 21.7737 10.3743 19.3786 10.8507C16.9835 11.327 14.7834 12.5028 13.0565 14.2294Z" fill="#fff" />
                        <Path d="M20.3446 20.179C20.6614 19.996 21.0273 19.9161 21.3915 19.9502C21.7558 19.9843 22.1005 20.1309 22.3777 20.3696L31.8215 28.4971C32.0802 28.7204 32.2684 29.0141 32.3633 29.3425C32.4582 29.6708 32.4557 30.0197 32.356 30.3466C32.2563 30.6735 32.0639 30.9645 31.8019 31.184C31.54 31.4036 31.22 31.5424 30.8807 31.5835L29.0877 31.7985L30.3987 34.0648C30.6326 34.4703 30.6959 34.9522 30.5746 35.4043C30.4532 35.8565 30.1573 36.242 29.7517 36.4759C29.3462 36.7098 28.8644 36.7731 28.4122 36.6518C27.96 36.5305 27.5746 36.2345 27.3407 35.829L26.0342 33.5614L24.9551 35.0048C24.7502 35.279 24.4699 35.4876 24.1484 35.6053C23.827 35.7229 23.4782 35.7445 23.1447 35.6674C22.8112 35.5903 22.5073 35.4178 22.2701 35.1709C22.0329 34.9241 21.8727 34.6135 21.809 34.2772L19.4926 22.0339C19.4249 21.6745 19.4705 21.303 19.6231 20.9707C19.7757 20.6384 20.0278 20.3617 20.3446 20.179Z" fill="#fff" />
                        <Path d="M17.4438 27.5043C16.692 26.7521 16.1372 25.8261 15.8287 24.8083C15.5201 23.7905 15.4673 22.7124 15.6749 21.6693C15.8825 20.6263 16.344 19.6505 17.0187 18.8284C17.6935 18.0063 18.5605 17.3632 19.543 16.9562C20.5256 16.5492 21.5933 16.3907 22.6517 16.4948C23.7101 16.5989 24.7265 16.9624 25.6109 17.5531C26.4953 18.1438 27.2204 18.9435 27.722 19.8813C28.2236 20.8191 28.4862 21.8661 28.4865 22.9296C28.4865 23.3975 28.6724 23.8461 29.0032 24.177C29.334 24.5078 29.7827 24.6936 30.2505 24.6936C30.7184 24.6936 31.1671 24.5078 31.4979 24.177C31.8287 23.8461 32.0145 23.3975 32.0145 22.9296C32.0147 21.2857 31.6094 19.6671 30.8346 18.2172C30.0597 16.7674 28.9393 15.531 27.5725 14.6176C26.2056 13.7042 24.6346 13.142 22.9986 12.9808C21.3626 12.8196 19.7121 13.0644 18.1933 13.6935C16.6745 14.3226 15.3343 15.3165 14.2914 16.5873C13.2485 17.8581 12.5352 19.3664 12.2145 20.9788C11.8938 22.5911 11.9757 24.2577 12.453 25.8308C12.9303 27.4039 13.7882 28.8351 14.9507 29.9974C15.1122 30.1707 15.307 30.3097 15.5233 30.4061C15.7397 30.5026 15.9733 30.5544 16.2102 30.5586C16.447 30.5628 16.6823 30.5192 16.9019 30.4305C17.1216 30.3418 17.3211 30.2097 17.4886 30.0422C17.6561 29.8747 17.7882 29.6752 17.8769 29.4555C17.9656 29.2359 18.0092 29.0006 18.005 28.7637C18.0008 28.5269 17.949 28.2933 17.8526 28.0769C17.7562 27.8605 17.6172 27.6658 17.4438 27.5043Z" fill="#fff" />
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
                    style={{ borderWidth: 2, borderRadius: 20, borderColor: 'transparent', }}
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
              </TouchableOpacity >
            </View>
          )}
          {
            innerPolygonButtonPressed &&
            <View style={styles.farmIconContainer}>
              <TouchableOpacity
                onPress={handleAddPolygonPress}
              >

                {innerPolygonButtonPressed ? (
                  <View style={styles.farmIconContainer}>
                    <View
                      style={{ padding: 3, marginTop: -5, borderRadius: 30, backgroundColor: "#79B66E", borderColor: '#79B66E' }}
                      key={0}
                    >
                      <Svg width="38" height="38" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M29.9536 1.02644C29.9393 0.771598 29.8357 0.531089 29.6624 0.350578C29.4891 0.170067 29.2581 0.0621238 29.0135 0.0472411C22.5424 -0.343399 17.3466 1.70616 15.1137 5.54484C13.6385 8.0827 13.641 11.1648 15.0937 14.1051C14.2668 15.1303 13.6625 16.3296 13.3222 17.6208L11.2881 15.4944C12.2657 13.3681 12.2282 11.1518 11.1631 9.31061C9.51279 6.47326 5.70342 4.95237 0.9739 5.24145C0.729217 5.25633 0.498299 5.36427 0.324987 5.54478C0.151675 5.72529 0.0480362 5.9658 0.0337471 6.22065C-0.245048 11.1466 1.21644 15.1142 3.94063 16.833C4.83961 17.4051 5.87264 17.7079 6.92612 17.7081C7.94866 17.6949 8.95529 17.4426 9.8716 16.9698L12.9971 20.2251V23.9583C12.9971 24.2346 13.1025 24.4995 13.29 24.6949C13.4776 24.8902 13.732 25 13.9973 25C14.2625 25 14.5169 24.8902 14.7045 24.6949C14.8921 24.4995 14.9974 24.2346 14.9974 23.9583V20.1183C14.993 18.4611 15.5344 16.8524 16.5314 15.5608C17.8178 16.261 19.2445 16.6358 20.6959 16.6546C22.0991 16.6593 23.4762 16.2601 24.6753 15.5009C28.3609 13.1779 30.3337 7.76628 29.9536 1.02644ZM4.97205 15.0517C3.05424 13.842 1.96906 10.9786 1.99532 7.291C5.53589 7.25975 8.28509 8.39391 9.44653 10.3914C10.0529 11.4331 10.1516 12.648 9.75408 13.8993L6.70233 10.7208C6.51324 10.5337 6.26145 10.4309 6.00064 10.4344C5.73984 10.4379 5.49066 10.5473 5.30623 10.7394C5.12179 10.9315 5.01671 11.1911 5.01337 11.4627C5.01003 11.7343 5.1087 11.9966 5.28835 12.1935L8.3401 15.372C7.13865 15.7861 5.97346 15.6832 4.97205 15.0517ZM23.6388 13.7209C21.9636 14.777 19.9945 14.8577 17.9942 13.9814L24.7065 6.98891C24.8862 6.79196 24.9848 6.52971 24.9815 6.25807C24.9782 5.98644 24.8731 5.7269 24.6886 5.53481C24.5042 5.34272 24.255 5.23327 23.9942 5.22979C23.7334 5.22631 23.4816 5.32909 23.2925 5.5162L16.5789 12.4995C15.7338 10.4161 15.8101 8.36396 16.829 6.6204C18.5718 3.6255 22.7049 1.95617 27.997 2.08508C28.1171 7.5957 26.5168 11.9058 23.6388 13.7209Z" fill="#fff" />
                      </Svg>
                    </View>
                  </View>
                ) :

                  (
                    <View style={styles.farmIconContainer}>
                      <View style={{ borderWidth: 2, borderRadius: 20, borderColor: 'transparent' }}
                        key={0}
                      >
                        <Svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M29.9536 1.02644C29.9393 0.771598 29.8357 0.531089 29.6624 0.350578C29.4891 0.170067 29.2581 0.0621238 29.0135 0.0472411C22.5424 -0.343399 17.3466 1.70616 15.1137 5.54484C13.6385 8.0827 13.641 11.1648 15.0937 14.1051C14.2668 15.1303 13.6625 16.3296 13.3222 17.6208L11.2881 15.4944C12.2657 13.3681 12.2282 11.1518 11.1631 9.31061C9.51279 6.47326 5.70342 4.95237 0.9739 5.24145C0.729217 5.25633 0.498299 5.36427 0.324987 5.54478C0.151675 5.72529 0.0480362 5.9658 0.0337471 6.22065C-0.245048 11.1466 1.21644 15.1142 3.94063 16.833C4.83961 17.4051 5.87264 17.7079 6.92612 17.7081C7.94866 17.6949 8.95529 17.4426 9.8716 16.9698L12.9971 20.2251V23.9583C12.9971 24.2346 13.1025 24.4995 13.29 24.6949C13.4776 24.8902 13.732 25 13.9973 25C14.2625 25 14.5169 24.8902 14.7045 24.6949C14.8921 24.4995 14.9974 24.2346 14.9974 23.9583V20.1183C14.993 18.4611 15.5344 16.8524 16.5314 15.5608C17.8178 16.261 19.2445 16.6358 20.6959 16.6546C22.0991 16.6593 23.4762 16.2601 24.6753 15.5009C28.3609 13.1779 30.3337 7.76628 29.9536 1.02644ZM4.97205 15.0517C3.05424 13.842 1.96906 10.9786 1.99532 7.291C5.53589 7.25975 8.28509 8.39391 9.44653 10.3914C10.0529 11.4331 10.1516 12.648 9.75408 13.8993L6.70233 10.7208C6.51324 10.5337 6.26145 10.4309 6.00064 10.4344C5.73984 10.4379 5.49066 10.5473 5.30623 10.7394C5.12179 10.9315 5.01671 11.1911 5.01337 11.4627C5.01003 11.7343 5.1087 11.9966 5.28835 12.1935L8.3401 15.372C7.13865 15.7861 5.97346 15.6832 4.97205 15.0517ZM23.6388 13.7209C21.9636 14.777 19.9945 14.8577 17.9942 13.9814L24.7065 6.98891C24.8862 6.79196 24.9848 6.52971 24.9815 6.25807C24.9782 5.98644 24.8731 5.7269 24.6886 5.53481C24.5042 5.34272 24.255 5.23327 23.9942 5.22979C23.7334 5.22631 23.4816 5.32909 23.2925 5.5162L16.5789 12.4995C15.7338 10.4161 15.8101 8.36396 16.829 6.6204C18.5718 3.6255 22.7049 1.95617 27.997 2.08508C28.1171 7.5957 26.5168 11.9058 23.6388 13.7209Z" fill="#000" />
                        </Svg>
                      </View>
                    </View>
                  )}
              </TouchableOpacity>
            </View>
          }
        </>
      ),
      (
        <View style={styles.farmIconContainer}>
          <TouchableOpacity>
            <View style={{ borderColor: 'white', borderWidth: 0, borderBottomWidth: 0, borderTopWidth: 0 }} key={0}>

              <Svg width="30" height="30" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M13.5 17.5C14.4281 17.5 15.2229 17.1576 15.8844 16.4727C16.5459 15.7879 16.8761 14.9637 16.875 14C16.875 13.0375 16.5448 12.2138 15.8844 11.529C15.2241 10.8442 14.4292 10.5012 13.5 10.5C12.5719 10.5 11.7776 10.843 11.1173 11.529C10.4569 12.215 10.1261 13.0387 10.125 14C10.125 14.9625 10.4558 15.7867 11.1173 16.4727C11.7788 17.1588 12.573 17.5012 13.5 17.5ZM13.5 35C8.97187 31.0042 5.59013 27.293 3.35475 23.8665C1.11937 20.44 0.001125 17.2678 0 14.35C0 9.975 1.35731 6.48958 4.07194 3.89375C6.78656 1.29792 9.92925 0 13.5 0C17.0719 0 20.2151 1.29792 22.9297 3.89375C25.6444 6.48958 27.0011 9.975 27 14.35C27 17.2667 25.8823 20.4388 23.6469 23.8665C21.4116 27.2942 18.0293 31.0053 13.5 35Z" fill="black" />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      ),
      (
        <View style={styles.farmIconContainer}>
          <TouchableOpacity>
            <View style={{ borderColor: 'white', borderWidth: 5, borderBottomWidth: 5, borderTopWidth: 5 }} key={0}>

              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M20 11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286Z" fill="black" />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      ),
      (
        <View style={styles.farmIconContainer}>
          <TouchableOpacity>
            <View style={{ borderColor: 'white', borderWidth: 5, borderBottomWidth: 5, borderTopWidth: 5 }} key={0}>

              <Svg width="20" height="20" viewBox="0 0 20 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Line y1="1.5" x2="20" y2="1.5" stroke="black" stroke-width="3" />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      )

    ];
    return (
      <View style={styles.farmIconsContainer}>
        {farmIcons.map((icon, index) => (
          <View key={index}>
            {icon}
          </View>
        ))}
      </View>
    );

  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={{
            latitude: 31.5948548,
            longitude: 74.3640665,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        {polygonCoordinates.length > 0 && (
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
        {innerPolygonCoordinates.length > 0 && (
          <Polygon
            coordinates={innerPolygonCoordinates}
            fillColor="rgba(255, 230, 6, 1)"
            strokeColor="#FF0000"
            strokeWidth={1}
          />

        )}
        {innerPolygonCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title={`Point ${index + 1}`}
            description={`Marker at ${coordinate.latitude}, ${coordinate.longitude}`}
            pinColor="#FFE606"
          />
        ))}
      </MapView>
      {!screenState.isAddPolygonMode && isAddFarmPressed != true && (
        <ImageBackground
          source={require('../assets/images/Rectangle13.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.selectFarmContainer}>
            <TouchableOpacity style={styles.addFarmButton} onPress={handleAddFarmPress}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '700', marginHorizontal: '30%' }}>
                  Add A Farm
                </Text>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Svg width="14" height="14" viewBox="0 0 14 14" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" />
                  </Svg>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectFarmButton}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '700', marginHorizontal: '30%' }}>
                  Select a Farm
                </Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1 13L7 7L0.999999 1" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </Svg>
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      )}
      {farmStep === 1 && (
        <View style={styles.instructionTextContainer}>
          <View style={styles.textBox}>
            <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, textAlign: 'center', color: '#000000' }}>
              Draw the location of your farm by selecting the corners of it on the map to continue.
            </Text>
          </View>
          <View style={{ top: 180 }}>
            <TouchableOpacity onPress={handleOKPress} style={styles.okButton}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#000000' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screenState.isAddPolygonMode && innerPolygonButtonPressed != true && (
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
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <FarmSelectionModal onClose={() => {
          setIsModalVisible(false);
          setInnerPolygonButtonPressed(true)
          setPolygonButtonPressed(false)
        }} />
      </Modal>

      {screenState.isAddPolygonMode && (
        <View style={{
          position: 'absolute', bottom: 20, left: '20%', alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 40,
          padding: 5,
          width: '60%',
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 19,
            },
            android: {
              elevation: 4,
            },
          })
        }}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            disabled={!(polygonCoordinates.length > 0)}
          >
            <Text style={{
              marginVertical: 10,
              fontWeight: '600',
              fontSize: 18,
              color: (polygonCoordinates.length > 2) ? '#000000' : 'gray',
            }}>Continue</Text>
          </TouchableOpacity>
        </View>

      )}
      <View style={[styles.farmIconsContainer, { zIndex: 101 }]}>
        {renderFarmIcons()}
      </View>
      {!innerPolygonButtonPressed && !screenState.isAddPolygonMode && farmStep === 0 && isAddFarmPressed != false && (

        <View style={styles.popupContainer}>
          <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
          </View>
          <Text style={styles.messageText}>Use This Button To Tag The Area Of The Farm</Text>

        </View>)}
      {innerPolygonButtonPressed && screenState.isAddPolygonMode && (

        <View style={styles.popupContainer1}>
          <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
          </View>
          <Text style={styles.messageText}>Use This Button To Tag Crop Area In The Field</Text>

        </View>)}
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
    height: '60%',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    // height: 40,
    borderRadius: 40,
    paddingHorizontal: 45,
    lineHeight: 24,
    color: '#000000',
  },

  searchContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  socialContainer: {
    position: 'absolute',
    top: 0,
    width: '75%',
    margin: 10,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 19,
      },
      android: {
        elevation: 4,
      },
    }),

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
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 19,
      },
      android: {
        elevation: 4,
      },
    }),
    borderRadius: 50,
    marginVertical: 5,
    height: 50, width: 50,
    alignItems: "center",
    justifyContent: 'center',
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
    borderRadius: 15,
    marginHorizontal: 40,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',

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
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '100%',
    width: '100%',
    // lineHeight:6,
  },

  textBox: {
    borderWidth: 2,
    borderColor: '#399023',
    borderRadius: 29,
    padding: 10,
    paddingVertical: 25,
    marginTop: 100,
    backgroundColor: '#f5f5dc',
    marginBottom: 30,
  },


  okButton: {
    backgroundColor: '#f8f8ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 19,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  popupContainer: {
    backgroundColor: '#FFFFFFCC',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1,
    maxWidth: 220,
    bottom: 520,
    // left:5,
  },
  popupContainer1: {
    backgroundColor: '#FFFFFFCC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1,
    maxWidth: 200,
    position: 'absolute',
    top: 55,
    right: 65,
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    right: -15,
    transform: [{ translateX: -10 }], // Adjust this value to align the arrow with the center
  },

  arrow: {

    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    transform: [{ rotate: '310deg' }], // Rotate the arrow to point in the right direction
  },

  messageText: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 24,

  },
})