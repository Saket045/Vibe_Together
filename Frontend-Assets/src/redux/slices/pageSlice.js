import { createSlice } from "@reduxjs/toolkit";

const pageSlice=createSlice({
    name:'page',
    initialState:{
        title:"",
        show:false,
    },
    reducers:{
        setPage:(state,action)=>{
            state.title=action.payload;
        },
        setShow:(state,action)=>{
            state.show=action.payload;
        }
    }
})

export const {setPage,setShow}=pageSlice.actions;
export default pageSlice.reducer;