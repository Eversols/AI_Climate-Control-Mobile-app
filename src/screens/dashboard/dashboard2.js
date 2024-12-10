import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import {Defs, G, Filter, Path, Rect, Svg} from 'react-native-svg';
import {IMAGE_BASE_URL} from '../../redux/slices/authSlice';

const Dashboard2 = ({navigation, route}) => {
  // const navigation = useNavigation();
  const {params} = route;
  const [shallDelete, setShallDelete] = useState(false);

  console.log(
    'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    `${IMAGE_BASE_URL}/${params.farm.image}`,
  );
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80);
  return (
    <ImageBackground
      source={require('../../../asssets/dashboard-bg.jpg')} // Replace with the path to your image
      style={styles.backgroundImage}
      blurRadius={32}>
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
            fontSize: 20,
            fontWeight: '600',
            color: '#000',
            paddingTop: 20,
            marginLeft: -50,
          }}>
          Dashboard
        </Text>
        <View />
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: '#000',
                fontSize: 24,
                fontWeight: '400',
              }}>
              Field: {params?.farm?.farmName || ''}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => setShallDelete(true)}
                style={[
                  styles.shadow,
                  {
                    borderRadius: 500,
                    paddingHorizontal: 30,
                    paddingVertical: 3,
                  },
                ]}>
                <Text style={{color: '#000000', fontWeight: 600}}>
                  Delete Farm
                </Text>
              </TouchableOpacity>
              {shallDelete ? (
                <View
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999,
                    elevation: 4,
                    top: 50,
                    right: 0,
                  }}>
                  <View
                    style={{
                      borderRadius: 29,
                      backgroundColor: '#ffffff',
                      alignItems: 'center',
                      width: 329,
                    }}>
                    <Text style={{padding: 16, color: '#000000'}}>
                      Delete {params?.farm?.farmName} and it's contents?
                    </Text>
                    <TouchableOpacity style={{padding: 16}}>
                      <Text>Yes</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{flex: 1, height: 1, backgroundColor: '#000000'}}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setShallDelete(false)}
                      style={{padding: 16}}>
                      <Text>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "400", marginTop: 10 }}>Crop: Rice</Text>
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "400", marginTop: 10 }}>Location: XYZ</Text>
          </View> */}
          {/* <Text style={{ textAlign: "center", color: "#000", fontSize: 18, fontWeight: "600", marginTop: 10 }}>Used Pesticide</Text> */}

          <View style={styles.shadow}>
            <Image
              style={{width: 100, height: 100}}
              source={
                !params?.farm?.image
                  ? {uri: `${IMAGE_BASE_URL}/${params.farm.image}`}
                  : require('../../../asssets/dashboardCard.png')
              }
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                class ID: {}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                class Name: {}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                confidence: {}
              </Text>
            </View>
          </View>
          <View style={styles.shadow}>
            <Image
              style={{width: 100, height: 100}}
              source={
                !params?.farm?.image
                  ? {uri: `${IMAGE_BASE_URL}/${params.farm.image}`}
                  : require('../../../asssets/dashboardCard.png')
              }
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                class ID: {}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                class Name: {}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                confidence: {}
              </Text>
            </View>
          </View>

          {/* <Text style={{ textAlign: "center", color: "#000", fontSize: 18, fontWeight: "600", marginTop: 10 }}>Detected Pesticide</Text>

          <View style={styles.shadow}>
            <Text style={{ fontSize: 13 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</Text>
          </View> */}
        </View>
      </ScrollView>
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 40,
    borderWidth: 2,
    height: 70,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    width: '100%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  shadow: {
    flexDirection: 'row',
    padding: 12,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.0)',
    marginHorizontal: 15,
    paddingHorizontal: 20,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff0',
  },
});

export default Dashboard2;
