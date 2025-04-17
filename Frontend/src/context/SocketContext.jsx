import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const  SocketContext = createContext();
const url = "http://localhost:3000"
const socket = io(`${url}`);
const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;