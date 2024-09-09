import React, { useContext, useEffect } from "react";
import styles from './FeaturedProducts.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function FeaturedProducts() {
   let {addToCart}= useContext(CartContext)
    async function postCart(productId){
        let {data} = await  addToCart(productId)
        if (data.status=="success"){
         toast.success('added successfully to your cart' , {
            duration: 5000,
         })
        }
     }

  function getFeaturedProducts (){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
 }

 let {data , isLoading , isFetching , isError} = useQuery('FeaturedProducts' , getFeaturedProducts , {
  refetchOnMount:false,
 })


  return <>
    {isLoading?<>
   <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
   <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
   </div>
    </>:""}
    <div className="row g-5 mt-5">
      {data?.data.data.map((product)=>(
               <div key={product.id} className="col-md-2 mb-3 product py-2">
                <Link to={`productDetails/${product.id}`}>
                <img src={product.imageCover} className="w-100 mb-5"  alt={product.description} height={250}/>
         <h3 className="h6 text-main">{product.category.name}</h3>
         <h5 className="mb-4">{product.title.split(' ').slice(0,2).join(" ")}</h5>
         <div className="d-flex justify-content-between ">
          <span>{product.price} EGP</span>
          <span><i className="fas fa-star rating-color"></i>{product.ratingsAverage}</span>
         </div>
         </Link>
         <button onClick={()=>postCart(product.id)} className="btn bg-main w-100 text-white mt-1">Add TO Cart</button>
               </div>
      )
      )}
         </div>



  </>
}
