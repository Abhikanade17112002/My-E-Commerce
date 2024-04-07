import { useState } from 'react'
import Items from './Components/DATA/Items'
import {  useDispatch } from 'react-redux'
import { logIn,logOut } from '../Store/authSlice/authSlice.jsx'
import Footer from './Components/Footer/Footer'
import { BrowserRouter , Route ,Routes } from 'react-router-dom'
import Products from "./Components/Products/Products"
import './App.css'
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx"
import SearchItems from "./Components/SearchItems/SearchItems.jsx"
import Cart from "./Components/Cart/Cart.jsx"
import Navbar from './Components/Navbar/Navbar'
import SignUp from './Components/SignUp/SignUp.jsx'
import SignIn from './Components/SignIn/SignIn.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";





function App() {
const dispatch = useDispatch() ;
 const [ data , setData ] = useState(Items) ;
 const [ cartData , setCartData ] = useState([]) ;







 





 
 const auth = getAuth();
 onAuthStateChanged(auth, (user) => {
   if (user) {
 
    dispatch(logIn(user.uid)) ;
    console.log(user.uid,"USERUSER") ;
   } else {
    dispatch(logOut()) ;
   }
 });

 
  return (
    <>

   
    <BrowserRouter>
      <Navbar cartData={cartData} setData={setData}></Navbar>
      <Routes>
     
          <Route path="/" element={<Products Items={data}
          cartData={cartData} 
          setCartData={setCartData}
          ></Products >}></Route>
          <Route  path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
          <Route path='/search/:term' element={<SearchItems></SearchItems>}></Route>
          <Route path='/cart' element={<Cart
          setCartData={setCartData}
          cartData={cartData}></Cart>}></Route>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
      </Routes>
      <Footer></Footer>
      
      </BrowserRouter>


      
      
    </>
  )
}

export default App
