// https://kodi.wiki/view/JSON-RPC_API/Examples
import * as R from 'ramda';

function getActivePlayers(id = 1){
    return {"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": id}
}

function pausePlay(id = 1, playerId = 0){
    return {"jsonrpc": "2.0", "method": "Player.PlayPause", "params": { "playerid": playerId }, "id": id}
}

function input(id = 1, direction = 'Select'){
    let command = {id: 1, jsonrpc: "2.0" };
    let dir = R.head(direction).toUpperCase() + R.tail(direction);
    command.method = `Input.${dir}`;
    return command;
}

function sendText(id = 1, text = '', done = true){
    return {"jsonrpc": "2.0", "id": id, method: "Player.SendText", item: {	text: text, done: done }};
}

function sendToPlayer(id = 1, link ){
    return {id: id, jsonrpc: "2.0", method: "Player.Open", params: {item: {file: link }}};
}

module.exports = {
    getActivePlayers,
    pausePlay,
    input,
    sendText,
    sendToPlayer
}