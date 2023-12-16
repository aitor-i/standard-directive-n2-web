import React from "react";
import HourSlot from "./HourSlot/HourSlot";

export default function DayCalendar() {
  const today = new Date().toUTCString().split(" ");
  const day = today[1];
  const month = today[2];
  const weekDay = today[0];
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center w-full border-b-2 border-stdSlateGray p-2 ">
        <div className="">
          <p className="text-xl text-stdSteelBlue">{month}</p>
          <p className="text-xl">
            {day} {weekDay}
          </p>
        </div>
      </div>
      <div className="flex flex-col  p-2  flex-1">
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
        <HourSlot />
      </div>
    </div>
  );
}
