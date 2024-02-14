'use client'
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { UserOptions } from '@/components/UserOptions/UserOptions'
import React, { useEffect, useState } from 'react'
import { MonthCalendar } from './MonthCalendar/MonthCalendar';
import { DayObject, generateDayObjectsForCurrentMonth } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { generateRandomID } from '@/application/generateRandomId/generateRandomId';
import { colors } from "@/domain/colors/colors";
import { FetchParams, useFetch } from '@/hooks/useFetch/useFeltch';
import { redirect } from "next/navigation"
import { ApiResponse } from '@/domain/models/ApiResponse';


export interface TrackerObject {
  title: string,
  id: string,
  days: DayObject[]
}


interface SaveTrackersBody {

  trackers: TrackerObject[],
  token: string
}

export default function TrackerPackage() {
  const [trackers, setTrackers] = useState<TrackerObject[]>([])
  const { fetcher: poster, response: postResponse, fetchingStatus: postingStatus } = useFetch<ApiResponse>();
  const { fetcher, response, responseObject } = useFetch<ApiResponse>()
  const { fetcher: deleter, response: deleteResponse, responseObject: deleteResponseObject } = useFetch<ApiResponse>()
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const saveTrackersHander = (token: string, trackers: TrackerObject[]) => {

    const body: SaveTrackersBody = {
      trackers,
      token
    }

    const url = new URL(`${baseUrl}/trackers/save-trackers`)
    const fetchParams: FetchParams = {
      url: url.toString(),
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body
    }

    poster(fetchParams)
  }

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

  const deleteTracker = async (id: string) => {

    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");

    const url = new URL(`${baseUrl}/trackers/delete-trackers`)
    url.searchParams.append("id", id);
    url.searchParams.append("token", token);

    const fetchParams: FetchParams = {
      url: url.toString(),
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    }
    await deleter(fetchParams)
    setTrackers(response?.trackers ?? [])

  }


  const onCompletedCkickHandler = (trackId: string) => {
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

    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");
    saveTrackersHander(token, trackers)

  }

  const getTracker = async () => {

    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");

    const url = new URL(`${baseUrl}/trackers/get-trackers`)
    url.searchParams.append("token", token);

    const fetchParams: FetchParams = {
      url: url.toString(),
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    await fetcher(fetchParams)
    setTrackers(response?.trackers ?? [])

  }

  useEffect(() => {
    if (response?.trackers) {
      setTrackers(response.trackers)
    }
  }, [response])

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");
    saveTrackersHander(token, trackers)

    getTracker()
  }, [])

  const dateString = new Date().toDateString();
  return (
    <main className="h-full flex flex-col">
      <div
        key="header"
        className="flex justify-around border-b-2 border-stdSlateGray  w-full pb-4 pt-2"
      >
        <p>{dateString}</p>
        <NavigationMenu />
        <div className="absolute right-2">
          <UserOptions />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        {trackers.map(track => <MonthCalendar trackId={track.id} tasksName={track.title} onDelete={deleteTracker} onCompleteClick={onCompletedCkickHandler} key={track.id} days={track.days} />)}

        <div className='self-center'>
          <h5>Add tracker</h5>
          <form className='flex' onSubmit={onSubmitNewTrackerHandler}>
            <input type="text" name="title" placeholder='Enter title' required />
            <select name='color'>
              {Object.keys(colors).map((colorName) => (
                <option key={colorName} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
            <div>
              <button className='primary' type='submit' >Add</button>
            </div>
          </form>
        </div>
      </div>

    </main>
  )
}
