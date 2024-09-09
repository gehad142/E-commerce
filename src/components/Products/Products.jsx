import React, { useContext } from "react";
import styles from './Products.module.css'
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let {addToCart}= useContext(CartContext)
    async function postCart(productId){
        let {data} = await  addToCart(productId)
        if (data.status=="success"){
         toast.success('added successfully to your cart' , {
            duration: 5000,
         })
        }
     }

    function getProducts(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
   let {data , isLoading , isFetching , isError} = useQuery('getProducts' , getProducts , {
       refetchOnMount:false
   })

          
  return <>
  {isLoading? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
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
   </div>:""}
   <div className="row gap-5 g-3 mt-2">
   {data?.data.data.map((pro)=>(
   
     < div key={pro.id} className="col-md-2 py-3 product">
        < Link to={`/productDetails/${pro.id}`}>
      <img src={pro.imageCover} className="w-100" height={250} alt={pro.description} />
      <h3 className="h6 text-main ">{pro.category.name}</h3>
        <h5 className="mb-4">{pro.title.split(' ').slice(0,2).join(" ")}</h5>
        <div className="d-flex justify-content-between ">
         <span>{pro.price} EGP</span>
         <span><i className="fas fa-star rating-color"></i>{pro.ratingsAverage}</span>
        </div>
      </Link>
      <button onClick={()=>postCart(pro.id)} className="btn bg-main w-100 text-white mt-1">Add TO Cart</button>
     </div>
     
   ))}
 </div>
      
  </>
}
