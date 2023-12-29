import { CalendarHour } from "../calendarDaysGenerator/calendarDaysGenerator";

export const cleanEventInCalendar = (taskId: number, hours: CalendarHour[]) => {
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
  return cleanedHours

}
