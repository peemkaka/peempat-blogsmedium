import React from 'react'
import { FaRegComment } from 'react-icons/fa'

function Comment() {
  return (
    <button className='flex items-center gap-1 text-sm py-[0.5rem]'>
      <FaRegComment className='text-xl'/>
      <span>1</span>
    </button>
  )
}

export default Comment
