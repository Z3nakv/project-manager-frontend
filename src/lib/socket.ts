import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

export const socket = io(SOCKET_URL, {
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
});