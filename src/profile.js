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
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import {Defs, G, Filter, Path, Rect, Svg} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth, setUser} from './redux/slices/authSlice';
import {storeToken} from './utils/StorageToken';

const Profile = ({navigation}) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80);
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setAuth(false));
    dispatch(setUser(null));
    storeToken(null);
  };
  const navigateToUserProfile = () => {
    navigation.navigate('UserProfileView', {user});
  };

  console.log(
    'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU',
    user,
  );
  return (
    <ImageBackground
      blurRadius={32}
      source={require('../asssets/dashboard-bg.jpg')} // Replace with the path to your image
      style={styles.backgroundImage}>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{padding: 20, marginTop: 10, marginLeft: 10}}
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
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#000',
            paddingTop: 20,
            marginLeft: -30,
          }}>
          Profile
        </Text>
        <Text></Text>
      </View>
      <View
        style={{flexDirection: 'row', marginTop: 40, justifyContent: 'center'}}>
        <View style={styles.circularBorder}>
          <Image
            style={{
              width: 100,
              borderRadius: 200,
              height: 100,
              resizeMode: 'contain',
            }}
            source={
              user?.avatar
                ? {uri: user.avatar}
                : require('../asssets/profilePic.png')
            }
          />
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
            fontWeight: '600',
          }}>
          {user?.user_name.toUpperCase() || 'WelCome'}{' '}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 14,
            fontWeight: '400',
            marginTop: 10,
          }}>
          Reference site about Lorem Ipsum
        </Text>
      </View>

      <TouchableOpacity style={[styles.btn]} onPress={navigateToUserProfile}>
        <Svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M9.5 12C12.5376 12 15 9.53757 15 6.5C15 3.46243 12.5376 1 9.5 1C6.46243 1 4 3.46243 4 6.5C4 9.53757 6.46243 12 9.5 12Z"
            stroke="#000000"
            stroke-opacity="0.47"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M19 21C19 18.6131 18.0518 16.3239 16.364 14.636C14.6761 12.9482 12.3869 12 10 12C7.61305 12 5.32387 12.9482 3.63604 14.636C1.94821 16.3239 1 18.6131 1 21"
            stroke="gray"
            stroke-opacity="0.47"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>

        <Text
          style={{
            fontWeight: '400',
            marginLeft: 20,
            fontSize: 15,
            color: '#000000',
          }}>
          View Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('dashboard')}
        style={[styles.btn]}>
        <Svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.04615 0H2.96154C2.574 0 2.24062 1.26077e-08 1.94615 0.0693793C1.49031 0.178296 1.07352 0.411278 0.741959 0.742509C0.410403 1.07374 0.177028 1.49029 0.0676922 1.946C-6.30434e-08 2.24044 0 2.57211 0 2.96131V7.19175C0 7.57926 1.26087e-08 7.91262 0.0693846 8.20706C0.17831 8.66287 0.411309 9.07963 0.742567 9.41116C1.07382 9.74269 1.49041 9.97605 1.94615 10.0854C2.24062 10.1531 2.57231 10.1531 2.96154 10.1531H7.19231C7.57985 10.1531 7.91323 10.1531 8.20769 10.0837C8.66354 9.97477 9.08033 9.74179 9.41189 9.41055C9.74344 9.07932 9.97682 8.66277 10.0862 8.20706C10.1538 7.91262 10.1538 7.58096 10.1538 7.19175V2.96131C10.1538 2.5738 10.1538 2.24044 10.0845 1.946C9.97554 1.49019 9.74254 1.07343 9.41128 0.741902C9.08002 0.410372 8.66344 0.177015 8.20769 0.067687C7.91323 -6.30385e-08 7.58154 0 7.19231 0H3.04615ZM2.34046 1.71587C2.41323 1.69895 2.52662 1.69218 3.04615 1.69218H7.10769C7.62892 1.69218 7.74062 1.69725 7.81339 1.71587C7.9654 1.75222 8.10438 1.82996 8.21491 1.94048C8.32543 2.051 8.40318 2.18997 8.43954 2.34197C8.45646 2.41305 8.46154 2.52473 8.46154 3.04592V7.10714C8.46154 7.62834 8.45646 7.74002 8.43785 7.81278C8.40149 7.96479 8.32374 8.10376 8.21322 8.21428C8.10269 8.32479 7.96371 8.40254 7.81169 8.43889C7.74231 8.45412 7.63062 8.46089 7.10769 8.46089H3.04615C2.52492 8.46089 2.41323 8.45581 2.34046 8.4372C2.18844 8.40085 2.04946 8.3231 1.93894 8.21258C1.82841 8.10207 1.75066 7.9631 1.71431 7.81109C1.69908 7.74171 1.69231 7.63003 1.69231 7.10714V3.04592C1.69231 2.52473 1.69738 2.41304 1.716 2.34028C1.75235 2.18827 1.8301 2.0493 1.94063 1.93879C2.05115 1.82827 2.19013 1.75053 2.34215 1.71418L2.34046 1.71587ZM14.8923 0H14.8077C14.4202 0 14.0868 1.26077e-08 13.7923 0.0693793C13.3365 0.178296 12.9197 0.411278 12.5881 0.742509C12.2566 1.07374 12.0232 1.49029 11.9138 1.946C11.8462 2.24044 11.8462 2.57211 11.8462 2.96131V7.19175C11.8462 7.57926 11.8462 7.91262 11.9155 8.20706C12.0245 8.66287 12.2575 9.07963 12.5887 9.41116C12.92 9.74269 13.3366 9.97605 13.7923 10.0854C14.0868 10.1531 14.4185 10.1531 14.8077 10.1531H19.0385C19.426 10.1531 19.7594 10.1531 20.0538 10.0837C20.5097 9.97477 20.9265 9.74179 21.258 9.41055C21.5896 9.07932 21.823 8.66277 21.9323 8.20706C22 7.91262 22 7.58096 22 7.19175V2.96131C22 2.5738 22 2.24044 21.9306 1.946C21.8217 1.49019 21.5887 1.07343 21.2574 0.741902C20.9262 0.410372 20.5096 0.177015 20.0538 0.067687C19.7594 -6.30385e-08 19.4277 0 19.0385 0H14.8923ZM14.1866 1.71587C14.2594 1.69895 14.3728 1.69218 14.8923 1.69218H18.9538C19.4751 1.69218 19.5868 1.69725 19.6595 1.71587C19.8116 1.75222 19.9505 1.82996 20.0611 1.94048C20.1716 2.051 20.2493 2.18997 20.2857 2.34197C20.3026 2.41305 20.3077 2.52473 20.3077 3.04592V7.10714C20.3077 7.62834 20.3009 7.74002 20.284 7.81278C20.2476 7.96479 20.1699 8.10376 20.0594 8.21428C19.9488 8.32479 19.8099 8.40254 19.6578 8.43889C19.5868 8.45581 19.4751 8.46089 18.9538 8.46089H14.8923C14.3711 8.46089 14.2594 8.45581 14.1866 8.4372C14.0346 8.40085 13.8956 8.3231 13.7851 8.21258C13.6746 8.10207 13.5968 7.9631 13.5605 7.81109C13.5452 7.74171 13.5385 7.63003 13.5385 7.10714V3.04592C13.5385 2.52473 13.5435 2.41304 13.5622 2.34028C13.5985 2.18827 13.6763 2.0493 13.7868 1.93879C13.8973 1.82827 14.0363 1.75053 14.1883 1.71418L14.1866 1.71587ZM2.96154 11.8452H7.19231C7.57985 11.8452 7.91323 11.8452 8.20769 11.9146C8.66354 12.0235 9.08033 12.2565 9.41189 12.5878C9.74344 12.919 9.97682 13.3355 10.0862 13.7912C10.1538 14.0857 10.1538 14.4174 10.1538 14.8066V19.037C10.1538 19.4245 10.1538 19.7579 10.0845 20.0523C9.97554 20.5081 9.74254 20.9249 9.41128 21.2564C9.08002 21.5879 8.66344 21.8213 8.20769 21.9306C7.91323 21.9983 7.58154 21.9983 7.19231 21.9983H2.96154C2.574 21.9983 2.24062 21.9983 1.94615 21.9289C1.49031 21.82 1.07352 21.587 0.741959 21.2558C0.410403 20.9246 0.177028 20.508 0.0676922 20.0523C-6.30434e-08 19.7579 0 19.4262 0 19.037V14.8066C0 14.419 1.26087e-08 14.0857 0.0693846 13.7912C0.17831 13.3354 0.411309 12.9187 0.742567 12.5871C1.07382 12.2556 1.49041 12.0223 1.94615 11.9129C2.24062 11.8452 2.57231 11.8452 2.96154 11.8452ZM3.04615 13.5374C2.52492 13.5374 2.41323 13.5425 2.34046 13.5611C2.18844 13.5975 2.04946 13.6752 1.93894 13.7857C1.82841 13.8962 1.75066 14.0352 1.71431 14.1872C1.69908 14.2566 1.69231 14.3683 1.69231 14.8912V18.9524C1.69231 19.4736 1.69738 19.5853 1.716 19.658C1.75235 19.81 1.8301 19.949 1.94063 20.0595C2.05115 20.17 2.19013 20.2478 2.34215 20.2841C2.41323 20.3011 2.52492 20.3061 3.04615 20.3061H7.10769C7.62892 20.3061 7.74062 20.2994 7.81339 20.2824C7.9654 20.2461 8.10438 20.1683 8.21491 20.0578C8.32543 19.9473 8.40318 19.8083 8.43954 19.6563C8.45646 19.5853 8.46154 19.4736 8.46154 18.9524V14.8912C8.46154 14.37 8.45646 14.2583 8.43785 14.1855C8.40149 14.0335 8.32374 13.8945 8.21322 13.784C8.10269 13.6735 7.96371 13.5958 7.81169 13.5594C7.74231 13.5442 7.63062 13.5374 7.10769 13.5374H3.04615ZM14.8923 11.8452H14.8077C14.4202 11.8452 14.0868 11.8452 13.7923 11.9146C13.3365 12.0235 12.9197 12.2565 12.5881 12.5878C12.2566 12.919 12.0232 13.3355 11.9138 13.7912C11.8462 14.0857 11.8462 14.4174 11.8462 14.8066V19.037C11.8462 19.4245 11.8462 19.7579 11.9155 20.0523C12.0245 20.5081 12.2575 20.9249 12.5887 21.2564C12.92 21.5879 13.3366 21.8213 13.7923 21.9306C14.0868 22 14.4202 22 14.8077 22H19.0385C19.426 22 19.7594 22 20.0538 21.9306C20.5094 21.8214 20.9258 21.5883 21.2571 21.2571C21.5883 20.9259 21.8214 20.5095 21.9306 20.054C22 19.7596 22 19.4262 22 19.0387V14.8066C22 14.419 22 14.0857 21.9306 13.7912C21.8217 13.3354 21.5887 12.9187 21.2574 12.5871C20.9262 12.2556 20.5096 12.0223 20.0538 11.9129C19.7594 11.8452 19.4277 11.8452 19.0385 11.8452H14.8923ZM14.1866 13.5611C14.2594 13.5442 14.3728 13.5374 14.8923 13.5374H18.9538C19.4751 13.5374 19.5868 13.5425 19.6595 13.5611C19.8116 13.5975 19.9505 13.6752 20.0611 13.7857C20.1716 13.8962 20.2493 14.0352 20.2857 14.1872C20.3026 14.2583 20.3077 14.37 20.3077 14.8912V18.9524C20.3077 19.4736 20.3009 19.5853 20.284 19.658C20.2476 19.81 20.1699 19.949 20.0594 20.0595C19.9488 20.17 19.8099 20.2478 19.6578 20.2841C19.5868 20.3011 19.4751 20.3061 18.9538 20.3061H14.8923C14.3711 20.3061 14.2594 20.2994 14.1866 20.2824C14.0346 20.2461 13.8956 20.1683 13.7851 20.0578C13.6746 19.9473 13.5968 19.8083 13.5605 19.6563C13.5452 19.587 13.5385 19.4753 13.5385 18.9524V14.8912C13.5385 14.37 13.5435 14.2583 13.5622 14.1855C13.5985 14.0335 13.6763 13.8945 13.7868 13.784C13.8973 13.6735 14.0363 13.5958 14.1883 13.5594L14.1866 13.5611Z"
            fill="gray"
            fill-opacity="0.5"
          />
        </Svg>

        <Text
          style={{
            fontWeight: '400',
            marginLeft: 20,
            fontSize: 15,
            color: '#000000',
          }}>
          Dash Board
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn]}>
        <Svg
          width="25"
          height="17"
          viewBox="0 0 25 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M16.3333 6L22.1511 3.155C22.3458 3.05979 22.5622 3.01485 22.7797 3.02443C22.9972 3.03402 23.2086 3.09781 23.3938 3.20976C23.5791 3.32171 23.732 3.4781 23.8381 3.66409C23.9441 3.85008 23.9999 4.05951 24 4.2725V12.7275C23.9999 12.9405 23.9441 13.1499 23.8381 13.3359C23.732 13.5219 23.5791 13.6783 23.3938 13.7902C23.2086 13.9022 22.9972 13.966 22.7797 13.9756C22.5622 13.9851 22.3458 13.9402 22.1511 13.845L16.3333 11V6ZM1 3.5C1 2.83696 1.26925 2.20107 1.7485 1.73223C2.22776 1.26339 2.87778 1 3.55556 1H13.7778C14.4556 1 15.1056 1.26339 15.5848 1.73223C16.0641 2.20107 16.3333 2.83696 16.3333 3.5V13.5C16.3333 14.163 16.0641 14.7989 15.5848 15.2678C15.1056 15.7366 14.4556 16 13.7778 16H3.55556C2.87778 16 2.22776 15.7366 1.7485 15.2678C1.26925 14.7989 1 14.163 1 13.5V3.5Z"
            stroke="#000000"
            stroke-opacity="0.5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>

        <Text
          style={{
            fontWeight: '400',
            marginLeft: 20,
            fontSize: 15,
            color: '#000000',
          }}>
          Watch Video To Guide This App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn]} onPress={logout}>
        <Svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M13 8V1H1V21H13V14M22 11H5M22 11L17 6M22 11L17 16"
            stroke="#000000"
            stroke-opacity="0.5"
            stroke-width="2"
          />
        </Svg>

        <Text
          style={{
            fontWeight: '400',
            marginLeft: 20,
            fontSize: 15,
            color: '#000000',
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ImageBackground>
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
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 2,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '85%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    // justifyContent: "center"
  },
  circularBorder: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FFF',
    // borderColor: '#3C3C3C',
    borderRadius: 100,
    overflow: 'visible',
    // width: 120,
    // height: 120,
  },
});

export default Profile;
