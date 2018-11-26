// Expectation that this will be a wrapper around
// https://facebook.github.io/react-native/docs/asyncstorage
// Store search options not results
import { AsyncStorage } from "react-native";

export default class Store {
    constructor(prefix = 'global-store'){
        this.prefix = prefix;
    }

    getKey(key){   
        return this.prefix + key;
    }

    async getItem(key){
        key = this.getKey(key);
        return await AsyncStorage.getItem(key);

    }

    async setItem(key, value){
        key = this.getKey(key);
        await AsyncStorage.setItem(key, value);
    }

    setItems(srcObject){
        srcObject.keys().forEach(key => {
            let storeKey = this.getKey(key);
            this.setItem(storeKey, srcObject[key]);
        });
    }
    async removeItem(key){
        key = getKey(key);
        await AsyncStorage.removeItem(key);
    }

}