import React, { useEffect } from 'react'
import Products from "../Products/Products"
import Items from '../DATA/Items'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
const SearchItems = () => {

  const {term} = useParams() ;
  const [ searchedProducts , setSearchedProducts ] = useState([]) ;

  useEffect( ()=>{
     
    const filterData = () =>{

     const data = Items.filter( (p)=> p.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())) ;
     setSearchedProducts(data) ;

    }

    filterData() ;

  } , [term] ) ;

 
  return (
    <div>
     <Products Items={searchedProducts}></Products>
    </div>
  )
}

export default SearchItems
