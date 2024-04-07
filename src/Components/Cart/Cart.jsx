import React, { useEffect } from 'react'
import Products from '../Products/Products'
import { collection, query, where, getDocs } from "firebase/firestore";
import { dataBase } from '../../Configuration/Firebase';
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import Items from '../DATA/Items';
const Cart = ({cartData ,setCartData}) => {

  console.log(typeof cartData,cartData,"CART")
  const temp = [...cartData] ;
  
  const userId = useSelector((state)=>state.auth.userId)
 useEffect(()=>{
  

  const x = async  () => {
    const q = query(collection(dataBase, "Users"), where("userID", "==", String(userId)));
    const querySnapshot = await getDocs(q);

  let filteredData = querySnapshot.docs.map( (doc) =>({
    ...doc.data() ,
    id : doc.id
   }))

  setCartData([...filteredData[0]?.userCart]) ;
  } 

  x() ;

 },[])
  
  
  


  const handleEmptyCart = () =>{
    setCartData([]) ;
  }
  return  cartData.length === 0 ? <div class="alert alert-primary text-center h-100 w-100 " role="alert">
  Cart Is Empty
</div>
  :
  
  (
    <div>

      {
        Items.map((product)=> temp.includes(product.id) ?   <div className="container my-5">
        <div class="card mb-3 ">
          <div class="row g-0 justify-content-around">
            <div class="col-md-5">
              <img
                src={product?.imgSrc}
                class="img-fluid rounded-start w-100"
                alt="..."
                style={{ maxHeight: "280px" }}
              />
            </div>
            <div class="col-md-5">
              <div class="card-body d-flex h-100 flex-column justify-content-center align-items-center">
                <h5 class="card-title py-5">{product?.title}</h5>
                <div className="buttons py-5 d-flex w-100 justify-content-around">
                  <button type="button " className="btn btn-warning w-25 ">
                    {product?.price}₹
                  </button>
                  <button type="button" className="btn btn-primary  w-25">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>: null )
      }
      
      <div className='cartButtons d-flex justify-content-around'>
         <button type='button' className='btn btn-primary'>
           Purchase Cart
         </button>
         <button type='button' className='btn btn-warning' onClick={()=>handleEmptyCart()}>
           Clear Cart 
         </button>

      </div>
    </div>
  )
}

export default Cart
