import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { HoursContext } from "@/contexts/hoursContext/hoursContext";
import { Colors, colors } from "@/domain/colors/colors";
import React, { useContext } from "react";

interface Props {
  onSubmit: () => void;
  onSelect: () => void;
  onDismiss: () => void;
  taskId: number;
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
}: Props) {
  const { hours, onSetHours } = useContext(HoursContext);
  const freeHours = hours;
  const availableEndHours = hours;
  const taskHours = hours.filter((hour) => hour.taskId === taskId);
  const taskStartTime = taskHours.at(0);
  const taskEndTime = taskHours.at(-1);
  const taskName = taskHours.at(0)?.eventName;

  const taskColor = findColorKey(colors, taskStartTime?.color ?? "");

  const onDeleteHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const cleanedHours: CalendarHour[] = hours.map((hour) => {
      if (hour.taskId === taskId) {
        const resetCalendarHour: CalendarHour = {
          ...hour,
          taskId: undefined,
          color: undefined,
          eventName: "",
          eventPosition: undefined,
          isCompleted: false,
        };
        return resetCalendarHour;
      }
      return hour;
    });
    onSetHours(cleanedHours);
  };

  return (
    <div className="border rounded p-4">
      <h4 className="text-xl mb-4 font-medium">Edit tasks</h4>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <section className="flex flex-col">
          <label htmlFor="task-name">Task Name</label>
          <input
            placeholder="Insert task name"
            required
            type="text"
            name="task-name"
            maxLength={25}
            value={taskName}
          />
        </section>
        <section className="flex flex-col">
          <label htmlFor="start-time">Start Time</label>
          <select name="start-time" onChange={onSelect}>
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

          <button type="reset" className="warning" onClick={onDismiss}>
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
