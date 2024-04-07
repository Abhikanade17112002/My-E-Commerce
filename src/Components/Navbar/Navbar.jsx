import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Items from '../DATA/Items'
import { useState } from 'react'
import { useSelector , useDispatch} from "react-redux"
import { getAuth, signOut } from "firebase/auth";
import {logOut} from "../../../Store/authSlice/authSlice" 
import { useNavigate } from 'react-router-dom'
const Navbar = ({setData,cartData}) => {
 
  const navigate = useNavigate()
  const [ searchTerm , setSearchTerm ] = useState("") ;
  const dispatch = useDispatch() ;
  const authStatus = useSelector((state)=>state.auth.userAuthStatus) ;
  // console.log(authStatus,"authStatus") ;


  const handleLogIn = () =>{
      navigate("/sign-in") ;
  }
  const handleLogOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
          dispatch(logOut()) ;
          navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log("Sign Out ERROR :: " ,error) ;
    });
  }

const handleSearchItem = (e) =>{
    e.preventDefault() ; 
    navigate(`/search/${searchTerm}`) ;
}
  const handleFilterByCaregory = (category) =>{
    const filterteredData = Items.filter((p)=>p.category == category) ;
    setData(filterteredData) ;
  } ;


  const handleFilterByPrice =(price) =>{
    const filterteredData = Items.filter((p)=>p.price >= price) ;
    setData(filterteredData) ;
  } ;


  useEffect(()=>{},[authStatus])
  return (
  <>
                <nav class="navbar bg-body-tertiary">
                   
                    <div class="d-flex justify-content-around w-100">
                       
                        <Link class="navbar-brand font-weight-bold " to={"/"} >E-kart</Link>
                        <form class="d-flex" role="search"
                        onSubmit={(e)=>handleSearchItem(e)}
                        >
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        
                 {
                     ! authStatus ?   <button type='button' className='btn btn-primary'
                     onClick={()=>handleLogIn()}
                     >
                    Sign  In 
                    </button> : null 
                 }
                        

                            
                        
                        {
                             authStatus ? <button type='button' className='btn btn-warning'
                             onClick={()=>handleLogOut()}
                             >
                             Log Out 
                           </button> : null 
                        }

{
                             !authStatus ? <button type='button' className='btn btn-warning'
                             onClick={()=>navigate("/sign-up")}
                             >
                             Sign Up 
                           </button> : null 
                        }
                       
                            
                        
                        
                     

                        <button type="button" class="btn btn-primary position-relative" onClick={()=>
                        {
                          navigate("/cart")
                        }
                          
                          }>
                    Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                       {cartData?.length}
                      
                    </span>
                    </button>
                    </div>
            </nav>
            <ul class="nav nav-pills nav-fill bg-secondary bg-gradient">
                <li class="nav-item">
                <a class="nav-link text-white " aria-current="page" href="#">Filter By</a>
                </li>
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="#" 
              onClick={()=>setData(Items)}
              >No Filter</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByCaregory("mobiles")}
              
              >Mobiles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByCaregory("laptops")}
              >Laptops</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByCaregory("tablets")}
              >Tablets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByPrice(29999)}
              
              >{">="}29999</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByPrice(49999)}
              >{">="}49999</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#"
              onClick={()=>handleFilterByPrice(69999)}
              >{">="}69999</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white " href="#" tabindex="-1" aria-disabled="true"
              
              onClick={()=>handleFilterByPrice(89999)}
              >{">="}89999</a>
            </li>
          </ul>
          </>
   
  )
}

export default Navbar
