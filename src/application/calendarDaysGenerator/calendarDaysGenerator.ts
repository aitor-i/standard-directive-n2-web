import { colors } from "@/domain/colors/colors";

export interface CalendarHour {
  hourDisplay: string;
  hour: number;
  cuarter: 0 | 1 | 2 | 3;
  color?: EventColor | null;
  eventName: string;
  eventPosition?: EventPosition | null;
  taskId?: number | null;
  isCompleted?: boolean;
}

// export type EventColor =
//   | "color-green"
//   | "color-red"
//   | "color-yellow"
//   | "color-blue"
//   | "color-violet"
//   | "color-extra";

export type EventColor = (typeof colors)[keyof typeof colors];
export type EventPosition = "single" | "first" | "middle" | "end";

export function calendarDaysGenerator() {
  const calendarHours: CalendarHour[] = [];
  for (let index = 1; index <= 96; index++) {
    const hour = Math.ceil(index / 4); // Calculate the hour based on index
    const formatHourDisplay = () => {
      let hourForDisplay = hour % 12;
      hourForDisplay = hourForDisplay === 0 ? 12 : hourForDisplay; // Adjust for 12AM/PM
      const amPm = hour <= 12 ? "AM" : "PM";
      return `${hourForDisplay}${amPm}`;
    };
    const quarter = (index - 1) % 4; // Calculate the quarter (0, 1, 2, 3)
    const calendarHour: CalendarHour = {
      hourDisplay: formatHourDisplay(),
      hour: hour,
      cuarter: quarter as 0 | 1 | 2 | 3, // Ensure this is typed correctly
      eventName: "",
      color: null,
      taskId: null,
      isCompleted: false,
      eventPosition: null
    };
    calendarHours.push(calendarHour);
  }

  return calendarHours;
}
