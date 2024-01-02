import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native';
import CustomComponent from '../component/customComponent';
const FarmSelectionModal = ({
    visible,
    onFarmFieldSelect,
    onFarmNameChange,
    onSubmit,
    onClose,
}) => {
    const [selectedFarmField, setSelectedFarmField] = useState('Farm 1');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [cropOptions, setCropOptions] = useState([
        { label: 'Rice', value: 'Rice', selected: false },
        { label: 'Corn', value: 'Corn', selected: false },
        { label: 'Wheat', value: 'Wheat', selected: false },
        { label: 'Pulses', value: 'Pulses', selected: false },
        { label: 'Sugar', value: 'Sugar', selected: false },
    ]);

    const handleFarmFieldChange = (farmField) => {
        setSelectedFarmField(farmField);
        onFarmFieldSelect(farmField);
    };

    const handleCropOptionSelect = (index) => {
        const updatedCrops = cropOptions.map((crop, i) => ({
            ...crop,
            selected: i === index ? !crop.selected : crop.selected,
        }));
        setCropOptions(updatedCrops);
    };
    const handleContinue = () => {
        setShowConfirmation(true);
    };

    const handleYes = () => {
        setShowConfirmation(false);
        onClose()
    };

    const handleNo = () => {
        setShowConfirmation(false);
    };
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <ImageBackground
                source={require('../../assets/images/image145.png')}
                style={styles.imageBackground}
                blurRadius={5}
            >
                <View style={styles.topContainer}>
                    <Text style={styles.modalTitle}>Name for the farm</Text>
                    <CustomComponent>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Farm 01"
                            keyboardType="default"
                        />
                    </CustomComponent>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select the Crops of the farm</Text>
                        <FlatList
                            data={cropOptions}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => handleCropOptionSelect(index)}
                                >
                                    <Text>{item.label}</Text>
                                    <View style={styles.checkbox}>
                                        {item.selected && <Text>✔</Text>}
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ width: '60%' }}>
                        <TouchableOpacity onPress={handleContinue}
                            style={{ top: 80, paddingVertical: 10, backgroundColor: 'white', borderRadius: 30, alignItems: 'center' }}
                        >
                            <Text style={{ fontSize: 16, color: 'black' }}>Continue</Text></TouchableOpacity>
                    </View>
                </View>
                <ConfirmationModal
                    visible={showConfirmation}
                    onYes={handleYes}
                    onNo={handleNo}
                  
                />
            </ImageBackground>
        </Modal>
    );
};
const ConfirmationModal = ({ visible, onYes, onNo }) => {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={() => { }}
        >
            <ImageBackground
                source={require('../../assets/images/image145.png')}
                style={styles.imageBackground1}
                blurRadius={8} 
            >
                <View style={styles.confirmationModalContainer}>
                    <View style={styles.confirmationModalContent}>
                        <Text style={styles.modalTitle}>Do you want to draw the area of the crops in your farm?</Text>
                        <TouchableOpacity style={styles.confirmationOption} onPress={onYes}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <View style={styles.blackLine} />
                        <TouchableOpacity style={styles.confirmationOption} onPress={onNo}>
                            <Text>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
};
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    imageBackground1: {
        flex: 1,
    },
    topContainer: {
        justifyContent: 'flex-end',
        padding: 30,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        // fontWeight: 'bold',
        marginBottom: 10,
    },

    textInput: {
        borderColor: '#ccc',
        padding: 8,
        left: 15,
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginVertical: 5,
        paddingRight: 20, 
    },
    checkbox: {
        width: 20,
        height: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    confirmationModalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        alignItems: 'center',
    },
    confirmationOption: {
        padding: 10,
    },
    blackLine: {
        height: 1,
        backgroundColor: 'black',
        width: '80%',
        marginVertical: 10,
    },
});

export default FarmSelectionModal;
