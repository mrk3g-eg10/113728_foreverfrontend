import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)} className='text-gray-900 cursor-pointer'>

      <div className=' overflow-hidden'>
        <img className='product-image hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>

      <p className='pt-3 pb-1 text-sm text-gray-900'>{name}</p>
      <p className='text-sm font-medium text-gray-900'>{currency}{price}</p>
      
    </Link>
  )
}

export default ProductItem
