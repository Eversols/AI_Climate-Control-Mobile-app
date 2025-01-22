import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (value) => {
    if (value != null) {
        try {
            // await AsyncStorage.clear()
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('token', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {

        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}





export const storeBio = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            console.log("vvvvvvvvv", await AsyncStorage.setItem('biometric', jsonValue)
            )
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('biometric')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetBioMetric = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('biometric')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}




export const storeFurniture = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('furniture', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('furniture')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetFurniture = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('furniture')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}





export const storeDescription = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('description', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('description')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetDescription = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('description')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}



export const storeTruckDetails = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('truckDetails', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('truckDetails')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetTruckDetails = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('truckDetails')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}





export const storePrice = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('price', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('price')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetPrice = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('price')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}








export const storeDateTime = async (value) => {
    if (value != null) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('dateTime', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await AsyncStorage.removeItem('dateTime')
        } catch (e) {
            console.log(e)
        }
    }
}


export const GetDateTime = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('dateTime')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}