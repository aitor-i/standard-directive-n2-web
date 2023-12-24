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
import React, { ReactEventHandler, useContext, useState } from "react";

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
    if (taskName) onSetHours(updatedHours);
    event.currentTarget.reset();
  };

  const onSelectHandler = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const option = event.currentTarget.value;
    const filteredEndHours = hours.filter(
      (hour) => !hour.color && hour.hour > parseInt(option)
    );

    setAvailableEndOurs(filteredEndHours);
  };

  const dailyTasks = hours.filter((hour) => hour.eventName);
  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Daily Tasks</h3>
      <button onClick={() => openModalHandler()} className="primary">
        {" "}
        +{" "}
      </button>
      {isModalOpen ? (
        <div className="border rounded p-4">
          <h4 className="text-xl mb-4 font-medium">Add a tasks</h4>
          <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
            <section>
              <label htmlFor="">Task Name</label>
              <input type="text" name="task-name" />
            </section>
            <section className="flex flex-col">
              <label htmlFor="">Start Time</label>
              <select name="start-time" onChange={onSelectHandler}>
                {freeHours.map((hour) => (
                  <option value={hour.hour} key={hour.hour}>
                    {hour.hourDisplay}
                  </option>
                ))}
              </select>
            </section>
            <section className="flex flex-col">
              <label htmlFor="">End time</label>
              <select name="end-time">
                {availableEndHours.map((hour) => (
                  <option key={hour.hour} value={hour.hour}>
                    {hour.hourDisplay}
                  </option>
                ))}
              </select>
            </section>
            <section className="flex flex-col">
              <label htmlFor="">Set Color</label>
              <select name="color">
                {Object.keys(colors).map((colorName) => (
                  <option key={colorName} value={colorName}>
                    {colorName}
                  </option>
                ))}
              </select>
            </section>
            <div className="flex gap-4">
              <button type="submit" className="primary">
                Save
              </button>

              <button type="reset" className="danger">
                Dismiss
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {dailyTasks.map((task) => (
        <p key={task.taskId}>{task.eventName}</p>
      ))}
    </div>
  );
}
