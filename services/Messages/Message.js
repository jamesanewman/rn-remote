import { ToastAndroid } from "react-native";

function textMessage(msg, duration){
    duration = (duration === undefined) ? ToastAndroid.SHORT : duration;
    ToastAndroid.show(msg, duration);
}

module.exports = {
    textMessage
}