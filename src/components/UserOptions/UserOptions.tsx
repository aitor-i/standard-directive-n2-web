import React from 'react'

export const UserOptions = (props: {}) => {
  return (
    <div className='bg-white debug p-2 flex flex-col gap-4'>
      <div className='debug w-24 h-24 self-center rounded-full flex justify-center align-middle '>Foto</div>
      <div>
        <ul>
          <li>Log out</li>
          <li>Cange password</li>
          <li>Change image</li>
        </ul>
      </div>
    </div>
  )
}
