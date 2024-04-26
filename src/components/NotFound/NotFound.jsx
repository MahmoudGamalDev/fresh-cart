import React from 'react'
import img from '../../assets/imgs/error.svg'

export default function NotFound() {
  return (
    <div className='py-4 text-center'>
    <img src={img} alt="page not found" />
    </div>
  )
}
