import Store from './Store';

const stores = {};
export const StoreFactory = {
    getStore: function(storeName){
        if(!stores.hasOwnProperty(storeName)){
            stores[storeName] = new Store(storeName);
        }
        return stores[storeName];
    }
}