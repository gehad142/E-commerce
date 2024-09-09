import React, { useContext } from "react";
import styles from './Navbar.module.css'
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/UserToken";

export default function Navbar() {
  let navigate=useNavigate();
  let{userToken} = useContext(UserToken);
  let{setUserToken}=useContext(UserToken);
  function logOut(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login')
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand fw-bold " to={'/'}> <i className="fas fa-cart-shopping text-main"></i> FreshCart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
     
      {userToken?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'cart'}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'brands'}>Brands</Link>
        </li>
      
        </ul>:""}

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         <li className="nav-item d-flex align-items-center">
       <i className="fab fa-facebook mx-1"></i>
       <i className="fab fa-youtube mx-1"></i>
       <i className="fab fa-instagram mx-1"></i>
       <i className="fab fa-twitter mx-1"></i>
       <i className="fab fa-tiktok mx-1"></i>
         </li>
         {userToken?<>
         <li className="nav-item">
         <span onClick={()=>logOut()} className="nav-link cursor-pointer">Logout</span>
       </li>
       <li className="nav-item">
       <Link className="nav-link" to={'/userUpdates'}>
        <div className="user ms-1">
        <i className="fa-solid fa-user"></i>
        </div>
        </Link>
       
     </li></>
         :<> <li>
        <Link className="nav-link" to={'login'}>Login</Link>
          </li>
          <li className="nav-item">
          
          <Link className="nav-link" to={'register'}>Register</Link>
        </li> </>
}
        </ul>
      


       
    </div>
  </div>
</nav>
  </>
}
