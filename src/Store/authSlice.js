import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:"auth",
    initialState:{
        status:false,
        userdata:null
    },
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userdata=action.payload;
        },
        logout:(state)=>{
            state.status=false;
            state.userdata=null;
        }
    }
})
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;