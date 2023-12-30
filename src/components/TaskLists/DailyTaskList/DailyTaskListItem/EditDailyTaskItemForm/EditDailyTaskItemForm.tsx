import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { cleanEventInCalendar } from "@/application/setEventInCalendar/cleanEventInCalendar";
import { setEventInCalendar } from "@/application/setEventInCalendar/setEventInCalendar";
import { HoursContext, SetEventInCalendarContextProps } from "@/contexts/hoursContext/hoursContext";
import { ColorKeys, Colors, colors } from "@/domain/colors/colors";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  onSubmit: () => void;
  onSelect: () => void;
  onDismiss: () => void;
  taskId: number;
  isModalOpen: boolean
}

function findColorKey<T extends Record<string, string>>(
  obj: T,
  color: string
): keyof T | undefined {
  // Loop through the keys of the object.
  for (const key in obj) {
    if (obj[key] === color) {
      // If the value matches the color, return the key.
      return key as keyof T;
    }
  }
  // Return undefined if the color isn't found.
  return undefined;
}

export function EditDailyTaskItemForm({
  onSelect,
  onSubmit,
  onDismiss,
  taskId,
  isModalOpen
}: Props) {
  const { hours, onSetHours } = useContext(HoursContext);
  const [availableEndHours, setAvailableEndOurs] = useState<CalendarHour[]>([])

  const freeHours = hours;
  const taskHours = hours.filter((hour) => hour.taskId === taskId);
  const taskStartTime = taskHours.at(0);
  const taskEndTime = taskHours.at(-1);
  const taskName = taskHours.at(0)?.eventName;

  const taskColor = findColorKey(colors, taskStartTime?.color ?? "");

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit')
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

    const cleanedHours = cleanEventInCalendar(taskId, hours)

    const updatedHours = setEventInCalendar({
      hours: cleanedHours,
      taskId,
      ...setEventProps,
    });

    onSetHours(updatedHours);

    onSubmit();
  }

  const onDismissHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDismiss()
  };

  const onDeleteHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const cleanedHours = cleanEventInCalendar(taskId, hours)
    onSetHours(cleanedHours);
  };

  const onSelectTimeHandler = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const option = event.currentTarget.value;
    const nextTasks = hours.filter(
      (hour) => hour.hour > parseInt(option) && hour.color && hour.taskId !== taskId
    );

    const nextTaskTime = nextTasks[0]?.hour ?? 25;

    const filteredEndHours = hours.filter(
      (hour) =>
        !hour.color && hour.hour >= parseInt(option) && hour.hour < nextTaskTime || hour.taskId === taskId && hour.hour >= parseInt(option)
    );

    setAvailableEndOurs(filteredEndHours);
  }


  useEffect(() => {

    const nextTasks = hours.filter(
      (hour) => hour.hour > taskStartTime?.hour! && hour.color && hour.taskId !== taskId
    );

    const nextTaskTime = nextTasks[0]?.hour ?? 25;

    const filteredEndHours = hours.filter(
      (hour) =>
        !hour.color && hour.hour >= taskStartTime?.hour! && hour.hour < nextTaskTime || hour.taskId === taskId && hour.hour >= taskStartTime?.hour!
    );
    setAvailableEndOurs(filteredEndHours)
  }, [isModalOpen])

  return (
    <div className="border rounded p-4">
      <h4 className="text-xl mb-4 font-medium">Edit tasks</h4>

      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <section className="flex flex-col">
          <label htmlFor="task-name">Task Name</label>
          <input
            placeholder="Insert task name"
            required
            type="text"
            name="task-name"
            maxLength={25}
            defaultValue={taskName}
          />
        </section>

        <section className="flex flex-col">
          <label htmlFor="start-time">Start Time</label>
          <select name="start-time" onChange={onSelectTimeHandler}>
            <option value={taskStartTime?.hour}>
              {taskStartTime?.hourDisplay}
            </option>
            {freeHours.map((hour) => (
              <option value={hour.hour} key={hour.hour}>
                {hour.hourDisplay}
              </option>
            ))}
          </select>
        </section>

        <section className="flex flex-col">
          <label htmlFor="end-time">End time</label>
          <select name="end-time">
            <option value={taskEndTime?.hour}>
              {taskEndTime?.hourDisplay}
            </option>
            {availableEndHours.map((hour) => (
              <option key={hour.hour} value={hour.hour}>
                {hour.hourDisplay}
              </option>
            ))}
          </select>
        </section>

        <section className="flex flex-col">
          <label htmlFor="color">Set Color</label>
          <select name="color">
            <option value={taskColor}>{taskColor}</option>
            {Object.keys(colors).map((colorName) => (
              <option key={colorName} value={colorName}>
                {colorName}
              </option>
            ))}
          </select>
        </section>
        <div className="flex gap-4 self-end">
          <button type="submit" className="primary">
            Save
          </button>

          <button type="reset" className="warning" onClick={onDismissHandler}>
            Dismiss
          </button>

          <button className="danger" onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
