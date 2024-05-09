import React, { useContext, useRef, useState } from 'react'
import './userprofile.css'
import { globleData } from '../../App';
// import '../cssComp/UserProfi.css'
import use from '../../data/images/use.jpg'
// import { BASE_URL } from '../helpers/backedurl';


const UserProfile = ({ logout }) => {
    const [open, setOpen] = useState(false);
    const [profileImg, setProfileImg] = useState();
    const {logedUser} = useContext(globleData)
// console.log(open)

    // const menuItem = ["Name", "Num"];

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click', (e)=>{
    if(e.target !== menuRef.current  && e.target !== imgRef.current){
        setOpen(false)
    };
      
    })

// const logoutFuc = ()=>{
//     console.log("object")
//     logout()
// }

         console.log(logedUser[0].userImg)


    return (
        <div className='logout me-4'>
            <div className=''>
           
                <img 
                ref={imgRef}
                src={`http://localhost:8081/` + logedUser[0].userImg} 
                alt="" 
                className='pictu ms' 
                onClick={ () => setOpen(!open)}
                />
                 
             </div>
           
                {
                    open && (
                        <div ref={menuRef} className="menus bg-white px-5 py-3 border border-secondary rounded">
                          {<div >
                            <h4 className='text-dark'>{logedUser[0].name}</h4>
                          </div>}
                           
                            {/* {
                                menuItem.map((item) => (
                                    <ul>
                                        <li className='text-dark'>{item}</li>
                                    </ul>
                                ))
                               
                            } */}
                             <div className="logout-btn">
                                    <button className='btn btn-success' onClick={()=>logout()} >Logout</button>
                            </div>
                        </div>
                    )
                }

        </div>
    )
}

export default UserProfile