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

const DropDown = ({ navigation, btnTitle }) => {
    // const navigation = useNavigation();
    const refRBSheet = useRef();
    const [openDrop, setOpenDrop] = useState(false)
    return (
        <View style={{ zIndex: 2000 }}>

            <TouchableOpacity onPress={() => setOpenDrop(!openDrop)} style={[styles.btn]}>

                <Text style={{ fontWeight: "300", marginLeft: 10, fontSize: 16, color: "#000" }}>{btnTitle}</Text>
                {openDrop ?
                    <Svg style={{ marginTop: 8 }} width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.42871 1.4978L11.3889 8.25357L20.3491 1.49224" stroke="#363B3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                    : <Svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.00025 19.8298L8.76833 10.8789L2.01934 1.90944" stroke="#363B3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>}


            </TouchableOpacity>
            {openDrop &&
                <View style={styles.openBox}>
                    <ScrollView nestedScrollEnabled={true}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
                            <TouchableOpacity style={{ width: "100%", marginVertical: 10, flexDirection: "row", height: 22, justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ height: 5, alignSelf: "center", width: 5, borderRadius: 20, backgroundColor: "#000" }}></View>
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "600" }}>hello</Text>
                                </View>
                                <View style={{ height: 30, width: 30, borderRadius: 20, borderWidth: 1, justifyContent: "center", borderColor: "#000" }}>
                                    {i == 0 &&
                                        <View style={{ height: 14, width: 14, alignSelf: "center", borderRadius: 20, backgroundColor: "#000" }}></View>}
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({

    btn: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: "center",
        marginTop: 12,
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "85%",
        borderColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    openBox: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 2,
        height: 300,
        zIndex: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "85%",
        borderColor: "#FFFFFF",
    }

});

export default DropDown;
