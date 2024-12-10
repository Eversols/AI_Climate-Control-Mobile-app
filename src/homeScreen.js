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
import {get, post, put} from './utils/axios';
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

const HomeScreen = ({navigation}) => {
  const [farmStep, setFarmStep] = useState(0);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [polygon, setPolygon] = useState({
    farms: [], // [{farmName,color,corp,confirm,coordinates: []}]
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
  const [innerPolygonCoordinates, setInnerPolygonCoordinates] = useState([]);
  const [addCrops, setAddCrops] = useState([]);
  const [isPolygonButtonPressed, setPolygonButtonPressed] = useState(false);
  const [innerPolygonButtonPressed, setInnerPolygonButtonPressed] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isAddFarmPressed, setIsAddFarmPressed] = useState(false);
  const [cropModel, setCropModel] = useState(false);
  const [cropAlartModal, setCropAlartModal] = useState(false);
  const [markerDelete, setMarkerDelete] = useState({
    isModal: false,
    index: null,
    event: null,
  });
  const [screenState, setScreenState] = useState({
    isAddFarmVisible: true,
    showSearchButton: true,
    showContinueButton: false,
    isAddPolygonMode: false,
    isAddCrops: false,
  });
  const {farmData} = useSelector(state => state.farm);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 31.5948548,
    longitude: 74.3640665,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [mapEvent, setMapEvent] = useState(null);
  const mapRef = useRef(null);
  const [currentlyAddingFarmIndex, setCurrentlyAddingFarmIndex] = useState(-1);

  const reset = () => {
    setCurrentlyAddingFarmIndex(-1);
    setPolygon(prev => ({
      ...prev,
      farms: [],
      isAddFarmPressed: false,
      isAddFarmVisible: false,
    }));
    setInnerPolygonCoordinates([]);
    setPolygonCoordinates([]);
    setFarmStep(0);
    setPolygonButtonPressed(false);
    setInnerPolygonButtonPressed(false);
    setIsModalVisible(false);
    setIsAddFarmPressed(false);
    setScreenState({
      isAddFarmVisible: true,
      showSearchButton: true,
      showContinueButton: false,
      isAddPolygonMode: false,
    });
  };

  useEffect(() => {
    if (
      selectedFarmIndex >= 0 &&
      farmsData.length > 0 &&
      selectedFarmIndex < farmsData.length
    ) {
      setPolygon(v => ({...v, farms: [farmsData[selectedFarmIndex]]}));
    }
  }, [farmsData]);

  const cancelFarmAdd = () => {
    setCurrentlyAddingFarmIndex(value => (value > 0 ? --value : -1));
    setPolygon(prev => {
      const f = Array(prev.farms).pop();
      return {
        ...prev,
        farms: !!f ? f : [],
      };
    });
    if (currentlyAddingFarmIndex < 0) {
      setFarmStep(0);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (currentlyAddingFarmIndex < 0) {
      reset();
    }
  }, [currentlyAddingFarmIndex]);

  const handleZoomIn = () => {
    setCurrentLocation(pre => ({
      ...pre,
      latitudeDelta: currentLocation.latitudeDelta / 2,
      longitudeDelta: currentLocation.latitudeDelta / 2,
    }));
  };

  const handleZoomOut = () => {
    setCurrentLocation(pre => ({
      ...pre,
      latitudeDelta: currentLocation.latitudeDelta * 2,
      longitudeDelta: currentLocation.latitudeDelta * 2,
    }));
  };

  useEffect(() => {
    console.log('new polygon data is ', JSON.stringify(polygon));
  }, [polygon]);

  const addToCurrentlyAddingFarm = (farmName, color, corp, confirm) => {
    setPolygon(prev => ({
      ...prev,
      farms: prev.farms.map(e => ({
        ...e,
        farmName: farmName,
        color: color,
        corp: corp,
        confirm: confirm,
      })),
      isAddFarmPressed: true,
      isAddFarmVisible: true,
    }));
    setIsModalVisible(false);
    polygon.farms.forEach((f, fIndex) =>
      addFarm(farmName, color, corp, confirm, f.coordinates),
    );
  };

  const addFarms = async () => {
    setIsModalVisible(true);
  };

  const addFarm = async (farmName, color, corp, confirm, coordinates) => {
    try {
      const fd = {
        farmName: farmName,
        polygons: coordinates,
        farmColor: color,
        // "parentId": "65ad5977749943e6bc93793e"
      };
      console.log('formData is ', fd);
      const response = await post('/create-farm', fd);
      console.log('create-farm response is', response);
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

  const getCurrentLocation = () => {
    console.log('getCurrentLocation');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('getCurrentLocation', location);
        setCurrentLocation(pre => ({
          ...pre,
          latitude: location.latitude,
          longitude: location.longitude,
        }));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    setIsBottomSheet(true);
    setSelectedCrop({index: null, crop: null});
    setPolygon({
      farms: [],
      isAddFarmPressed: false,
      isAddFarmVisible: false,
    });
    setInnerPolygon({
      coordinates: [],
      selectedCoordinates: [],
      isAddCropPressed: false,
      isAddCropVisible: false,
    });
    setSelectedFarm(null);
    setCropData([]);
    setCropModel(false);
  }, []);

  const handleAddFarmPress = () => {
    // if (polygon.isAddFarmPressed) {
    //   handleOKPress();
    //   return;
    // }
    setFarmStep(1);
    setPolygon(prev => ({...prev, farms: []}));
    setInnerPolygon(prev => ({
      ...prev,
      coordinates: [],
      selectedCoordinates: [],
    }));
  };

  const handleOKPress = () => {
    // setIsModalVisible(true);

    setPolygon(prev => ({
      ...prev,
      farms: [
        ...prev.farms,
        {
          farmName: '',
          color: '#33AA33AA',
          coordinates: [],
        },
      ],
      isAddFarmPressed: true,
      isAddFarmVisible: true,
    }));

    setCurrentlyAddingFarmIndex(value => ++value);

    setFarmStep(0);
    setScreenState(prevState => ({...prevState, showContinueButton: true}));
    setIsAddFarmPressed(true);
    setIsModalVisible(false);

    // setIsBottomSheet(false);
    // setPolygon(prev => ({
    //   ...prev,
    //   isAddFarmPressed: true,
    //   isAddFarmVisible: true,
    // }));

    // setFarmStep(0);
    // setScreenState(prevState => ({...prevState, showContinueButton: true}));
    // setIsAddFarmPressed(true);
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

  const handleMapPress = event => {
    console.log(
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT sssssssssssss',
      isTouching,
    );
    if (!isTouching) {
      if (polygon.isAddFarmPressed || innerPolygon.isAddCropPressed) {
        if (polygon.isAddFarmVisible) {
          console.log(
            'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
            event,
          );
          console.log(
            'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT LLLL ',
            innerPolygon,
          );
          const newCoordinate = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          };

          console.log(
            'newCoordinate :::::::::::::::::::::::::::::::::::::::::::::::::::',
            JSON.stringify(polygon?.farms),
          );
          // if (!doesLineIntersect(polygon.coordinates, newCoordinate)) {
          setPolygon(prev => {
            const cfp = prev.farms.map((v, i) => {
              const coords = sortPoints([
                ...(v?.coordinates ?? []),
                newCoordinate,
              ]);
              const f =
                i == currentlyAddingFarmIndex
                  ? {
                      ...v,
                      coordinates: coords,
                    }
                  : v;
              console.log(
                'index: ',
                i,
                'currentlyAddingIndex',
                currentlyAddingFarmIndex,
                'oldfarmdata',
                JSON.stringify(v),
                'newfarmdata',
                JSON.stringify(f),
              );
              return f;
            });
            return {
              ...prev,
              farms: cfp,
            };
          });
          console.log(
            'GOOOD ::::::::::::::::::::::::::::::::::::::::::::::::::: ::::::::::',
          );
        }
        if (innerPolygon.isAddCropVisible) {
          if (addCrops.length > 0) {
            const newCoordinate = {
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude,
            };
            const lastIndex =
              innerPolygon.selectedCoordinates.length > 0
                ? innerPolygon.coordinates.length - 1
                : innerPolygon.coordinates.length - 1 + 1;
            const coordinates =
              innerPolygon.coordinates.length > 0
                ? innerPolygon.coordinates[0]
                : [];
            console.log(
              'newCoordinate ::::::::::::::::::::::::::::::::::::::::::::::::::: :::::::::: 1111111',
              innerPolygon.coordinates[lastIndex]
                ? [
                    ...innerPolygon.coordinates.slice(0, lastIndex),
                    [...innerPolygon.coordinates[lastIndex], newCoordinate],
                    ...innerPolygon.coordinates.slice(lastIndex + 1),
                  ]
                : [...innerPolygon.coordinates, [newCoordinate]],
            );
            setInnerPolygon(prev => ({
              ...prev,
              coordinates: sortPolygons(
                prev.coordinates[lastIndex]
                  ? [
                      ...prev.coordinates.slice(0, lastIndex),
                      [...prev.coordinates[lastIndex], newCoordinate],
                      ...prev.coordinates.slice(lastIndex + 1),
                    ]
                  : [...prev.coordinates, [newCoordinate]],
              ),
              selectedCoordinates: [...prev.selectedCoordinates, newCoordinate],
            }));
            console.log(
              'GOOOD for inner polygon ::::::::::::::::::::::::::::::::::::::::::::::::::: ::::::::::',
            );
            console.log('IIIIIIIIIIIIIIIIIIIIIIIIII', innerPolygon.coordinates);
          } else {
            setCropAlartModal(true);
          }
        }
      }
    }
  };

  const checkIntersections = (existingCoordinates, newCoordinate) => {
    if (existingCoordinates.length > 2) {
      if (
        doIntersect(
          existingCoordinates[existingCoordinates.length - 1],
          existingCoordinates[0],
          existingCoordinates[existingCoordinates.length - 1],
          newCoordinate,
        )
      ) {
        console.log(
          'INTERSECTED ::::::: 2 ',
          existingCoordinates[existingCoordinates.length - 1],
          existingCoordinates[0],
          existingCoordinates[existingCoordinates.length - 1],
          newCoordinate,
        );
        return true;
      }
    }
    for (let i = 0; i < existingCoordinates.length - 1; i++) {
      console.log('INDEXXXXXXXXXXXXXXX ::::::: 1 ', i);
      if (
        doIntersect(
          existingCoordinates[i],
          existingCoordinates[i + 1],
          existingCoordinates[existingCoordinates.length - 1],
          newCoordinate,
        )
      ) {
        console.log(
          'INTERSECTED ::::::: 1 ',
          existingCoordinates[i],
          existingCoordinates[i + 1],
          existingCoordinates[existingCoordinates.length - 1],
          newCoordinate,
          i,
        );
        return true;
      }
    }

    return false;
  };

  const handleMarkerDrag = (event, i) => {
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', i);
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT LLLL ');
    // if (polygon.isAddFarmPressed || innerPolygon.isAddCropPressed) {
    //   if (polygon.isAddFarmVisible) {
    //   }
    // }
    const newCoordinate = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    const coordinate = polygon.farms?.[
      currentlyAddingFarmIndex
    ].coordinates.filter((_, index) => index !== i);

    const newFarmData = polygon.farms.map((v, i) =>
      i == currentlyAddingFarmIndex
        ? {
            ...v,
            coordinates: sortPoints([...coordinate, newCoordinate]),
          }
        : v,
    );

    setPolygon(prev => ({
      ...prev,
      farms: newFarmData,
    }));
    if (!polygon.isAddFarmPressed) {
      const f = newFarmData[0];
      updateFarm({
        ...f,
        polygons: f.coordinates,
        id: farmsData[selectedFarmIndex].id,
      });
    }
    console.log(
      'GOOOD ::::::::::::::::::::::::::::::::::::::::::::::::::: ::::::::::',
    );
  };

  const updateFarm = async farm => {
    console.log('farm to update', farm.id, farm);
    const formUpdated = await put(`/farm-delete/${farm?.id}`);
    if (formUpdated.data.success) {
      const response = await post('/create-farm', {
        farmName: farm.farmName,
        farmColor: farm.color,
        polygons: farm.polygons,
      });
      if (response.data.success) {
        fetchFarmData();
      }
      const f = {...farm, ...response.data.data};
      console.log('create-farm response is', f);
      setSelectedFarm(farm);
      setPolygon(v => ({...v, farms: [f]}));
    }
  };

  const handleMarkerDragInner = (event, parentIndex, index) => {
    console.log(
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      parentIndex,
      index,
    );
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT LLLL ');
    if (polygon.isAddFarmPressed || innerPolygon.isAddCropPressed) {
      if (innerPolygon.isAddCropVisible) {
        const newCoordinate = {
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
        };

        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDD', parentIndex, index);
        const twoDArray = innerPolygon.coordinates.map((row, i) => {
          // If the current row is the one we want to modify
          if (i == parentIndex) {
            console.log(
              'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              row.filter((_, j) => j !== index),
            );
            // Filter out the element at colIndex
            const filerValues = row.filter((_, j) => j !== index);
            return [...filerValues, newCoordinate];
          }
          return row;
        });
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZ', twoDArray);
        console.log(
          'ZZZZZZZZZZZZZZZZZZZZZZZZZZZ :::::::: ',
          innerPolygon.coordinates,
        );
        setInnerPolygon(prev => ({
          ...prev,
          coordinates: sortPolygons(twoDArray),
        }));
      }
    }
  };

  const renderFarmIcons = () => {
    const farmIcons = [
      <>
        {innerPolygon.isAddCropPressed && (
          <View style={styles.farmIconContainer}>
            <TouchableOpacity onPress={handleAddPolygonPress}>
              {innerPolygon.isAddCropVisible ? (
                <View
                  style={{
                    padding: 6,
                    marginTop: 0,
                    borderRadius: 30,
                    backgroundColor: 'rgba(85, 167, 72, 1)',
                    borderColor: 'rgba(85, 167, 72, 1)',
                  }}
                  key={0}>
                  <Svg
                    width="37"
                    height="37"
                    viewBox="0 0 30 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M29.9536 1.02644C29.9393 0.771598 29.8357 0.531089 29.6624 0.350578C29.4891 0.170067 29.2581 0.0621238 29.0135 0.0472411C22.5424 -0.343399 17.3466 1.70616 15.1137 5.54484C13.6385 8.0827 13.641 11.1648 15.0937 14.1051C14.2668 15.1303 13.6625 16.3296 13.3222 17.6208L11.2881 15.4944C12.2657 13.3681 12.2282 11.1518 11.1631 9.31061C9.51279 6.47326 5.70342 4.95237 0.9739 5.24145C0.729217 5.25633 0.498299 5.36427 0.324987 5.54478C0.151675 5.72529 0.0480362 5.9658 0.0337471 6.22065C-0.245048 11.1466 1.21644 15.1142 3.94063 16.833C4.83961 17.4051 5.87264 17.7079 6.92612 17.7081C7.94866 17.6949 8.95529 17.4426 9.8716 16.9698L12.9971 20.2251V23.9583C12.9971 24.2346 13.1025 24.4995 13.29 24.6949C13.4776 24.8902 13.732 25 13.9973 25C14.2625 25 14.5169 24.8902 14.7045 24.6949C14.8921 24.4995 14.9974 24.2346 14.9974 23.9583V20.1183C14.993 18.4611 15.5344 16.8524 16.5314 15.5608C17.8178 16.261 19.2445 16.6358 20.6959 16.6546C22.0991 16.6593 23.4762 16.2601 24.6753 15.5009C28.3609 13.1779 30.3337 7.76628 29.9536 1.02644ZM4.97205 15.0517C3.05424 13.842 1.96906 10.9786 1.99532 7.291C5.53589 7.25975 8.28509 8.39391 9.44653 10.3914C10.0529 11.4331 10.1516 12.648 9.75408 13.8993L6.70233 10.7208C6.51324 10.5337 6.26145 10.4309 6.00064 10.4344C5.73984 10.4379 5.49066 10.5473 5.30623 10.7394C5.12179 10.9315 5.01671 11.1911 5.01337 11.4627C5.01003 11.7343 5.1087 11.9966 5.28835 12.1935L8.3401 15.372C7.13865 15.7861 5.97346 15.6832 4.97205 15.0517ZM23.6388 13.7209C21.9636 14.777 19.9945 14.8577 17.9942 13.9814L24.7065 6.98891C24.8862 6.79196 24.9848 6.52971 24.9815 6.25807C24.9782 5.98644 24.8731 5.7269 24.6886 5.53481C24.5042 5.34272 24.255 5.23327 23.9942 5.22979C23.7334 5.22631 23.4816 5.32909 23.2925 5.5162L16.5789 12.4995C15.7338 10.4161 15.8101 8.36396 16.829 6.6204C18.5718 3.6255 22.7049 1.95617 27.997 2.08508C28.1171 7.5957 26.5168 11.9058 23.6388 13.7209Z"
                      fill="#fff"
                    />
                  </Svg>
                </View>
              ) : (
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 20,
                    borderColor: 'transparent',
                  }}
                  key={0}>
                  <Svg
                    width="30"
                    height="25"
                    viewBox="0 0 30 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M29.9536 1.02644C29.9393 0.771598 29.8357 0.531089 29.6624 0.350578C29.4891 0.170067 29.2581 0.0621238 29.0135 0.0472411C22.5424 -0.343399 17.3466 1.70616 15.1137 5.54484C13.6385 8.0827 13.641 11.1648 15.0937 14.1051C14.2668 15.1303 13.6625 16.3296 13.3222 17.6208L11.2881 15.4944C12.2657 13.3681 12.2282 11.1518 11.1631 9.31061C9.51279 6.47326 5.70342 4.95237 0.9739 5.24145C0.729217 5.25633 0.498299 5.36427 0.324987 5.54478C0.151675 5.72529 0.0480362 5.9658 0.0337471 6.22065C-0.245048 11.1466 1.21644 15.1142 3.94063 16.833C4.83961 17.4051 5.87264 17.7079 6.92612 17.7081C7.94866 17.6949 8.95529 17.4426 9.8716 16.9698L12.9971 20.2251V23.9583C12.9971 24.2346 13.1025 24.4995 13.29 24.6949C13.4776 24.8902 13.732 25 13.9973 25C14.2625 25 14.5169 24.8902 14.7045 24.6949C14.8921 24.4995 14.9974 24.2346 14.9974 23.9583V20.1183C14.993 18.4611 15.5344 16.8524 16.5314 15.5608C17.8178 16.261 19.2445 16.6358 20.6959 16.6546C22.0991 16.6593 23.4762 16.2601 24.6753 15.5009C28.3609 13.1779 30.3337 7.76628 29.9536 1.02644ZM4.97205 15.0517C3.05424 13.842 1.96906 10.9786 1.99532 7.291C5.53589 7.25975 8.28509 8.39391 9.44653 10.3914C10.0529 11.4331 10.1516 12.648 9.75408 13.8993L6.70233 10.7208C6.51324 10.5337 6.26145 10.4309 6.00064 10.4344C5.73984 10.4379 5.49066 10.5473 5.30623 10.7394C5.12179 10.9315 5.01671 11.1911 5.01337 11.4627C5.01003 11.7343 5.1087 11.9966 5.28835 12.1935L8.3401 15.372C7.13865 15.7861 5.97346 15.6832 4.97205 15.0517ZM23.6388 13.7209C21.9636 14.777 19.9945 14.8577 17.9942 13.9814L24.7065 6.98891C24.8862 6.79196 24.9848 6.52971 24.9815 6.25807C24.9782 5.98644 24.8731 5.7269 24.6886 5.53481C24.5042 5.34272 24.255 5.23327 23.9942 5.22979C23.7334 5.22631 23.4816 5.32909 23.2925 5.5162L16.5789 12.4995C15.7338 10.4161 15.8101 8.36396 16.829 6.6204C18.5718 3.6255 22.7049 1.95617 27.997 2.08508C28.1171 7.5957 26.5168 11.9058 23.6388 13.7209Z"
                      fill="#000"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </>,
    ];
    return (
      <View style={styles.farmIconsContainer}>
        {farmIcons.map((icon, index) => (
          <View key={index}>{icon}</View>
        ))}
      </View>
    );
  };
  const [farmsData, setFarmsData] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedFarmIndex, setSelectedFarmIndex] = useState(-1);
  const [selectedCrop, setSelectedCrop] = useState({index: null, crop: null});
  const [addSelectedCrop, setAddSelectedCrop] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [cropDropdownVisible, setCropDropdownVisible] = useState(false); // State for dropdown visibility

  useEffect(() => {
    fetchFarmData();
  }, [navigation]);

  const fetchFarmData = async () => {
    try {
      const response = await get('/get-my-farms'); // Log the response data
      if (response.data.success) {
        setFarmsData(
          response.data.data.farms.map(item => {
            return {
              ...item,
              label: item?.farmName,
              value: item?.id,
              selected: false,
            };
          }),
        );
        if (response.data.data.farms[0].farmCrops.length > 0) {
          setCropData(
            response.data.data.farms[0].farmCrops.map(item => {
              return {
                ...item,
                label: item?.farmName,
                value: item?.id,
                selected: false,
              };
            }),
          );
        }
      }
    } catch (error) {
      console.error('Error fetching farm data:', error);
    }
  };

  const handleFarmSelection = (farm, index) => {
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', farm);
    setSelectedFarmIndex(index);
    if (farm.polygons.length > 0) {
      setCurrentlyAddingFarmIndex(0);
      setPolygon(prev => ({
        ...prev,
        isAddFarmPressed: false,
        farms: [{...farm, coordinates: farm.polygons, color: farm.farmColor}],
      }));
    }
    if (farm.farmCrops.length > 0) {
      setSelectedCrop({index: 0, crop: farm.farmCrops[0]});
      setCropData(
        farm.farmCrops.map(item => {
          console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDD', item);
          return {
            ...item,
            label: item.crop?.name,
            value: item.crop?.id,
            selected: false,
          };
        }),
      );
      console.log(
        'CCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
        farm.farmCrops.map(item => item.polygons),
      );
      setInnerPolygon(prev => ({
        ...prev,
        coordinates: farm.farmCrops.map(item => item.polygons),
      }));
    }
    setSelectedFarm(farm);
    setFarmsData(prevFarmsData => {
      const updatedFarmsData = prevFarmsData.map(item => ({
        ...item,
        selected: false,
      }));
      const foundIndex = updatedFarmsData.findIndex(f => f.id === farm.id);
      if (foundIndex !== -1) {
        updatedFarmsData[foundIndex] = {
          ...updatedFarmsData[foundIndex],
          selected: true,
        };
      }
      return updatedFarmsData;
    });
    setDropdownVisible(false);
    setCropDropdownVisible(false);
  };

  const handleCropSelection = (crop, i) => {
    console.log('FFFFFFFFFFFFFFFFFFF', crop.value);
    setSelectedCrop({index: i, crop: crop});
    setCropData(prevCropsData => {
      const updatedCropsData = prevCropsData.map(item => ({
        ...item,
        selected: false,
      }));
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', updatedCropsData);
      const foundIndex = updatedCropsData.findIndex(
        f => f.value === crop.value,
      );
      if (foundIndex !== -1) {
        updatedCropsData[foundIndex] = {
          ...updatedCropsData[foundIndex],
          selected: true,
        };
      }
      return updatedCropsData;
    });

    setDropdownVisible(false);
    setCropDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setCropDropdownVisible(!cropDropdownVisible);
  };

  const handleMarkerDelete = (e, i) => {
    console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJ', e.index);
    if (polygon.isAddFarmPressed || innerPolygon.isAddCropPressed) {
      if ((polygon.isAddFarmVisible, markerDelete.isModal)) {
        setPolygon(prev => ({
          ...prev,
          farms: prev.farms.map((e, i) =>
            i == currentlyAddingFarmIndex
              ? {
                  ...prev.farms?.[currentlyAddingFarmIndex],
                  coordinates: prev.farms?.[
                    currentlyAddingFarmIndex
                  ].coordinates.filter(
                    (_, index) => index !== markerDelete.index,
                  ),
                }
              : e,
          ),
        }));
        setMarkerDelete({isModal: false, index: null, event: null});
        // setInnerPolygonCoordinates(prevCoordinates => [
        //   ...prevCoordinates,
        //   newCoordinate,
        // ]);
      }
      if (innerPolygon.isAddCropVisible) {
        const parentIndex = +markerDelete.index.split(',')[0];
        const index = +markerDelete.index.split(',')[1];
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDD', parentIndex, index);
        const twoDArray = innerPolygon.coordinates.map((row, i) => {
          // If the current row is the one we want to modify
          if (i == parentIndex) {
            console.log(
              'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              row.filter((_, j) => j !== index),
            );
            // Filter out the element at colIndex
            return row.filter((_, j) => j !== index);
          }
          return row;
        });
        console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZ', twoDArray);
        console.log(
          'ZZZZZZZZZZZZZZZZZZZZZZZZZZZ :::::::: ',
          innerPolygon.coordinates,
        );
        setInnerPolygon(prev => ({...prev, coordinates: twoDArray}));
        setMarkerDelete({isModal: false, index: null, event: null});
        // setPolygonCoordinates(prevCoordinates => [
        //   ...prevCoordinates,
        //   newCoordinate,
        // ]);
      }
    }
  };

  const onPanDrag = event => {
    setMapEvent(event);
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('Map panned to: ', event.nativeEvent);
    // console.log("Map panned to 121212: ", event);
    // You can update the region state here if needed
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setIsTouching(true);
        console.log('Touch started');
      },
      onPanResponderRelease: (evt, gestureState) => {
        setIsTouching(false);
        // handleMapPress(mapEvent, true)
        console.log('Touch ended', mapEvent);
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation}
        onPanDrag={onPanDrag}
        onTouchMove={() =>
          console.log(
            'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
          )
        }
        onRegionChangeComplete={region =>
          handleMapPress({
            nativeEvent: {
              coordinate: {
                latitude: region.latitude,
                longitude: region.longitude,
              },
            },
          })
        }
        {...panResponder.panHandlers}>
        {farmsData.map(e => {
          return (
            <Polygon
              coordinates={[...e.polygons, e.polygons[0]]}
              fillColor={e.farmColor}
              strokeWidth={0}
            />
          );
        })}
        {polygon.farms
          ? polygon?.farms?.map((c, i) => {
              console.log(
                'polygons to draw',
                c,
                c.coordinates,
                c.coordinates?.length,
                !!!c.coordinates,
              );
              if (c.coordinates.length < 1) {
                return null;
              }
              console.log('drawing them');
              return (
                <Polygon
                  key={`${c.farmName}-${i}`}
                  coordinates={[...c.coordinates, c.coordinates[0]]}
                  fillColor={c.color}
                  strokeColor="#FF0000"
                  strokeWidth={1}
                />
              );
            })
          : null}
        {/* {polygon.coordinates.length > 0 && (
          <Polygon
            coordinates={[...polygon.coordinates, polygon.coordinates[0]]}
            fillColor="rgba(0, 200, 0, 0.3)"
            strokeColor="#FF0000"
            strokeWidth={1}
          />
        )} */}

        {currentlyAddingFarmIndex > -1
          ? polygon.farms?.[currentlyAddingFarmIndex]?.coordinates?.map(
              (coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  onDragEnd={e => handleMarkerDrag(e, index)}
                  draggable={true}
                  tappable={true}
                  onPress={e => {
                    setIsTouching(true);
                    setMarkerDelete({isModal: true, index: index, event: e});
                  }}
                  zIndex={9999}
                  pinColor="green"
                />
              ),
            )
          : null}

        {innerPolygon.coordinates.length > 0 &&
          innerPolygon.coordinates.map((coordinates, i) => (
            <Polygon
              coordinates={coordinates}
              fillColor="rgba(255, 230, 6, 1)"
              strokeColor="#FF0000"
              strokeWidth={selectedCrop?.index == i ? 2 : 1}
            />
          ))}

        {innerPolygon.isAddCropPressed &&
          innerPolygon.coordinates.map((polygon, index) =>
            polygon.map((coordinate, i) => (
              <Marker
                key={`${index}-${i}`}
                coordinate={coordinate}
                onDragEnd={e => handleMarkerDragInner(e, index, i)}
                draggable={true}
                tappable={true}
                onPress={e =>
                  setMarkerDelete({
                    isModal: true,
                    index: `${index},${i}`,
                    event: e,
                  })
                }
                title={`Point ${i + 1}`}
                description={`Marker at ${coordinate.latitude}, ${coordinate.longitude}`}
                pinColor="#FFE606"
              />
            )),
          )}
      </MapView>
      {(polygon.isAddFarmVisible ||
        innerPolygon.isAddCropVisible ||
        farmStep == 1) && (
        <>
          {(polygon.farms?.[currentlyAddingFarmIndex]?.coordinates?.length ??
            0) > 0 ||
          innerPolygon.coordinates.length > 0 ||
          isTouching ? (
            <View style={styles.pointerContainer}>
              <Image
                style={styles.pointer}
                source={{
                  uri: 'https://img.icons8.com/ios-filled/50/000000/marker.png',
                }}
              />
            </View>
          ) : (
            <View style={styles.pointerInner}>
              <Text style={styles.pointerText}>DRAG & DROP</Text>
              <View style={styles.textPointer} />
            </View>
          )}
        </>
      )}

      <View
        style={{
          flexDirection: 'row-reverse',
          paddingHorizontal: 25,
          overflow: 'visible',
          bottom: 130,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            ...Platform.select({
              ios: {
                shadowColor: '#000000',
                shadowOffset: {width: 4, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 19,
              },
              android: {
                elevation: 4,
              },
            }),
            borderRadius: 50,
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            overflow: 'hidden',
          }}
          onPress={() => getCurrentLocation()}>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 0,
              borderBottomWidth: 0,
              borderTopWidth: 0,
            }}
            key={0}>
            <Svg
              width="30"
              height="30"
              viewBox="0 0 27 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M13.5 17.5C14.4281 17.5 15.2229 17.1576 15.8844 16.4727C16.5459 15.7879 16.8761 14.9637 16.875 14C16.875 13.0375 16.5448 12.2138 15.8844 11.529C15.2241 10.8442 14.4292 10.5012 13.5 10.5C12.5719 10.5 11.7776 10.843 11.1173 11.529C10.4569 12.215 10.1261 13.0387 10.125 14C10.125 14.9625 10.4558 15.7867 11.1173 16.4727C11.7788 17.1588 12.573 17.5012 13.5 17.5ZM13.5 35C8.97187 31.0042 5.59013 27.293 3.35475 23.8665C1.11937 20.44 0.001125 17.2678 0 14.35C0 9.975 1.35731 6.48958 4.07194 3.89375C6.78656 1.29792 9.92925 0 13.5 0C17.0719 0 20.2151 1.29792 22.9297 3.89375C25.6444 6.48958 27.0011 9.975 27 14.35C27 17.2667 25.8823 20.4388 23.6469 23.8665C21.4116 27.2942 18.0293 31.0053 13.5 35Z"
                fill="red"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      {isBottomSheet && (
        <View style={{position: 'absolute', width: '100%', height: '20%'}}>
          <View
            style={[
              styles.selectFarmContainer,
              // { marginTop: dropdownVisible || cropDropdownVisible ? 100 : 200 },
            ]}>
            {!cropDropdownVisible && (
              <View>
                {!isAddFarmPressed ? (
                  <TouchableOpacity
                    style={styles.selectFarmButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}>
                    <Text
                      style={{
                        fontSize: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'black',
                        fontWeight: '600',
                        marginHorizontal: 30,
                      }}>
                      {selectedFarm ? selectedFarm.farmName : 'Select A Farm'}
                    </Text>
                    <View style={{width: 28}}>
                      <Svg
                        width="9"
                        height="14"
                        viewBox="0 0 9 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M1 13L7 7L0.999999 1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </Svg>
                    </View>
                  </TouchableOpacity>
                ) : null}
                {dropdownVisible && (
                  <View style={styles.dropdownContainer}>
                    <CropList
                      options={farmsData}
                      onPress={(farm, index) => {
                        handleFarmSelection(farm, index);
                      }}
                    />
                  </View>
                )}
              </View>
            )}
            <TouchableOpacity
              style={{
                width: 280,
                height: '40%',
                backgroundColor:
                  '#FFFFFF' +
                  (!(!polygon.isAddFarmPressed &&
                  polygon.farms.length < 1 &&
                  !polygon.isAddCropPressed &&
                  addCrops.length < 1 &&
                  innerPolygon.selectedCoordinates.length < 1 &&
                  !selectedFarm)
                    ? 'FF'
                    : 'AA'),
                borderRadius: 50,
                fontSize: 14,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: '600',
                color: selectedFarm ? '#000000' : 'gray',
                elevation: 4,
              }}
              onPress={() => {
                if (polygon.isAddFarmPressed) {
                  addFarms();
                } else if (innerPolygon.isAddCropPressed) {
                  navigation.navigate('FarmImageSelection');
                } else {
                  navigation.navigate('pestScreen1', {
                    farm: selectedFarm,
                    crop: selectedCrop.crop,
                  });
                }
              }}
              disabled={
                !polygon.isAddFarmPressed &&
                polygon.farms.length < 1 &&
                !polygon.isAddCropPressed &&
                addCrops.length < 1 &&
                innerPolygon.selectedCoordinates.length < 1 &&
                !selectedFarm
              }>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: selectedFarm ? '#000000' : 'gray',
                  fontWeight: '600',
                  marginHorizontal: 30,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {farmStep === 1 && (
        <View style={styles.instructionTextContainer}>
          <View style={styles.textBox}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 24,
                textAlign: 'center',
                color: '#000000',
              }}>
              Draw the location of your farm by selecting the corners of it on
              the map to continue.
            </Text>
          </View>
          <View style={{top: 180}}>
            <TouchableOpacity onPress={handleOKPress} style={styles.okButton}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#000000'}}>
                OK
              </Text>
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
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <FarmSelectionModal
          onClose={() => {
            setIsModalVisible(false);
            setInnerPolygonButtonPressed(true);
            setPolygonButtonPressed(false);
          }}
          onSubmit={addToCurrentlyAddingFarm}
          dispatch={dispatch}
          reset={cancelFarmAdd}
        />
      </Modal>
      {addCrops.length > 0 && (
        <Modal visible={cropModel} transparent={true} animationType="slide">
          <ImageBackground
            source={require('../assets/images/map-blur.png')}
            style={{flex: 1, justifyContent: 'center'}}
            blurRadius={9}>
            <View
              style={{
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {console.log('RRRRRRRRRRRRRRRRRR', farmData)}
              <View style={styles.modalContent}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.modalTitle}>
                    Select the crop that you want to draw the area of in your
                    farm
                  </Text>
                </View>
                <CropList
                  options={addCrops}
                  onPress={crop => {
                    console.log('dddddddddddddddddddddd', crop);
                    setAddSelectedCrop(crop);
                    setCropModel(false);
                    // setCropDropdownVisible(false);
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </Modal>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={markerDelete.isModal}>
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModalContent}>
            <TouchableOpacity
              style={[
                styles.confirmationOption,
                styles.bgDanger,
                styles.colorWhite,
              ]}
              onPress={handleMarkerDelete}>
              <Text style={{color: '#ffffff', fontSize: 14}}>
                Delete corner
              </Text>
            </TouchableOpacity>
            <View style={styles.blackLine} />
            <TouchableOpacity
              style={styles.confirmationOption}
              onPress={() =>
                setMarkerDelete({isModal: false, index: null, event: null})
              }>
              <Text style={{color: '#1D2324', fontSize: 14}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} animationType="slide" visible={cropAlartModal}>
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
              You are already add all crops
            </Text>
            <TouchableOpacity
              style={styles.confirmationOption}
              onPress={() => setCropAlartModal(false)}>
              <Text style={{color: '#1D2324', fontSize: 14}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ImageBackground> */}
      </Modal>

      <View style={[styles.farmIconsContainer, {zIndex: 101}]}>
        {!cropDropdownVisible && (
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              paddingHorizontal: 17,
            }}>
            {!isAddFarmPressed ? (
              <TouchableOpacity
                style={styles.addFarmButton}
                onPress={handleAddFarmPress}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    color: 'black',
                    fontWeight: '600',
                    zIndex: 100,
                    paddingRight: 45,
                  }}>
                  Add A New Farm
                </Text>
                <Svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" />
                </Svg>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        {renderFarmIcons()}
        <View />
        {innerPolygon.isAddCropPressed && !innerPolygon.isAddCropVisible && (
          <View style={{right: 60}}>
            <View style={styles.popupContainer}>
              <View style={styles.arrowContainer}>
                <View style={styles.arrow} />
              </View>
              <Text style={styles.messageText}>
                Use This Button To Tag Crop Area In The Field
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  backgroundImage: {
    // position: 'absolute',
    // top: '65%',
    // marginTop:30,
    width: '100%',
    height: '100%',
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
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 19,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pointerContainer: {
    position: 'absolute',
    top: '47%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}], // Adjust based on your pointer size
  },
  pointer: {
    width: 50, // Adjust based on your pointer size
    height: 50, // Adjust based on your pointer size
  },
  markerFixed: {
    left: '50%',
    top: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
  },
  marker: {
    height: 40,
    width: 30,
  },

  pointerInner: {
    position: 'absolute',
    top: '45%',
    left: '32%',
    transform: [{translateX: -25}, {translateY: -25}], // Adjust based on your pointer size

    backgroundColor:
      'linear-gradient(135deg, rgba(150,221,126,1) 38%, rgba(99,198,151,1) 54%)',
    borderRadius: 4,
    // padding: 12,
    width: 180, // adjust width as needed
    height: 50, // adjust width as needed
    zIndex: 1,
    flex: 1,
    justifyContent: 'end',
    alignItems: 'center',
    borderRadius: 30,
    // borderWidth: 2,
    // borderColor: 'red'
  },
  pointerText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    paddingVertical: 12,
  },
  textPointer: {
    backgroundColor:
      'linear-gradient(135deg, rgba(150,221,126,1) 38%, rgba(99,198,151,1) 54%)',
    width: 20,
    height: 20,
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    bottom: -10,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  farmIconsContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    top: 20,
    right: 3,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  farmIconContainer: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 19,
      },
      android: {
        elevation: 4,
      },
    }),
    borderRadius: 50,
    marginVertical: 5,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  selectFarmContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: -19,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectFarmButton: {
    position: 'relative',
    width: 169,
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    elevation: 4,
    flexDirection: 'row',
    // padding: 10,
    // backgroundColor: '#FFFFFF',
    // borderRadius: 15,
    // marginHorizontal: 40,
    // marginVertical: 10,
    // height: 45,
  },
  addFarmButton: {
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    height: 45,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    width: 271,
  },

  instructionTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: '100%',
    width: '100%',
    zIndex: 102,
    // lineHeight:6,
  },

  textBox: {
    borderWidth: 2,
    borderColor: '#399023',
    borderRadius: 29,
    width: '95%',
    padding: 10,
    paddingVertical: 25,
    marginTop: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 0,
  },
  dropdownScroll: {
    flex: 1,
  },
  padding: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 15,
  marginHorizontal: 40,
  marginVertical: 10,
  height: 45,

  dropdownContainer: {
    flex: 1,
    position: 'absolute',
    top: -190, // Adjust this value based on how far above you want the dropdown
    width: '80%',
    height: 180, // Height should be a normal value, adjust as needed
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    // Optional: shadow/elevation for better appearance
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownScrollContent: {
    padding: 5,
  },
  tickSymbol: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  dropdownOption: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: '#ccc',
  },

  farmName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  corp: {
    fontSize: 14,
    color: '#555',
  },
  okButton: {
    backgroundColor: '#f8f8ff',
    borderRadius: 30,
    // width:"40%",
    paddingVertical: 10,
    paddingHorizontal: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 4, height: 4},
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
    padding: 10,
    // paddingVertical: 20,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1,
    width: '85%',
  },

  arrowContainer: {
    position: 'absolute',
    top: '50%',
    right: -15,
    transform: [{translateX: -10}], // Adjust this value to align the arrow with the center
  },

  arrow: {
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    transform: [{rotate: '310deg'}], // Rotate the arrow to point in the right direction
  },

  messageText: {
    fontSize: 14,
    paddingHorizontal: 40,
    padding: 20,
    // paddingVertical:20,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 24,
    fontWeight: '400',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10, // Add padding to top and bottom
    borderRadius: 25,
    paddingHorizontal: 32,
    // elevation: 5,
    width: '90%',
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#3D4142',
    textAlign: 'center',
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
    borderRadius: 12,
    padding: 8,
    lineHeight: 24,

    elevation: 5,
    alignItems: 'center',
  },
  confirmationOption: {
    borderRadius: 8,
    margin: 6,
    padding: 10,
    color: '#ffffff',
    alignItems: 'center',
  },
  bgDanger: {
    backgroundColor: '#D92D20',
  },
  colorBlack: {
    color: '#000000',
  },
  colorWhite: {
    color: '#ffffff',
  },
});
