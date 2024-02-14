'use client'
import { DayObject } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { DaySquare } from "../DaySquare/DaySquare";


interface Props {

  tasksName: String
  days: DayObject[]
  trackId: string
  onCompleteClick: (trackId: string) => void
  onDelete: (trackId: string) => void

}


export const MonthCalendar = ({ tasksName, days, trackId, onCompleteClick, onDelete }: Props) => {

  const getCompletedPercentage = (days: DayObject[]) => {
    const completed = days.reduce((prevValue, day) => {
      if (day.completed) return prevValue + 1;
      return prevValue;
    }, 0)
    return (completed / days.length).toFixed(2)
  }

  const percentage = +getCompletedPercentage(days) * 100

  return <div className="flex w-screen justify-between pl-4 pr-4 items-center h-min gap-4">
    <p className="w-44">{tasksName}</p>
    <div className="flex items-center h-min">
      {
        days.map((day) => {
          return <DaySquare key={day.day} color={day.color} day={day.day} isCompleted={day.completed} />
        })
      }
    </div>

    <p className="w-16">%{percentage}</p>
    <button className="primary" onClick={() => onCompleteClick(trackId)}>!</button>
    <button className="danger" onClick={() => onDelete(trackId)}>!</button>
  </div >;
};
