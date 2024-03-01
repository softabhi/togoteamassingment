import React from 'react'

import Product from '../products/Product'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

const Home = ({productview,setSearchItem,logout}) => {

  return (
    <>
     <Navbar setSearchItem={setSearchItem} logout={logout}/>
     <Product productview={productview}/>
     <Footer/>
    </>
  )
}

export default Home
