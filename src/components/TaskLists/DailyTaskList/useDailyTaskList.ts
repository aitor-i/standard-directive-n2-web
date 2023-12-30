import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { setEventInCalendar } from "@/application/setEventInCalendar/setEventInCalendar";
import { HoursContext, SetEventInCalendarContextProps } from "@/contexts/hoursContext/hoursContext";
import { ColorKeys, colors } from "@/domain/colors/colors";
import { useContext, useRef, useState } from "react";

export const useDailyTaskList = () => {

  const [availableEndHours, setAvailableEndOurs] = useState<CalendarHour[]>([]);
  const { hours, onSetHours } = useContext(HoursContext);

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
      setAvailableEndOurs([]);
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
    const freeHours = hours.filter((hour) => !hour.color);

    const firstSequence: CalendarHour[] = [];
    for (const event of freeHours) {
      if (
        firstSequence.length > 0 &&
        event.hour !== firstSequence[firstSequence.length - 1].hour + 1
      ) {
        break;
      }
      firstSequence.push(event);
    }

    setAvailableEndOurs(firstSequence);
    dialogRef.current?.showModal();
  };

  const dailyTasks = hours.filter((hour) => hour.eventName);

  return { dialogCloseHandler, dialogOpenHandler, dialogRef, onSubmitHandler, onSelectHandler, availableEndHours, freeHours, dailyTasks }
}
