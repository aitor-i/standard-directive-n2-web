"use client";
import React from "react";
import BatchTaskList from "./BatchTaskList/BatchTaskList";
import DailyTaskList from "./DailyTaskList/DailyTaskList";
import { TasksContextProvider } from "@/contexts/hoursContext/tasksContext";

export default function TaskLists() {
  return (
    <div className="flex flex-1">
      <TasksContextProvider>

        <DailyTaskList />
        <BatchTaskList />
      </TasksContextProvider>
    </div>
  );
}
