import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Items from "../DATA/Items";
import Products from "../Products/Products";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [sameCategoryProducts , setSameCategoryProducts] = useState([]) ;
  useEffect(() => {
    const filterteredProduct = Items.filter((product) => product.id == id);
   const sameCategory = Items.filter((p)=>p.category == product.category) ;
   setSameCategoryProducts(sameCategory) ;

    setProduct(filterteredProduct[0]);
  }, [id ,product?.category]);


  return (
    <>
      <div className="container my-5">
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
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="related-products">
        
        <Products Items={sameCategoryProducts}>

        </Products>
      </div>
    </>
  );
};

export default ProductDetails;
