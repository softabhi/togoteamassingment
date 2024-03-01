import React, { useContext } from 'react'
// import '../Style.css';
import './product.css'

import itemList from '../../data/productList.js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { BsStarFill, BsStarHalf, BsHeart, BsShare } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { globleData } from '../../App.js'

const Product = ({ productview }) => {

    const { searchItem } = useContext(globleData)

    const addcart = (id) => {
        productview(id)
        console.log(id)
    }


    return (
        <>
            <div className="container card_container my-4">
                <div className="row ">


                    {searchItem && searchItem.map((item, index) => {
                        return (
                            <div key={index} className="col-6 col-lg-3 mt-3 cart_item">
                                <div className="card p-2" style={{ width: "" }}>
                                    <div className='top_heading'>
                                        <h5 className="card-title text-size">{item.name} </h5>
                                        <BsHeart id='heart' />
                                        <BsShare id='share' />
                                    </div>

                                    <Link to='/produtDetails'>
                                        <img src={item.img} className="img-fluid card-img" alt="..." style={{ height: "y" }} onClick={() => addcart(item.id)} />
                                    </Link>
                                    <div className="card-body card-main">

                                        <h6 className='text-size'><span className='text-success '>Off By:</span>{item.disc}</h6>
                                        <h6 id='rating'>
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarHalf />
                                        </h6>
                                        <div className="action-btn">
                                            <Link to='/produtDetails'>
                                                <button onClick={() => addcart(item.id)} className='btn btn-primary me-2'>Buy Now</button>
                                            </Link>

                                            {/* <button className='btn btn-primary'>Go More</button> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>

    )
}

export default Product