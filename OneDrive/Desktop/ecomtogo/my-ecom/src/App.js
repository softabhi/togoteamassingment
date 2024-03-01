

import productList from './data/productList.js'
import Home from './componets/home/Home';
import { Routes, Route } from 'react-router-dom'
import ProductDet from './componets/productdetailspage/ProductDet.js';
import { createContext, useEffect, useState } from 'react';
import Login from './componets/login/Login.js';
import Navbar from './componets/navbar/Navbar.js';
import Registration from './componets/registration.js/Registration.js';
import Cart from './componets/cartprodu/Cart.js';



export const globleData = createContext();

function App() {

const [cartItem,setCartItem] = useState();
const [allCartItem,setAllCartItem] = useState([]);
const [productView,setproductView] = useState();
const [searchItem,setSearchItem] = useState(productList)
const [logedUser, setLogedUser] = useState();

console.log(logedUser)
console.log(cartItem)

const loginFun = (results)=>{
  setLogedUser(results)
}

const setCart=(id)=>{
  console.log(id)
  setCartItem(id)
}

const logout = ()=>{
  setLogedUser("")
}

useEffect(()=>{
  if(cartItem){
    setAllCartItem([...allCartItem,cartItem])
  }
  
},[cartItem])
console.log(allCartItem)



const detFunction = (index) => {
  let newlist = allCartItem.filter((it, ind) => {
      return index !== it.id;
  })
  setAllCartItem(newlist)
  alert('your cart item deleted')
}


const productViewFuc = (id)=>{
  setproductView(id)
  console.log(productView)
}


  return (
    <>
      <globleData.Provider value={{searchItem ,cartItem ,productView ,allCartItem,logedUser}}>
        <Routes>
          <Route path='/' element={<Home  productview={productViewFuc} setSearchItem={setSearchItem} logout={logout}/>} />
          <Route path='/produtDetails' element={<ProductDet setcartitem={setCart}/>} />
          <Route path='/cart' element={<Cart detFunction={detFunction}/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/login' element={<Login setLogedUser={loginFun}/>} />
        </Routes>
      </globleData.Provider>
    </>
  );
}

export default App;
