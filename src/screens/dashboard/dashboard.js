import React, { useRef, useEffect, useState } from 'react';
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
import { Defs, G, Filter, Path, Rect, Svg } from 'react-native-svg';

const Dashboard = ({ navigation }) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80)
  return (
    <ImageBackground
      source={require('../../../asssets/dashboard.png')} // Replace with the path to your image
      style={styles.backgroundImage}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={{ padding: 20, marginTop: 10, marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
          </Svg>

        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "#000", paddingTop: 20, marginLeft: -50 }}>Dashboard</Text>
        <Text></Text>

      </View>
      {/* <View style={{ flexDirection: "row", marginTop: 40, justifyContent: "center" }}>
        <Image style={{ width: "85%", borderRadius: 200, height: 100, resizeMode: "contain" }} source={require('../asssets/profilePic.png')} />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text style={{ textAlign: "center", color: "#000", fontSize: 24, fontWeight: "600" }}>Name</Text>
        <Text style={{ textAlign: "center", color: "#000", fontSize: 14, fontWeight: "400", marginTop: 10 }}>Reference site about Lorem Ipsum</Text>
      </View> */}

      <View style={{ padding: 25 }}>

        <Text style={{ textAlign: "left", color: "#000", fontSize: 18, fontWeight: "600", marginTop: 10 }}>Select Farm</Text>

        <TouchableOpacity onPress={()=>navigation.navigate("dashboard2")} style={[styles.btn]}>
          <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={require('../../../asssets/rice.png')} />
              <View>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000" }}>Farm 1</Text>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 16, color: "#1D2324" }}>Crop: Rice</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "400", marginLeft: 20, alignSelf: "center", fontSize: 16, color: "#1D2324" }}>Location: XYZ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("dashboard2")} style={[styles.btn]}>
          <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={require('../../../asssets/wheat.png')} />
              <View>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000" }}>Farm 2</Text>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 16, color: "#1D2324" }}>Crop: Wheat</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "400", marginLeft: 20, alignSelf: "center", fontSize: 16, color: "#1D2324" }}>Location: XYZ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("dashboard2")} style={[styles.btn]}>
          <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={require('../../../asssets/corn.png')} />
              <View>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000" }}>Farm 1</Text>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 16, color: "#1D2324" }}>Crop: Corn</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "400", marginLeft: 20, alignSelf: "center", fontSize: 16, color: "#1D2324" }}>Location: XYZ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("dashboard2")} style={[styles.btn]}>
          <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={require('../../../asssets/apple.png')} />
              <View>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000" }}>Farm 1</Text>
                <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 16, color: "#1D2324" }}>Crop: Apple</Text>
              </View>
            </View>
            <Text style={{ fontWeight: "400", marginLeft: 20, alignSelf: "center", fontSize: 16, color: "#1D2324" }}>Location: XYZ</Text>
          </View>
        </TouchableOpacity>

      </View>

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
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 40,
    borderWidth: 2,
    height: 70,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    width: "100%",
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default Dashboard;
