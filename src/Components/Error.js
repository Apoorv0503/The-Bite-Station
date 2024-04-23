import React from "react";
import { useRouteError } from "react-router-dom";

const Error=()=>{

const err=useRouteError();
// console.log(err);
    return (
        <div>
            <h1>Oops!!!!</h1>
            <h2>Somthing went wrong</h2>
            <h3>
                {err.status} - {err.error.message}
            </h3>
        </div>
    );
}

export default Error;