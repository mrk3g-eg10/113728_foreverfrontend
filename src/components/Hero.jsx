import React from 'react'
import { assets } from '../assets/assets'
import '../index.css'

const Hero = () => {
    return (
        <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
            <div className='flex flex-col sm:flex-row hero-gradient-bg'>

            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#2a2929] text-center'>
                    <div className='flex items-center justify-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#2a2929]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#2a2929]'></p>
                    </div>

                    <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-relaxed'>CAKES FOR ALL OCCASIONS</h1>

                    <div className='flex items-center justify-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#2a2929]'></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Side */}
            <img className='w-full sm:w-1/2 hero-image' src={assets.heroCake} alt="" />
        </div>
    </div>
    )
}

export default Hero
