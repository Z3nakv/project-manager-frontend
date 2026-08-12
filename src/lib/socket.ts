import { io } from "socket.io-client";

export const socket = io('https://tree-work-backend.onrender.com', {
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
});