import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
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
      <div key="body" className="flex flex-1">
        <div className="border-r-2 border-stdSlateGray main">Tasks</div>
        <div className="secondary">Calendar</div>
      </div>
    </main>
  );
}