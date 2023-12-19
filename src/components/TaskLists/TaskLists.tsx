"use client";
import React from "react";
import BatchTaskList from "./BatchTaskList/BatchTaskList";
import DailyTaskList from "./DailyTaskList/DailyTaskList";

export default function TaskLists() {
  return (
    <div className="flex flex-1">
      <DailyTaskList />
      <BatchTaskList />
    </div>
  );
}
