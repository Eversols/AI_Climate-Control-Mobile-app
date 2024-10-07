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
  Modal,
  FlatList,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import { Defs, G, Filter, Path, Rect, Svg, Circle } from 'react-native-svg';
import { get, put } from '../../utils/axios';
import { BASE_URL, IMAGE_BASE_URL } from '../../redux/slices/authSlice';
import List from '../../components/List';
import CustomComponent from '../../components/customComponent';

const Dashboard = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [farm, setFarm] = useState(null);
  const [farmModal, setFarmModal] = useState(false);
  const [farmEdit, setFarmEdit] = useState(false);
  const [cropsDelete, setCropsDelete] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ modal: false, farm: null, crop: null });
  const [farmName, setFarmName] = useState('');
  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await get('/get-my-farms');
      const data = response.data;
      if (data.success) {
        setFarms(data.data.farms);
      } else {
        console.error('Failed to fetch farms data');
      }
    } catch (error) {
      console.error('Error fetching farms data:', error);
    }
  };


  const updateFarm = async () => {
    try {
      const formData = {
        farmName: farmName,
      };
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGG', farm.id)
      const response = await put(`update-farm/${farm.id}`, formData);
      console.log("FFFFFFFFFFFFFFFFFFFFFFFF", response)
      console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOO', response.data.data.farmCrops)
      if (response.data.success) {
        setFarm(response.data.data)
        setFarmEdit(false)
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleYes = async () => {
    try {
      const id = farm.id
      let response
      if (deleteModal.farm && deleteModal.crop) {
        response = await put(`crop-delete/${deleteModal.crop.id}`);
      }
      if (deleteModal.farm && !deleteModal.crop) {
        response = await put(`farm-delete/${id}`);
      }
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHH ::::: ', response.data)
      if (response.data.success) {
        if (deleteModal.farm && deleteModal.crop) {
          setFarm(null)
          setFarmModal(false)
          setCropsDelete(false)
        }
        if (deleteModal.farm && !deleteModal.crop) {
          setFarm(null)
          setFarmModal(false)
        }
        fetchData()
        setDeleteModal({ modal: false, farm: null, crop: null })

      }
    } catch (err) {
      console.log('error', err);
    }
  };
  // const navigation = useNavigation();
  const refRBSheet = useRef();
  const [locheigth, setLocheigth] = useState(80)
  return (
    <>
      <ImageBackground
        source={require('../../../asssets/dashboard.png')}
        style={styles.backgroundImage}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={{ padding: 20, marginTop: 10, marginLeft: 10 }} onPress={() => navigation.goBack()}>
            <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
            </Svg>

          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#000", paddingTop: 20, marginLeft: -50 }}>Choose a farm</Text>
          <Text></Text>

        </View>
        {/* <View style={{ flexDirection: "row", marginTop: 40, justifyContent: "center" }}>
        <Image style={{ width: "85%", borderRadius: 200, height: 100, resizeMode: "contain" }} source={require('../asssets/profilePic.png')} />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text style={{ textAlign: "center", color: "#000", fontSize: 24, fontWeight: "600" }}>Name</Text>
        <Text style={{ textAlign: "center", color: "#000", fontSize: 14, fontWeight: "400", marginTop: 10 }}>Reference site about Lorem Ipsum</Text>
      </View> */}

        <ScrollView style={{ padding: 25 }}>

          {/* <Text style={{ textAlign: "left", color: "#000", fontSize: 18, fontWeight: "600", marginTop: 10 }}>Select Farm</Text> */}

          {farms.length > 0 && farms.map(farm => (
            <TouchableOpacity
              key={farm?.id}
              onPress={() => { navigation.navigate('dashboard2', { farm }) }}
              style={[styles.btn]}>
              <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: "100%" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={{ uri: `${IMAGE_BASE_URL}/${farm?.image}` }} />
                  <View style={{ textAlign: "center", alignSelf: "center" }}>
                    <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000", }}>{farm?.farmName}</Text>
                  </View>
                </View>
                <Text style={{ fontWeight: "400", marginLeft: 20, alignSelf: "center", fontSize: 16, color: "#1D2324" }}>Location: XYZ</Text>
              </View>
            </TouchableOpacity>
          ))}


        </ScrollView>



      </ImageBackground>
      <Modal visible={farmModal} transparent={true} animationType="slide" >
        <ImageBackground
          source={require('../../../assets/images/farmsList.png')}
          style={styles.imageBackground}
          blurRadius={9}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={{ padding: 20, marginTop: 10, marginLeft: 10 }} onPress={() => setFarmModal(false)}>
              <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
              </Svg>

            </TouchableOpacity>
            {/* <Text style={{ fontSize: 24, fontWeight: "700", color: "#000", paddingTop: 20, marginLeft: -30 }}>Profile</Text>
            <Text></Text> */}

          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "space-between", width: "90%", paddingVertical: 6 }}>
                {farmEdit ?
                  <TextInput
                    style={styles.userInfoText}
                    value={farmName}
                    onChangeText={(text) => setFarmName(text)}
                    placeholder="Farm Name"
                  />
                  :
                  <View style={{ flexDirection: "row" }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 200, borderWidth: 1, borderColor: "#fff", resizeMode: "contain" }} source={{ uri: `${IMAGE_BASE_URL}/${farm?.image}` }} />
                    <View style={{ textAlign: "center", alignSelf: "center" }}>
                      <Text style={{ fontWeight: "400", marginLeft: 20, fontSize: 18, color: "#000", }}>{farm?.farmName}</Text>
                    </View>
                  </View>}
                {!cropsDelete && <TouchableOpacity style={styles.editIcon} onPress={() => setFarmEdit(true)}>
                  <Svg width="19" height="19" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08196 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" />
                  </Svg>
                </TouchableOpacity>}
              </View>
              <FlatList
                data={farm?.farmCrops.map((item) => ({ ...item, label: item.crop.name, value: item.crop.id, }))}
                keyExtractor={item => item.value}
                scrollEnabled={true}
                renderItem={({ item, index }) => (
                  <>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => ''}>
                      <Text style={styles.optionText}>{item.label}</Text>
                      {cropsDelete && (
                        <TouchableOpacity style={{ position: "absolute", right: 20, top: 10 }} onPress={() => { setDeleteModal({ modal: true, farm: farm, crop: item }); setFarmModal(false) }}>
                          <View >
                            <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                              <Path
                                d="M3.375 20C2.75625 20 2.22675 19.7826 1.7865 19.3478C1.34625 18.913 1.12575 18.3896 1.125 17.7778V3.33333H0V1.11111H5.625V0H12.375V1.11111H18V3.33333H16.875V17.7778C16.875 18.3889 16.6549 18.9122 16.2146 19.3478C15.7744 19.7833 15.2445 20.0007 14.625 20H3.375ZM5.625 15.5556H7.875V5.55556H5.625V15.5556ZM10.125 15.5556H12.375V5.55556H10.125V15.5556Z"
                                fill="black"
                              />
                            </Svg>
                          </View>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              />
            </View>
            {farmEdit ?
              <View style={{ width: '60%' }}>
                <TouchableOpacity
                  onPress={updateFarm}
                  style={{
                    top: 80,
                    paddingVertical: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 30,
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <>
                <View style={{ width: '60%' }}>
                  <TouchableOpacity
                    onPress={() => { setDeleteModal({ modal: true, farm: farm, crop: null }); setFarmModal(false) }}
                    style={{
                      top: 80,
                      paddingVertical: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 30,
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>
                      Delete Farm
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '60%', marginTop: 14 }}>
                  <TouchableOpacity
                    onPress={() => setCropsDelete(true)}
                    style={{
                      top: 80,
                      paddingVertical: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 30,
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>
                      Delete Crop
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          </View>
          {console.log('HHHHHHHHHHHHHHHHHHHHHHHHH', deleteModal)}
        </ImageBackground>
      </Modal>
      <ConfirmationModal
        visible={deleteModal.modal}
        onYes={handleYes}
        onNo={() => { setDeleteModal({ farm: null, crop: null }); setFarmModal(true) }}
        farm={deleteModal.farm}
        crop={deleteModal.crop}
      />
    </>
  );
};

const ConfirmationModal = ({ visible, onYes, onNo, farm, crop }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => { }}>

      <View style={styles.confirmationModalContainer}>
        <View style={styles.confirmationModalContent}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              marginBottom: 10,
              color: '#3D4142',
              paddingHorizontal: 25,
              lineHeight: 24,
            }}>
            {(farm && crop) ? `Are you sure to delete ${crop?.crop?.name} from ${farm?.farmName}?` : `Are you sure to delete ${farm?.farmName}?`}
          </Text>
          <TouchableOpacity style={styles.confirmationOption} onPress={onYes}>
            <Text style={{ color: '#1D2324', fontSize: 14 }}>Yes</Text>
          </TouchableOpacity>
          <View style={styles.blackLine} />
          <TouchableOpacity style={styles.confirmationOption} onPress={onNo}>
            <Text style={{ color: '#1D2324', fontSize: 14 }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

    </Modal>
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
  },
  imageBackground: {
    flex: 1,
  },

  topContainer: {
    // justifyContent: 'flex-end',
    padding: 30,
    marginTop: 40,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10, // Add padding to top and bottom
    borderRadius: 25,
    // elevation: 5,
    width: '90%',
    // alignItems: 'center',
  },

  whiteLine: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10, // Adjust as needed for spacing
  },

  modalTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#3D4142',
  },

  textInput: {
    borderColor: '#ccc',
    padding: 5,
    left: 15,
    borderRadius: 5,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center', // Align items vertically
    marginVertical: 5,
    paddingRight: 20,
  },
  cropOptionText: {
    flex: 1,
    textAlign: 'center',
    // marginStart:120,
    paddingVertical: 5,
    // textAlignVertical: 'center',
    color: '#1D2324',
  },
  checkbox: {
    width: 20,
    height: 20,
    // marginLeft: 10,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },

  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  confirmationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust the alpha value for the overlay color
  },
  confirmationModalContent: {
    backgroundColor: 'white',
    // paddingHorizontal: 10,
    borderRadius: 25,
    paddingVertical: 15,
    lineHeight: 24,

    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  confirmationOption: {
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  blackLine: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  optionText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
  editIcon: {
    width: 18,
    height: 18
  },
  userInfoText: {
    // textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    width: '90%',
    lineHeight: 27,
    height: 50,
    textAlignVertical: 'center',
  },
});

export default Dashboard;
