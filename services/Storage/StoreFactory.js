import Store from './Store';

console.log("Store -> ", Store);
const stores = {};
module.exports = {
    getStore: function(storeName){
        if(!stores.hasOwnProperty(storeName)){
            stores[storeName] = new Store(storeName);
        }
        return stores[storeName];
    }
}