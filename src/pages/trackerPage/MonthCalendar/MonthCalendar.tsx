'use client'
import { DayObject, generateDayObjectsForCurrentMonth } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { DaySquare } from "../DaySquare/DaySquare";
import { useEffect, useState } from "react";


interface Props {

  tasksName: String
}

export const MonthCalendar = ({ tasksName }: Props) => {
  const [daysInMonth, setdaysInMonth] = useState<DayObject[]>([]);

  const today = new Date();

  const onclickCompleteHandler = () => {

    const updatedDays = daysInMonth.map((day) => {
      if (day.day === today.getDate()) day.completed = true;
      return day
    })

    setdaysInMonth(updatedDays)
  }

  const getCompletedPercentage = (days: DayObject[]) => {

    const completed = days.reduce((prevValue, day) => {

      if (day.completed) return prevValue + 1;
      return prevValue;

    }, 0)

    return (completed / days.length).toFixed(2)
  }

  const percentage = +getCompletedPercentage(daysInMonth) * 100

  useEffect(() => {

    const daysOfTheMonth = generateDayObjectsForCurrentMonth("#ff5252")
    setdaysInMonth(daysOfTheMonth);
  }, [])

  return <div className="flex items-center h-min gap-4">
    <p>{tasksName}</p>
    <div className="flex items-center h-min">
      {
        daysInMonth.map((day) => {
          return <DaySquare key={day.day} color={day.color} day={day.day} isCompleted={day.completed} />
        })
      }
    </div>

    <p>%{percentage}</p>
    <button className="primary" onClick={onclickCompleteHandler}>!</button>
  </div>;
};
