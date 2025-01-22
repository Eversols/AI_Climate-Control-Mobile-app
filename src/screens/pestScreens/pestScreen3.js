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
import DropDown from '../../components/dropDown';
import TextDropDown from '../../components/textDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { postForm } from '../../utils/axios';
import { setPestImage, setSelectedFarm, setSelectedcorp } from '../../redux/slices/pesticidesSlice';
import { useToast } from "react-native-toast-notifications";

const PestScreen3 = ({ navigation, route }) => {
  // const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch()
  const { pestImage } = useSelector((state) => state.pest)

  const [selectedPestOption, setSelectedPestOption] = useState(0)
  const [pestOptions, setPestOptions] = useState(["Pest", "Spider", "Fly", "Snail", "Aphid", "Slug", "Beetle"])

  const [selectedRcmdPest, setSelectedRcmdPest] = useState(0)
  const [rcmdPstOpts, setRcmdPstOpts] = useState([
    "Bacillus thuringiensis",
    "Spinosad",
    "Neem Oil",
    "Moths",
    "Pyrethroids",
    "Diatomaceous Earth",
    "Insecticidal Soaps",
    "Chlorantraniliprole",
    "Imidacloprid",
    "Carbaryl"
  ])

  const [insectInfo, setInsectInfo] = useState("")
  const [upload, setUpload] = useState("")
  const [feedback, setFeedback] = useState("")
  const { selectedfarm, selectedCorp } = useSelector((state) => state.pest)

  useEffect(()=>{
    if(route?.params?.insectData){
      console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN', route?.params?.insectData)
      setSelectedPestOption(route?.params?.insectData[0].class_id)
    }
  }, [route])

  const addFormData = async () => {
    try {
      // toast.show("Hello World");
      if (!selectedRcmdPest || !insectInfo || !upload || !feedback) {
        toast.show("All fields Are required",
          {
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "zoom-in",
          });
        return
      }
      console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', selectedfarm, selectedCorp)
      const formData = new FormData()
      formData.append("farm", selectedfarm)
      formData.append("corp", selectedCorp)

      formData.append("pest", pestOptions[selectedPestOption])

      formData.append("pesticide", rcmdPstOpts[selectedRcmdPest])
      formData.append("insectInformation", insectInfo)
      formData.append("uploadInformation", upload)
      formData.append("sendFeedback", feedback)
      formData.append("image", {
        uri: pestImage?.path,
        type: 'image/jpeg', // adjust the type according to your image type
        name: 'image.jpg' // adjust the name accordingly
      })

      const response = await postForm("/add-farmdata", formData)
      if (response.data?.success) {
        toast.show("Form submitted successfully.",
          {
            type: "success ",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "zoom-in",
          });
        setSelectedPestOption(0)
        setSelectedRcmdPest(0)
        setInsectInfo("")
        setUpload("")
        setFeedback("")
        dispatch(setSelectedFarm(null))
        dispatch(setSelectedcorp(null))
        dispatch(setPestImage(null))
        navigation.navigate("bottom_navigation")
      }
    } catch (error) {
      console.log("add form error", error)
    }
  }
  return (
    <ImageBackground
      source={require('../../../asssets/pestScreen3.png')} // Replace with the path to your image
      style={styles.backgroundImage}>
      <TouchableOpacity style={{ padding: 20, marginHorizontal: 10 }} onPress={() => navigation.goBack()}>
        <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
        </Svg>

      </TouchableOpacity>

      <ScrollView>
        <View style={{ flexDirection: "row", marginTop: -20, justifyContent: "center" }}>
          <Image style={{ width: "85%", height: 250, resizeMode: "contain" }} source={pestImage ? { uri: `${pestImage?.path}` } : require('../../../asssets/minibutter2.png')} />
        </View>



        <View style={{ marginTop: 0 }}>
          <DropDown btnTitle={"Choose Pest"}
            options={pestOptions}
            selectedOption={selectedPestOption}
            setSelectedOption={setSelectedPestOption} />


          <TextDropDown
            btnTitle={"Insect Information"}
            value={insectInfo}
            setValue={setInsectInfo} />

          <TextDropDown
            btnTitle={"Upload Information"}
            value={upload}
            setValue={setUpload} />

          <DropDown btnTitle={"Recommended Pesticide"}
            options={rcmdPstOpts}
            selectedOption={selectedRcmdPest}
            setSelectedOption={setSelectedRcmdPest} />


          <TextDropDown
            btnTitle={"Send Feedback"}
            value={feedback}
            setValue={setFeedback}
          />
          <TouchableOpacity onPress={() => {
            addFormData()
            // navigation.navigate("profile")
          }} style={[styles.btn, { width: "70%", }]}>
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Submit</Text>
          </TouchableOpacity>


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
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1,
    padding: 12,
    width: "90%",
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default PestScreen3;
