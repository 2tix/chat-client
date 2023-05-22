import {io} from "socket.io-client";
import {messagesStore} from "./store.js";
// we import the socket.io client

let socket;
let you = "";
// we will use this for all our communication with the server
export const connect = () => {
    socket = io("ws://chat-server-l4z7.onrender.com/");
    // we connect to the server (replace with your own server adress)
    socket.on("you", res => {
        you = res;
    });
    // we get the name of the user from the server
    socket.on("messages", res => {
        messagesStore.set(res.map(message => {
            if(message.author === you) {
                return {
                    ...message,
                    author: "you"
                };
            } else {
                return message;
            }
        }));
    });
};
// this function will be called when the app starts

export const sendMessage = message => {
    socket.emit("sendMessage", {
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
};
// this function will be called when the user sends a message
