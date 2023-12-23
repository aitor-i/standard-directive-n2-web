import {
  CalendarHour,
  EventColor,
} from "../calendarDaysGenerator/calendarDaysGenerator";

export interface SetEventInCalendarProps {
  hours: CalendarHour[];
  color: EventColor;
  eventName: string;
  timeStart: number;
  timeEnd: number;
  taskId: number;
}

export function setEventInCalendar({
  color,
  eventName,
  hours,
  timeEnd,
  timeStart,
  taskId,
}: SetEventInCalendarProps) {
  hours.forEach((hour) => {
    if (hour.hour === timeStart) {
      hour.color = color;
      hour.eventName = eventName;
      hour.eventPosition = hour.hour === timeEnd ? "single" : "first";
      hour.taskId = taskId;
    }

    if (hour.hour === timeEnd && hour.hour !== timeStart) {
      hour.color = color;
      hour.eventPosition = "end";
      hour.taskId = taskId;
    }

    if (hour.hour > timeStart && hour.hour < timeEnd) {
      hour.color = color;
      hour.eventPosition = "middle";
      hour.taskId = taskId;
    }
  });
  return hours;
}
