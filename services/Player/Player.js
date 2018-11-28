import Kodi from './Kodi';
import Command from './Commands';

export default class Player {

    constructor(kodiIP, kodiPort){
        this.kodi = new Kodi(kodiIP, kodiPort);
        this._id = 1;
    }

    get id(){
        return this._id++;
    }

    set id(value){
        this._id = value;
    }

    playVideo(url){
        // Convert to JSON RPC parameters
        const playVideo = Command.sendToPlayer(1, url);
        console.log("Play Video Command -> " + JSON.stringify(playVideo));
        const response = this.kodi.sendRequest(playVideo);
        return response
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                return res;
            });

    }
} 