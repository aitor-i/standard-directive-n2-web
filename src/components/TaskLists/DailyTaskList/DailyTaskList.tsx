"use client";

import {
  CalendarHour,
  EventColor,
} from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { setEventInCalendar } from "@/application/setEventInCalendar/setEventInCalendar";
import {
  HoursContext,
  SetEventInCalendarContextProps,
} from "@/contexts/hoursContext/hoursContext";
import { ColorKeys, colors } from "@/domain/colors/colors";
import React, { ReactEventHandler, useContext, useRef, useState } from "react";
import TaskLists from "../TaskLists";
import DailyTasksListItem from "./DailyTaskListItem/DailyTasksListItem";
import { DailyTaskListModal } from "./DailyTaskListModal/DailyTaskListModal";

export default function DailyTaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableEndHours, setAvailableEndOurs] = useState<CalendarHour[]>([]);
  const { hours, onSetHours } = useContext(HoursContext);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const freeHours = hours.filter((hour) => !hour.color);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const startTime = formData.get("start-time");
    const endTime = formData.get("end-time");
    const taskName = formData.get("task-name");
    const color = formData.get("color")! as string;

    let colorValue = color as ColorKeys;

    const setEventProps: SetEventInCalendarContextProps = {
      color: colors[colorValue],
      eventName: taskName as string,
      timeStart: parseInt(startTime as string),
      timeEnd: parseInt(endTime as string),
    };
    const taskId = parseInt((Math.random() * 100000).toFixed());

    const updatedHours = setEventInCalendar({
      hours,
      taskId,
      ...setEventProps,
    });
    if (taskName) {
      onSetHours(updatedHours);
      event.currentTarget.reset();
      dialogCloseHandler();
    }
  };

  const onSelectHandler = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const option = event.currentTarget.value;
    const nextTasks = hours.filter(
      (hour) => hour.hour > parseInt(option) && hour.color
    );

    const nextTaskTime = nextTasks[0]?.hour ?? 25;

    const filteredEndHours = hours.filter(
      (hour) =>
        !hour.color && hour.hour >= parseInt(option) && hour.hour < nextTaskTime
    );

    setAvailableEndOurs(filteredEndHours);
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const dialogCloseHandler = () => {
    dialogRef.current?.close();
  };

  const dialogOpenHandler = () => {
    dialogRef.current?.showModal();
  };

  const onBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    dialogCloseHandler();
  };

  const dailyTasks = hours.filter((hour) => hour.eventName);
  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Daily Tasks</h3>
      <button onClick={() => dialogOpenHandler()} className="primary">
        {" "}
        +{" "}
      </button>

      <dialog
        className="w-1/2 rounded"
        ref={dialogRef}
        onClick={onBackdropClick}
      >
        <DailyTaskListModal
          availableEndHours={availableEndHours}
          freeHours={freeHours}
          onSelect={onSelectHandler}
          onSubmit={onSubmitHandler}
          onDismiss={() => {
            dialogCloseHandler();
          }}
        />
      </dialog>

      {dailyTasks.map((task) => (
        <DailyTasksListItem
          key={task.taskId}
          isCompleted={task.isCompleted ?? false}
          taskId={task.taskId!}
          taskName={task.eventName}
        />
      ))}
    </div>
  );
}
