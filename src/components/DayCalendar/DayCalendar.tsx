"use client";
import React, { useContext } from "react";
import HourSlot from "./HourSlot/HourSlot";
import { HoursContext } from "@/contexts/hoursContext/hoursContext";

const getDateStrings = (isEditMode: boolean) => {

  const currentDate = new Date();
  const today = new Date().toUTCString().split(" ");

  const tomorrowDate: Date = new Date(currentDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  if (!isEditMode) {

    const day = today[1];
    const month = today[2];
    const weekDay = today[0];
    return { day, month, weekDay }
  }

  const tomorrow = tomorrowDate.toUTCString().split(" ");

  const day = tomorrow[1];
  const month = tomorrow[2];
  const weekDay = tomorrow[0];
  return { day, month, weekDay };

}

export default function DayCalendar() {
  const { hours, isEditMode } = useContext(HoursContext);
  const { day, month, weekDay } = getDateStrings(isEditMode);
  const hoursInADay = hours;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center w-full border-b-2 border-stdSlateGray p-2 ">
        <div className={isEditMode ? "text-red-700" : ""} >
          <p className="text-xl text-stdSteelBlue">{month}</p>
          <p className="text-xl">
            {day} {weekDay}
          </p>
        </div>
      </div>
      <div className="flex flex-col  p-2  flex-1">
        {hoursInADay.map((hour) => {
          return (
            <HourSlot
              isCompleted={hour.isCompleted ?? false}
              key={hour.hour}
              timeDisplay={hour.hourDisplay}
              eventName={hour.eventName}
              color={hour.color}
              eventPosition={hour.eventPosition}
            />
          );
        })}
      </div>
    </div>
  );
}
