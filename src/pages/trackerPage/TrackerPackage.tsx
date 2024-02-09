'use client'
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { UserOptions } from '@/components/UserOptions/UserOptions'
import React, { useState } from 'react'
import { MonthCalendar } from './MonthCalendar/MonthCalendar';
import { DayObject, generateDayObjectsForCurrentMonth } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { generateRandomID } from '@/application/generateRandomId/generateRandomId';


interface TrackerObject {
  title: String,
  id: string,
  days: DayObject[]
}

export default function TrackerPackage() {
  const [trackers, setTrackers] = useState<TrackerObject[]>([])

  const onSubmitNewTrackerHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get('title')?.valueOf() ?? ''
    const color = formData.get('color')?.valueOf() ?? 'red'

    const days = generateDayObjectsForCurrentMonth(color.toString())
    const id = generateRandomID();
    const tracker: TrackerObject = {
      title: title?.toString(),
      id,
      days
    }

    setTrackers(trackers => [...trackers, tracker])
  }

  const onCompletedCkickHandler = (trackId: string) => {
    debugger

    const updatedDays: DayObject[] = trackers.filter(track => track.id === trackId)[0].days.map((day) => {
      const today = new Date()
      if (day.day === today.getDate()) day.completed = true;
      return day
    })

    const updatedTrackers: TrackerObject[] = trackers.map((tracker) => {
      if (tracker.id === trackId) tracker.days = updatedDays;
      return tracker
    })

    setTrackers(updatedTrackers)

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
        {trackers.map(track => <MonthCalendar trackId={track.id} tasksName={track.title} onCompleteClicl={onCompletedCkickHandler} key={track.id} days={track.days} />)}
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
