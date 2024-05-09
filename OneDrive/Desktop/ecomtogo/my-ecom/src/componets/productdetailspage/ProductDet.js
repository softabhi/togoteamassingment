
import { AiFillStar } from 'react-icons/ai'
import { IoIosStarHalf } from 'react-icons/io'
import itemList from '../../data/productList.js'
import { useState, useContext, useEffect } from 'react'
import { globleData } from '../../App'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar.js'
import Footer from '../footer/Footer.js'



export default function ProductDet({ setcartitem }) {

    const [currentCart, setCurrentCart] = useState("");
    const [items, setItems] = useState([]);
    // const [addCartitem, setAddCartItem] = useState();

    const { productView } = useContext(globleData)

    // console.log(productView)

    // console.log(itemList)





    // console.log(currentItem)



    useEffect(() => {
        let currentItem = itemList.filter((item) => {
            // 
            return item.id === productView;
        })
        setCurrentCart(currentItem)
        // console.log(currentItem)
        //   currentItem()
    }, [productView])


    // console.log(addCartitem)
    const addCartFun = (item) => {

        setcartitem(item)
        alert("cart item added")


    }

    // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(items));
    // }, [items]);

    // console.log(items)

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">

                    {
                        currentCart && currentCart.map((item) => {

                            return (
                                <>

                                    <div className="col-lg-5 d-flex flex-column justify-content-around mt-5 mb-5">
                                        <img src={item.img} className="img-fluid" id='main-img' style={{ width: "35rem", height: "30rem" }} alt="" />
                                        <div className="row mt-2">
                                            <div className="col-3">
                                                <img src={item.img} className="img-fluid small-img" alt="" />
                                            </div>
                                            <div className="col-3">
                                                <img src={item.img} className="img-fluid small-img" alt="" />
                                            </div>
                                            <div className="col-3">
                                                <img src={item.img} className="img-fluid small-img" alt="" />
                                            </div>
                                            <div className="col-3">
                                                <img src={item.img} className="img-fluid small-img" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 text-black mt-lg-5">
                                        <div className="row mt-lg-5">
                                            <div className="row">

                                                <h2 className='fw-bold'>{item.name}</h2>
                                                <h4>$139</h4>
                                            </div>

                                            <div>
                                                <select name="" id="" style={{ width: "5rem" }}>
                                                    <option value="">Size</option>
                                                    <option value="">XL</option>
                                                    <option value="">XXL</option>
                                                    <option value="">Small</option>
                                                    <option value="">Large</option>
                                                </select>
                                            </div>


                                            <div>
                                                <select name="" id="" style={{ width: "2rem" }} >
                                                    {/* <option value=""></option> */}
                                                    <option value="">1</option>
                                                    <option value="">2</option>
                                                    <option value="">3</option>
                                                    <option value="">4</option>
                                                </select>


                                            </div>

                                            <div className="d-flex">
                                                <h4><AiFillStar /></h4>
                                                <h4><AiFillStar /></h4>
                                                <h4><AiFillStar /></h4>
                                                <h4><AiFillStar /></h4>
                                                <h4><IoIosStarHalf /></h4>
                                            </div>

                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6 m-3">
                                                    <button className='btn btn-success m-2'>Buy Now</button>
                                                    <Link to='/cart'>
                                                        <button className='btn btn-primary m-2' onClick={() => addCartFun(item)}>Add Cart</button>
                                                    </Link>
                                                </div>
                                                <div className="col-3"></div>

                                            </div>

                                            <div className="row ">
                                                <p>
                                                    This is the front page of the Simple English Wikipedia.
                                                    Wikipedias are places where people work together to write encyclopedias in different languages.
                                                    We use Simple English words and grammar here.
                                                    The Simple English Wikipedia is for everyone!
                                                    That includes children and adults who are learning English.
                                                    are 224,347 articles on the Simple English Wikipedia.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}
