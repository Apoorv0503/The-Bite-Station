import {createContext} from "react";

//created one context named: UserContext
const UserContext=createContext({
    loggedInUser: "Default User",
});

export default UserContext;