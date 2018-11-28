import Command from './Commands';

module.exports = class Kodi {
    constructor(host, port){
        this.host = host;
        this.port = port;

        fetch('http://localhost:8080/')        
    }

    sendRequest(params){
        const url = this.getUrl() + '?request=' + JSON.stringify(params);
        return fetch(url);
    }

    // http://A:B@localhost:9510/jsonrpc?request={"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1}
    getUrl(){
        return `http://${this.host}:${this.port}/jsonrpc`
    }
}