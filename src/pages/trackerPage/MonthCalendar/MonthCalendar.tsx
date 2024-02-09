'use client'
import { DayObject } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { DaySquare } from "../DaySquare/DaySquare";


interface Props {

  tasksName: String
  days: DayObject[]
  trackId: string
  onCompleteClicl: (trackId: string) => void

}

export const MonthCalendar = ({ tasksName, days, trackId, onCompleteClicl }: Props) => {

  const getCompletedPercentage = (days: DayObject[]) => {
    const completed = days.reduce((prevValue, day) => {
      if (day.completed) return prevValue + 1;
      return prevValue;
    }, 0)
    return (completed / days.length).toFixed(2)
  }

  const percentage = +getCompletedPercentage(days) * 100

  return <div className="flex items-center h-min gap-4">
    <p>{tasksName}</p>
    <div className="flex items-center h-min">
      {
        days.map((day) => {
          return <DaySquare key={day.day} color={day.color} day={day.day} isCompleted={day.completed} />
        })
      }
    </div>

    <p>%{percentage}</p>
    <p>{trackId}</p>
    <button className="primary" onClick={() => onCompleteClicl(trackId)}>!</button>
  </div>;
};
