import React from 'react'
import question from '../qm.png'
export default function Notfound() {
  return (
    <div className='text-center my-5'>
    <div className='d-flex justify-content-center align-items-center py-5'>
      <img src={question} alt="" className='w-50' />
    </div>
    <h2>Sorry! Page not found.</h2>
     </div>
  )
}
