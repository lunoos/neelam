import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ProductsScreen from './screens/ProductsScreen'
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import FilterScreen from './screens/FilterScreen';
import SuccessScreen from './screens/SuccessScreen';
import { useSelector,useDispatch } from 'react-redux';
import { signout } from './actions/userActions';


function App() {

  window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
  const dispatch = useDispatch();

  
  const userSignin = useSelector(state=>state.userSignin);

   const { userInfo } = userSignin;

   const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

   const handleLogout = () =>{
      
      dispatch(signout());
  }

  const  myFunction = () => {
  document.getElementById("myDropdown").classList.toggle("show");
  }
  const openMenu =() =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
          </button>
          <Link to="/">Neelam</Link>
        </div>
        <div className="header-links">
          <Link to="/cart">Cart({cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)})</Link>
          {
            userInfo ? <div className="dropdown">
                <button onClick={myFunction} className="dropbtn">{userInfo.name}</button>
                <div id="myDropdown" className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link  to="/signin" onClick={() => handleLogout()}>Log out</Link>
                </div>
              </div>:
            <Link to="/signin">Sign In</Link>
          }
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>X</button>
        <ul>
          <li>
            <Link to="/filter/pants">Pants</Link> 
          </li>
          <li>
            <Link to="/filter/shirts">Shirts</Link>
          </li>
        </ul>
      </aside>
      <main className ="main">
        <div className="content">
        <Route path="/products" component={ ProductsScreen }/>
        <Route path="/profile" component={ ProfileScreen }/>
        <Route path="/filter/:id" component={ FilterScreen }/>
        <Route path="/shipping" component={ ShippingScreen }/>
        <Route path="/payment" component={ PaymentScreen }/>
        <Route path="/placeorder" component={ PlaceOrderScreen }/>
        <Route path="/success"   component={SuccessScreen}/>
        <Route path="/signin" component={ SigninScreen }/>
        <Route path="/register" component={ RegisterScreen }/>
        <Route path="/product/:id" component={ProductScreen}/>
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/" exact={true} component={HomeScreen}/>
    
        </div>
      </main>
      <footer className="footer">
        All right reserved.
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
