"use client";
import React from "react";
import BatchTaskList from "./BatchTaskList/BatchTaskList";

export default function TaskLists() {
  return (
    <div className="flex flex-1">
      <BatchTaskList />
      <BatchTaskList />
    </div>
  );
}
