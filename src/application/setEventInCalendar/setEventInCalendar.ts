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
}

export function setEventInCalendar({
  color,
  eventName,
  hours,
  timeEnd,
  timeStart,
}: SetEventInCalendarProps) {
  hours.forEach((hour) => {
    if (hour.hour === timeStart) {
      hour.color = color;
      hour.eventName = eventName;
      hour.eventPosition = hour.hour === timeEnd ? "single" : "first";
    }

    if (hour.hour === timeEnd && hour.hour !== timeStart) {
      hour.color = color;
      hour.eventPosition = "end";
    }

    if (hour.hour > timeStart && hour.hour < timeEnd) {
      hour.color = color;
      hour.eventPosition = "middle";
    }
  });
  return hours;
}
