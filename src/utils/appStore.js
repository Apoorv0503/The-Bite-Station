import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore=configureStore({
//this is the personal reducer of our store it will be containing several small reducers (binded to the different kind of actions) of cart slice
    reducer:{
        cart:cartReducer,
    },
});

export default appStore;