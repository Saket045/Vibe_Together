/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const authSlice= createSlice({
    name: 'auth',
    initialState:{
        loading:false,
        isLoggedIn:false,
        user:{
            username:"",
            fullname:"",
            email:"",
            password:"",
            phonenumber:""
        }
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        login:(state,action)=>{
            state.isLoggedIn=true
        },
        logout:(state,action)=>{
            state.isLoggedIn=false
        }
        }
})

export const {setLoading,setUser,login,logout}=authSlice.actions;
export default authSlice.reducer;