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

const AIDropDown = ({ navigation, btnTitle, options, selectedOption = 0, setSelectedOption }) => {

    return (
        <View style={{ zIndex: 2000 }}>
            <View style={styles.openBox}>
                <View style={{ alignItems: "flex-start", marginBottom: 20, marginTop: 0, }}>
                    <Text style={{ fontWeight: "700", fontSize: 20, color: "#000", }}>Bugs detected by AI ✨</Text>
                </View>
                <ScrollView nestedScrollEnabled={true}>
                    {options?.map((item, i) => (
                        <TouchableOpacity onPress={() => {
                            setSelectedOption(i)
                        }} style={{ width: "100%", marginVertical: 10, flexDirection: "row", height: 52, justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                {/* <View style={{ height: 5, alignSelf: "center", width: 5, borderRadius: 20, backgroundColor: "#000" }}></View> */}
                                <View >
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "600" }}>"class_id": {item},</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "600" }}>"class_name": "{item}"", </Text>
                                    <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: "600" }}>"confidence": {item},</Text>
                                </View>
                            </View>
                            <View style={{ height: 30, width: 30, borderRadius: 20, borderWidth: 1, justifyContent: "center", borderColor: "#000" }}>
                                {selectedOption == i &&
                                    <View style={{ height: 14, width: 14, alignSelf: "center", borderRadius: 20, backgroundColor: "#000" }}></View>}
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>

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

export default AIDropDown;
