import { colors } from "@/domain/colors/colors";

export interface CalendarHour {
  hourDisplay: string;
  hour: number;
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
