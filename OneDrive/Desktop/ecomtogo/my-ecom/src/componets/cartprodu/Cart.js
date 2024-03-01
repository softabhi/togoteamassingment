import React, { useContext, useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { globleData } from '../../App'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Cart = ({ detFunction }) => {

    const { allCartItem } = useContext(globleData)
    //  const [cartList,setCartList] = useState(allCartItem)






    return (
        <>
            <Navbar />
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row " >
                    <div className="col-lg-2"></div>
                    <div className="col-lg-5 shadow-lg p-3 mb-5 bg-white rounded mt-5" style={{ height: "auto" }}>
                        <h2 className=' text-black'>Shopping Cart</h2>

                        {
                            allCartItem && allCartItem.map((item, index) => {
                                return (
                                    <div className="row d-flex align-items-center border-bottom border-primary border-top border-primary p-2">
                                        <div className="col-2 ">
                                            <img className='img-fluid' src={item.img} alt="" />
                                        </div>
                                        <div className="col-2">
                                            <h6>{item.name}</h6>

                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-3 decrease_btn">
                                                    <button id='decBtn' >-</button>

                                                </div>
                                                <div className="col-4 border border-primary ">
                                                    <p className='qty'>{""}</p>
                                                </div>
                                                <div className="col-3 increase_btn">
                                                    <button >+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <p>{""}</p>
                                        </div>
                                        <div className="col-2 rem_btn">
                                            <button onClick={() => detFunction(item.id)}>X</button>
                                        </div>
                                    </div>

                                )
                            })
                        }







                    </div>




                    <div className="col-lg-3 shadow-lg p-3 mb-5 bg rounded mt-5" style={{ background: "#e0e0e0", height: "auto" }}>
                        <h3 className=' text-black'>Summary</h3>

                        <div className="row mt-5">
                            <div className="col-5">
                                <h5>Items</h5>
                                <h6>{"cartItem.length"}</h6>
                            </div>
                            <div className="col-5">
                                <h6>{"totalAmount"}</h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-10 mt-3">
                                <h6>SHIPPIING PATNER</h6>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8 mt-3  text-black" >
                                <select name="" id="" style={{ width: "100%" }}>
                                    <option value="">Delhivery   $29</option>
                                    <option value="">Ekart   $329</option>
                                    <option value="">Bludart  $229</option>
                                    <option value="">E-Com   $129</option>
                                </select>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>



                        <div className="row">
                            <div className="col-10 mt-3">
                                <h6>DISCOUNT COUPON</h6>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8 mt-3" >
                                <input type="text" style={{ width: "100%" }} />
                            </div>
                            <div className="col-lg-2"></div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-5">
                                <h6>TOTAL AMOUNT</h6>
                            </div>
                            <div className="col-5">
                                <h6>$134</h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8 mt-5" >
                                <Link to="/ordersummary">
                                    <button className='btn btn-black' style={{ width: "100%" }}>CHECKOUT</button>
                                </Link>
                            </div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart
