import axios from "axios";
import { createContext, useState } from "react";

export let CartContext= createContext();
 let userToken =localStorage.getItem('userToken')
 let headers = {
    token : userToken
 }
 export default function CartContextProvider(props){
        function removeCart(){
          return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
          })
          .then((res)=>res)
    .catch((err)=>err)
        }
   function addToCart(productId){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
        productId
    } , {
        headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }
  function getUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
      headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }

  function removeCartItems(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
      headers
    })
    .then((res)=>res)
    .catch((err)=>err)
  }

  function updateCartItems(id , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      count
    },{
      headers
    })
  }


    return <>
    <CartContext.Provider value={{addToCart , getUserCart , removeCartItems , updateCartItems ,removeCart}}>
      {props.children} 
    </CartContext.Provider>
 </>
 }

