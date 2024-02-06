'use client'
import React, { useState } from 'react'
import { redirect } from "next/navigation"

export const UserOptions = (props: {}) => {
  const [showOptions, setShowOptions] = useState(false)

  const changeOpenStatusHandler = () => {
    setShowOptions(prev => !prev)

  }

  const logOutHandler = () => {
    console.log("log out")
    window.localStorage.removeItem("token");
    redirect("/");

  }
  return (
    <div className='p-2 cursor-pointer flex flex-col gap-4 w-36'>
      <p onClick={changeOpenStatusHandler}>Aitor Ibarra</p>
      {
        showOptions ?
          <div>
            <ul>
              <li onClick={logOutHandler}>Log out</li>
              <li>Cange password</li>
              <li>Change image</li>
            </ul>
          </div> : null
      }
    </div>
  )
}
