export interface CalendarHour {
  hourDisplay: string;
  hour: number;
  color: string;
  eventName: string;
  eventPosition?: EventPosition;
}

export type EventPosition = "single" | "first" | "middle" | "end";

export function calendarDaysGenerator() {
  const calendarHours: CalendarHour[] = [];
  for (let index = 1; index <= 24; index++) {
    const formatHourDisplay = () => {
      if (index <= 12) {
        return index.toString() + "AM";
      }
      return (index - 12).toString() + "PM";
    };
    const calendarHour: CalendarHour = {
      hourDisplay: formatHourDisplay(),
      hour: index,
      color: "",
      eventName: "",
    };
    calendarHours.push(calendarHour);
  }

  return calendarHours;
}
