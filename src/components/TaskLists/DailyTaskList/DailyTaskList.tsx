"use client";

import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import {
  HoursContext,
  SetEventInCalendarContextProps,
} from "@/contexts/hoursContext/hoursContext";
import React, { ReactEventHandler, useContext, useState } from "react";

export default function DailyTaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableEndHours, setAvailableEndOurs] = useState<CalendarHour[]>([]);
  const { setEventInCalendar, hours } = useContext(HoursContext);

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
    const color = formData.get("color");

    const setEventProps: SetEventInCalendarContextProps = {
      color: "color-green",
      eventName: taskName as string,
      timeStart: parseInt(startTime as string),
      timeEnd: parseInt(endTime as string),
    };
    setEventInCalendar(setEventProps);
    closeModalHandler();
  };

  const onSelectHandler = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const option = event.currentTarget.value;
    const filteredEndHours = hours.filter(
      (hour) => !hour.color && hour.hour > parseInt(option)
    );

    setAvailableEndOurs(filteredEndHours);
  };
  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Daily Tasks</h3>
      <button onClick={() => openModalHandler()} className="primary">
        {" "}
        +{" "}
      </button>
      {isModalOpen ? (
        <div className="debug p-4">
          <h4>Add a tasks</h4>
          <form onSubmit={onSubmitHandler}>
            <section>
              <label htmlFor="">Task Name</label>
              <input type="text" name="task-name" />
            </section>
            <section>
              <label htmlFor="">Start Time</label>
              <select name="start-time" onChange={onSelectHandler}>
                {freeHours.map((hour) => (
                  <option value={hour.hour} key={hour.hour}>
                    {hour.hourDisplay}
                  </option>
                ))}
              </select>
              <label htmlFor="">End time</label>
              <select name="end-time">
                {availableEndHours.map((hour) => (
                  <option key={hour.hour}>{hour.hourDisplay}</option>
                ))}
              </select>
            </section>
            <section>
              <label htmlFor="">Set Color</label>
              <select name="color">
                <option value="color-green">Green</option>
              </select>
            </section>
            <div className="flex gap-4">
              <button onClick={() => console.log("AAAAA")} className="primary">
                Save
              </button>

              <button className="danger">Dismiss</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
