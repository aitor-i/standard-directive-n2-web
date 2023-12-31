import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { findColorKey } from "@/application/findColorKey/findColorKey";
import { cleanEventInCalendar } from "@/application/setEventInCalendar/cleanEventInCalendar";
import { setEventInCalendar } from "@/application/setEventInCalendar/setEventInCalendar";
import { HoursContext, SetEventInCalendarContextProps } from "@/contexts/hoursContext/hoursContext";
import { ColorKeys, colors } from "@/domain/colors/colors";
import { useContext, useEffect, useState } from "react";

export const useEditDailyTaskItemForm = (taskId: number, isModalOpen: boolean, onSubmit: () => void, onDismiss: () => void) => {
  const { hours, onSetHours } = useContext(HoursContext);
  const [availableEndHours, setAvailableEndOurs] = useState<CalendarHour[]>([])
  const [freeHours, setFreeHours] = useState<CalendarHour[]>([])

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
    onDismiss();
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

    const filteredFreeHours = hours.filter(hour => !hour.taskId || hour.taskId === taskId)
    setFreeHours(filteredFreeHours)
  }, [isModalOpen])

  return { taskStartTime, onSelectTimeHandler, onSubmitHandler, onDismissHandler, onDeleteHandler, freeHours, availableEndHours, taskColor, taskEndTime, taskName }

} 
