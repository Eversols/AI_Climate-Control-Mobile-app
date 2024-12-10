import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  Alert,
  Image,
  PanResponder,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  AnimatedRegion,
} from 'react-native-maps';
import Svg, {Path, Rect, G, Defs, ClipPath, Line} from 'react-native-svg';
import FarmSelectionModal from './components/farmSelectionModal';
import CustomComponent from './components/customComponent';
import GetLocation from 'react-native-get-location';
import {get, post} from './utils/axios';
import {storeFarmData} from './redux/slices/farmSlice';
import {useDispatch, useSelector} from 'react-redux';
import CropList from './components/List';
import {LongPressGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/longPressGesture';
import {
  doesLineIntersect,
  doesLineIntersectForDrag,
  sortPoints,
  sortPolygons,
} from './utils/geometry';

const AddFarm = () => {
  const [farmStep, setFarmStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [polygon, setPolygon] = useState({
    coordinates: [[]],
    isAddFarmPressed: false,
    isAddFarmVisible: false,
  });
  const [innerPolygon, setInnerPolygon] = useState({
    coordinates: [],
    selectedCoordinates: [],
    isAddCropPressed: false,
    isAddCropVisible: false,
  });
  const [addCrops, setAddCrops] = useState([]);
  const [cropModel, setCropModel] = useState(false);
  const [cropAlartModal, setCropAlartModal] = useState(false);
  const [markerDelete, setMarkerDelete] = useState({
    isModal: false,
    index: null,
    event: null,
  });


  const addFarm = async (farmName, color, corp, confirm) => {
    try {
      const formData = {
        farmName: farmName,
        polygons: polygon.coordinates,
        farmColor: color,
        // "parentId": "65ad5977749943e6bc93793e"
      };
      const response = await post('create-farm', formData);
      if (response.data.success) {
        dispatch(storeFarmData(response.data.data));

        if (response.data.data?.corp && response.data.data.corp.length > 0) {
          setAddCrops(
            response.data.data.corp.map(item => {
              return {
                ...item,
                label: item?.name,
                value: item?.id,
                selected: false,
              };
            }),
          );
        }
        setAddSelectedCrop(null);
        // }
        setIsModalVisible(false);
        // setInnerPolygonButtonPressed(true);
        // setPolygonButtonPressed(false);

        if (!confirm) {
          navigation.navigate('FarmImageSelection');
        } else {
          setPolygon(prev => ({
            ...prev,
            isAddFarmPressed: false,
            isAddFarmVisible: false,
          }));
          setIsBottomSheet(false);
          setInnerPolygon(prev => ({
            ...prev,
            coordinate: [],
            selectedCoordinates: [],
            isAddCropPressed: true,
            isAddCropVisible: false,
          }));
        }
        // else {
        //   navigation.navigate('bottom_navigation');
        // }
      }
    } catch (err) {
      console.log('error', err);
      setIsModalVisible(false);
    }
  };

  const handleAddFarmPress = () => {
    if (polygon.isAddFarmPressed) {
      handleOKPress();
      return;
    }
    setFarmStep(1);
    setPolygon(prev => ({...prev, coordinates: []}));
    setInnerPolygon(prev => ({
      ...prev,
      coordinates: [],
      selectedCoordinates: [],
    }));
  };

  const handleOKPress = () => {
    // setIsBottomSheet(false);
    setPolygon(prev => ({
      ...prev,
      isAddFarmPressed: true,
      isAddFarmVisible: true,
    }));

    setFarmStep(0);
  };

  const addCrop = async () => {
    if (
      farmData.id &&
      addSelectedCrop.id &&
      innerPolygon.selectedCoordinates.length > 0
    ) {
      try {
        const formData = {
          farmID: farmData.id,
          cropID: addSelectedCrop.id,
          polygons: innerPolygon.selectedCoordinates,
          // "parentId": "65ad5977749943e6bc93793e"
        };
        console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP', farmData);
        const response = await post('create-farm-crop', formData);

        console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP  :::  ', response);
        if (response.data.success) {
          setInnerPolygon(prev => ({
            ...prev,
            selectedCoordinates: [],
          }));
          setAddCrops(prevCropsData => {
            const updatedCropsData = [...prevCropsData];
            const foundIndex = updatedCropsData.findIndex(
              c => c.id === addSelectedCrop.id,
            );
            if (foundIndex !== -1) {
              updatedCropsData.splice(foundIndex, 1);
            }
            return updatedCropsData;
          });
        }
      } catch (err) {
        console.log('error', err);
      }
    }
  };

  const handleAddPolygonPress = () => {
    if (polygon.isAddFarmPressed) {
      setPolygon(prev => ({...prev, isAddFarmVisible: !prev.isAddFarmVisible}));
    }
    if (innerPolygon.isAddCropPressed) {
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', innerPolygon);
      if (
        innerPolygon.isAddCropVisible &&
        innerPolygon.selectedCoordinates.length > 2
      ) {
        addCrop();
      }
      setInnerPolygon(prev => ({
        ...prev,
        isAddCropVisible: !prev.isAddCropVisible,
      }));
      if (!innerPolygon.isAddCropVisible) {
        setCropModel(true);
      }
    }
  };

  return (
    <View>
      <Text>AddFarm</Text>
    </View>
  );
};

export default AddFarm;
