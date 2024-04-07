import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId : null ,
  userAuthStatus : false ,
  cartData :[]

  
} ;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     logIn : (state,action) =>{
       state.userAuthStatus = true ;
       state.userId = action.payload ;
     } ,

     logOut: (state)=>{
      state.userAuthStatus = false;
      state.userId = null ;
     } ,



     
  },
})

// Action creators are generated for each case reducer function
export const { logIn,logOut } = authSlice.actions

export default authSlice.reducer