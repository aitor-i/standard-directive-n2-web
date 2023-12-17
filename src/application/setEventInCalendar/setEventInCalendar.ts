import { CalendarHour } from "../calendarDaysGenerator/calendarDaysGenerator";

export function setEventInCalendar(
  hours: CalendarHour[],
  color: string,
  eventName: string,
  timeStart: number,
  timeEnd: number
) {
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
}
