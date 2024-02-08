'use client'
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { UserOptions } from '@/components/UserOptions/UserOptions'
import React from 'react'
import { MonthCalendar } from './MonthCalendar/MonthCalendar';

export default function TrackerPackage() {

  const onSubmitNewTrackerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('title')?.valueOf()
    const color = formData.get('color')?.valueOf() ?? 'red'


    console.log(title, color)

  }

  const dateString = new Date().toDateString();
  return (
    <main className="h-full flex flex-col">
      <div
        key="header"
        className="flex justify-around border-b-2 border-stdSlateGray w-full pb-4 pt-2"
      >
        <p>{dateString}</p>
        <NavigationMenu />
        <div className="absolute right-2">
          <UserOptions />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <MonthCalendar tasksName='Node' />
        <MonthCalendar tasksName='React' />
        <MonthCalendar tasksName='Rust' />
      </div>

      <h5>Add tracker</h5>
      <form className='flex ' onSubmit={onSubmitNewTrackerHandler}>
        <input type="text" name="title" placeholder='Enter title' required />
        <select name='color'>
          <option value={'red'}>Red</option>
          <option value={'green'}>Green</option>
        </select>
        <div>
          <button className='primary' type='submit' >Add</button>
        </div>
      </form>
    </main>
  )
}
