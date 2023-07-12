import React from 'react'
import { Link } from 'react-router-dom'
import { BsChevronLeft } from 'react-icons/bs'

export default function GoBackBtn() {
  return (
    <Link to='/' className='btn btn-light my-3 inline-block'>
      <span className='d-flex align-items-center'>
        <BsChevronLeft />
        <span className='ms-1'>
          Go Back
        </span>
      </span>
    </Link>
  )
}
