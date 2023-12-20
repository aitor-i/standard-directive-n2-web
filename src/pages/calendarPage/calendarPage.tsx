"use client";
import DayCalendar from "@/components/DayCalendar/DayCalendar";
import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
import TaskLists from "@/components/TaskLists/TaskLists";
import { HoursContextProvider } from "@/contexts/hoursContext/hoursContext";
import React from "react";

export default function calendarPage() {
  const dateString = new Date().toDateString();
  return (
    <main className="h-full flex flex-col">
      <div
        key="header"
        className="flex justify-around border-b-2 border-stdSlateGray w-full pb-4 pt-2"
      >
        <p>{dateString}</p>
        <NavigationMenu />
      </div>
      <HoursContextProvider>
        <div key="body" className="flex flex-1">
          <div className="border-r-2 border-stdSlateGray main flex">
            <TaskLists />
          </div>
          <div className="secondary">
            <DayCalendar />
          </div>
        </div>
      </HoursContextProvider>
    </main>
  );
}
