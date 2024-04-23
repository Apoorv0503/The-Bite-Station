import { createSlice } from "@reduxjs/toolkit"


const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    // reducers will update the "items" state according to the actions(addItem, removeItem ) they are attached to.
    reducers:{
        // this reducer is basically a callback function which will have access to the certain things like state/action
        addItem:(state, action)=>{
            state.items.push(action.payload);
        },
        removeItems:(state, action)=>{
            state.items.pop();
        },
       clearCart:(state, action)=>{
            //other methods are also there to empty the "items" state 
            // return { items: [] };
/*
            but we can not do: state: [], we  need to mutate the state directly here, and immer will take care of the mutation
            basically when we are directly changing the state, we are actually making the change to a rough draft of state created by the immer,
            finally this immer will compare the changed between the actual state and the draft and will create a new state from it(which is immutable), in this way
            we are allowed to change the state direclty and still having the benefit of immutable state by immer.
*/
            state.items.length=0;
        },

    }
})

// now, we need to export theses actions, and reducers to avail these in our app.

export const {addItem, removeItems, clearCart}= cartSlice.actions;
export default cartSlice.reducer;