import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import '../index.css' // Ensure the CSS file is imported

const Navbar = () => {

    const [visible, setVisble] = useState(false)
    const { getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();
  
    return (
        <div className='navbar-container text-white w-full'>
            <div className='flex items-center justify-between py-5 font-medium max-w-screen-xl mx-auto px-0'>
            
            <div className='flex items-center gap-4 ml-[-70px]'>
                <img src={assets.logo1} alt="logo1" className='w-12 h-12' />
                <div className='prata-regular text-xl sm:py-1 lg:text-2xl leading-relaxed'>
                    AL-CHE PASTRY
                </div>
            </div>
            
                <ul className='hidden sm:flex gap-24 text-sm'>
                    <NavLink to="/" className='flex flex-col items-center gap-1 text-white home'>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px]' />
                    </NavLink>
                    <NavLink to='/shop' className='flex flex-col items-center gap-1 text-white'>
                        <p>SHOP</p>
                        <hr className='w-2/4 border-none h-[1.5px]' />
                    </NavLink>
                    <NavLink to='/decorate' className='flex flex-col items-center gap-1 text-white'>
                        <p>DECORATE</p>
                        <hr className='w-2/4 border-none h-[1.5px]' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1 text-white'>
                        <p>ABOUT US</p>
                        <hr className='w-2/4 border-none h-[1.5px]' />
                    </NavLink>
                </ul>

            {/* Login and Icons */}
                <div className='flex items-center gap-6'>
             <NavLink to='/login' className='flex flex-col items-center gap-1 text-white'>
                <p>LOGIN</p>
                <hr className='w-2/4 border-none h-[1.5px]' />
            </NavLink>
            <div className='group relative'>
                <img onClick={() => { navigate('/login') }} className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />

                        {/* Dropdown Menu */}
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => { }} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => { }} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                    <Link to='/cart' className='relative'>
                        <img className='w-5 min-w-5' src={assets.cart_icon} alt="Cart" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                    </Link>
                    <img onClick={() => setVisble(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" />
                </div>
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisble(false)} className='flex items-center gap-4 p-3 '>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisble(false)} to="/" className='py-2 pl-6 '>HOME</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/shop' className='py-2 pl-6'>SHOP</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/decorate' className='py-2 pl-6'>DECORATE</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/about' className='py-2 pl-6'>ABOUT US</NavLink>
                    <NavLink onClick={() => setVisble(false)} to='/login' className='py-2 pl-6'>LOGIN</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar