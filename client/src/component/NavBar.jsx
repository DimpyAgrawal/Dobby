import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  const [openOptionMobile, setOpenOptionMobile] = useState(false);
  const isLogin = localStorage.getItem('loggedin');
  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);
  return (
    <>


      <div className='flex w-full h-[8vh] bg-gray-700 text-white justify-end'>
        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-4 mr-[2%] mt-3'>
          {console.log(isLogin)}
          {isLogin ? (
            <>
           
            <NavLink to='/home'>Upload Image</NavLink>
            <NavLink to='/profile'>All Images</NavLink>
            {/* <NavLink to='/createPost'>CreatePost</NavLink> */}
            <div onClick={() => { localStorage.clear(); navigate('/signin'); }}>Logout</div>
            </>
          ) : (
            <>
            <NavLink to='/signin'>LogIn</NavLink>
            <NavLink to='/signup'>SignUp</NavLink>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden mt-4 mr-[2%]'>
          {openOptionMobile ? (
            <div>
              <span onClick={() => setOpenOptionMobile(false)} className="material-symbols-outlined">
                Close
              </span>
              <div className='flex  m-auto flex-col text-black bg-white mt-[5%]  w-[30vw]  p-[8%] text-xl pl-[30%]'>
                <NavLink to='/home'>Upload Image</NavLink>
                <NavLink to='/profile'>All Images</NavLink>
                {/* <NavLink to='/createPost'>CreatePost</NavLink> */}
                <NavLink to='/signin'>LogIn</NavLink>
                <NavLink to='/signup'>SignUp</NavLink>
              </div>
            </div>
          ) : (
            <span onClick={() => setOpenOptionMobile(true)} className="material-symbols-outlined">
              Menu
            </span>
          )}
        </div>
      </div>





    </>
  )
}
