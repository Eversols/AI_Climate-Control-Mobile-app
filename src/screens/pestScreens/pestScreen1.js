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
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// import MapView, { Marker } from 'react-native-maps';
// import Mapbox, { UserLocation, Camera } from '@rnmapbox/maps';
import { Defs, G, Filter, Path, Rect, Svg } from 'react-native-svg';
import { SelectList } from 'react-native-dropdown-select-list';
import DropDown2 from '../../components/dropDown2';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyFarms } from '../../redux/slices/farmSlice';
import { setSelectedFarm, setSelectedcorp } from '../../redux/slices/pesticidesSlice';

const PestScreen1 = ({ navigation, route }) => {
  // const navigation = useNavigation();
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80)
  const { farmList } = useSelector((state) => state.farm)
  const dispatch = useDispatch()
  const [corpOptions, setCorpOptions] = useState([])
  const [selectedFarm, setFarmName] = useState("")
  const [selectedcrop, setCropName] = useState("")

  const handlefarmOptions = (i) => {

    setCorpOptions(farmList[i].farmCrops.length > 0 ? farmList[i].farmCrops.map(item => { return { id: item.crop.id, name: item.crop.name } }) : [])
    setFarmName(farmList[i].farmName)
    console.log('WWWWWWWWWWWWWWWWWWWW', farmList[i].id)
    dispatch(setSelectedFarm(farmList[i].id))
    setCropName("")
  }
  const handlecropOptions = (i) => {

    setCropName(corpOptions[i].name)
    console.log('WWWWWWWWWWWWWWWWWWWW', corpOptions[i]?.id)
    dispatch(setSelectedcorp(corpOptions[i]?.id))
  }

  useEffect(() => {
    dispatch(GetMyFarms())

  }, [])
  useEffect(() => {

    console.log('WWWWWWWWWWWWWWWWWWWW', route.params.crop)
    if (farmList.length > 0 && route?.params?.farm && route?.params?.crop) {
      const farm = farmList.find((item) => item.id === route.params.farm.id);
      const crops = farmList[0].farmCrops.length > 0 ? farmList[0].farmCrops.map(item => ({ id: item.crop.id, name: item.crop.name })) : []
      setCorpOptions(crops)
      const crop = crops.find((item) => item.id === route.params.crop.crop.id);
      setFarmName(farm?.farmName)
      setCropName(crop?.name)
      dispatch(setSelectedFarm(farm?.id))
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', crop?.id)
      dispatch(setSelectedcorp(crop?.id))
    } else {
      if (farmList.length > 0) {
        const crops = farmList[0].farmCrops.length > 0 ? farmList[0].farmCrops.map(item => ({ id: item.crop.id, name: item.crop.name })) : []
        setCorpOptions(crops)
        setFarmName(farmList[0]?.farmName)
        setCropName(crops[0]?.name)
        dispatch(setSelectedFarm(farmList[0]?.id))
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 232333333333', crop?.id)
        dispatch(setSelectedcorp(crops[0]?.id))

      }
    }
  }, [farmList])
  return (
    <ImageBackground
      source={require('../../../asssets/pestScreen1.png')} // Replace with the path to your image
      style={styles.backgroundImage}>
      <TouchableOpacity style={{ padding: 20, margin: 10 }} onPress={() => navigation.goBack()}>
        <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
        </Svg>

      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16 }}>
        <DropDown2
          btnTitle="Farm"
          options={farmList.map(item => item.farmName)}
          selectedOption={selectedFarm}
          setSelectedOption={handlefarmOptions} />

        <DropDown2
          btnTitle="Crop"
          options={corpOptions.map(item => item.name)}
          selectedOption={selectedcrop}
          setSelectedOption={handlecropOptions} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image source={require('../../../asssets/bee.png')} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("pestScreen2")} style={styles.btn}>
        <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("pestScreen2")} style={[styles.btn, { width: "65%", }]}>
        <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Take Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("pestScreen2")}
        style={[styles.btn, { width: "65%", }]}>
        <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Upload Image</Text>
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: "90%",
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default PestScreen1;
