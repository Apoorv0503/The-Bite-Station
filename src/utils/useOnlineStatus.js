import React, { useState } from "react";

//always think about the contract of the custom hook, before building it
//contract --> what input will it take/ what output will it give.
const useOnlineStatus=()=>{
    const[onlineStatus, setOnlineStatus]= useState(true);

    window.addEventListener("offline",()=>{
        setOnlineStatus(false);
    });

    window.addEventListener("online",()=>{
        setOnlineStatus(true);
    });

    return onlineStatus;

}

export default useOnlineStatus;