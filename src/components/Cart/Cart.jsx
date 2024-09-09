import React, { useContext, useEffect, useState } from "react";
import styles from './Cart.module.css'
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
export default function Cart() {
 const [details, setDetails] = useState(null)
 const [Loading, setLoding] = useState(true)
 let {getUserCart , removeCartItems , updateCartItems , removeCart}=  useContext(CartContext)

 async function deleteCart(){
  let {data} =await removeCart()
  if(data?.message=="success"){
    setDetails(null);
    console.log(data);
    
  }
 }
 async function updateCart(id , count){
  let {data}= await updateCartItems(id , count)
  if(data?.status =='success'){
    setDetails(data)
    
  }
 }
   async function removeItems(id){
    let {data} = await removeCartItems(id)
    if(data?.status =='success'){
      setDetails(data)
      console.log(data);
    }
   }
   async function getCart(){
      let {data} = await getUserCart()
      setDetails(data);
      setLoding(false)
    }
  useEffect(()=>{
              getCart()
  } , [])
  return <>
  {Loading?
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
 /></div>
 :""}
 
    {details?    <div className="bg-main-light mt-5 p-4">
        <h2>Shop Cart :</h2>
        <h3 className="h6  text-main">Cart Items : {details.numOfCartItems}</h3>
        <h3 className="h6 text-main">Total Cart Price : {details.data.totalCartPrice} EGP </h3>
             {details?.data.products.map((pro)=>(
              <div className="row border-bottom mt-3 mb-3" key={pro._id}>
                <div className="col-md-1">
                  <div>
                  <img src={pro.product.imageCover} className="w-100" alt="" />
                </div>
                </div>
                <div className="col-md-11">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                         <h4 className="h6">{pro.product.title.split(" ").slice(0,4).join(" ")}</h4>
                          <h6 className="text-main">Price : {pro.price}</h6>
                          <button onClick={()=>removeItems(pro.product._id)} className="btn p-0 "><i className="fas fa-trash-can text-main"></i> Remove</button>
                         </div>
                         <div>
                             <div>
                              <button onClick={()=>updateCart(pro.product._id ,pro.count+1 )} className="btn main-border p-1 px-2 me-2">+</button>
                              <span>{pro.count}</span>
                              <button onClick={()=>updateCart(pro.product._id ,pro.count-1 )} className="btn main-border p-1 px-2 ms-2">-</button>
                              </div>
                         </div>
                         </div>
                  </div></div>
              
            ))}   
            <div className="d-flex justify-content-center align-items-center">
            <button onClick={()=>deleteCart()} className="p-0 btn"><i className="fas fa-trash-can text-main"></i> Remove Cart</button>      
        </div> </div>

           :  <div className="bg-main-light mt-5 p-4">
           <h2>Shop Cart :</h2>
           <h3 className="h6  text-main">Cart Items : 0</h3>
           <h3 className="h6 text-main">Total Cart Price : 0 EGP </h3>
                 
               </div>}
         
  </>
  
}
