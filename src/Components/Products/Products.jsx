import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dataBase } from '../../Configuration/Firebase';
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch , useSelector } from "react-redux";
const Products = ({Items,cartData,setCartData}) => {

  const userId = useSelector((state)=>state.auth.userId)

  const x = async  (USERID,ITEMID) => {
    const q = query(collection(dataBase, "Users"), where("userID", "==", String(USERID)));
    const querySnapshot = await getDocs(q);

  let filteredData = querySnapshot.docs.map( (doc) =>({
    ...doc.data() ,
    id : doc.id
   }))

  y(filteredData[0]?.id , ITEMID ,filteredData[0]?.userCart)
  } 
  
  const y = async (reference,ITEMID,cart) =>{
    const Ref = doc(dataBase, "Users", reference);

  const a = [...cart] ;
  if( !a.includes(ITEMID) )
  {
    a.push(ITEMID) ;
  }
  
  
    await updateDoc(Ref, {
    userCart: a  
  });
  
  
  }
  
  
  
  
 



  const handleAddToCart = (id,
    category,
    title,
    imgSrc,
    amazonLink,
    description,
    price) =>{

      const newObj = {
       id,
          category,
          title,
          imgSrc,
          amazonLink,
          description,
          price
      }

      // console.log(newObj,"newObj") ;
      setCartData([...cartData,newObj]) ;
      toast.success('🦄 Product Added To Cart !', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });

  }
 
  return (
    <div className="conatiner">
      <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
/>
      <div className="row my-4 mx-4 d-flex justify-content-around ">
        {Items.map((item) => (

        
          
            <div class="card product  col-md-3 m-2 p-5" style={{  height: "40rem" , width:"30%"}}>
              <Link  to={`/product/${item?.id}`} key={item?.id} className= "  text-decoration-none">
              <img
                src={item?.imgSrc}
                class="card-img-top"
                alt={item?.description}
              />
              </Link>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{item?.title}</h5>
                <p class="card-text">{item?.description}</p>
                <a href="#" class="btn btn-primary my-2">
                  {item?.price} ₹
                </a>
                {
console.log(userId) 
                }
                
                <a href="#" class="btn btn-warning"
                onClick={()=>x(userId,item.id)
                  
                  
                  
                  // handleAddToCart(item.id , item.category , item.title,item.imgSrc , item.amazonLink,item.description,item.price)
                }
                
                >
                  Add To Cart
                </a>
              </div>
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default Products;
