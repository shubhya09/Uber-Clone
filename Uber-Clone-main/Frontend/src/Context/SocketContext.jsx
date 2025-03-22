import React,{useEffect,createContext,useContext} from 'react'
import {io} from 'socket.io-client'
export const SocketContext=createContext()

export const SocketProvider=({children})=>{
    const socket=io(`${import.meta.env.VITE_BASE_URL}`)


    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('Connected to server');
        }
        )


        socket.on('disconnect',()=>{
            console.log('Disconnected from server');
        })

        //When component unmounts then automaticlly disconnects the server
        // return()=>{
        //     socket.disconnect()
        // }
    },[])



    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

// import React, { useEffect, createContext, useContext, useMemo } from 'react';
// import { io } from 'socket.io-client';

// // Create Socket Context
// export const SocketContext = createContext();

// // Socket Provider Component
// export const SocketProvider = ({ children }) => {
//   // Initialize socket only once using useMemo to prevent re-connection issues
//   const socket = useMemo(() => io(import.meta.env.VITE_BASE_URL), []);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('✅ Connected to server');
//     });

//     socket.on('disconnect', () => {
//       console.log('❌ Disconnected from server');
//     });

//     // Cleanup: Disconnect socket when component unmounts
//     return () => {
//       socket.disconnect();
//       console.log('🛑 Socket disconnected on unmount');
//     };
//   }, [socket]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// // Custom hook to use the socket context
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };
