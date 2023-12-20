"use client";
import {
  CalendarHour,
  EventColor,
  calendarDaysGenerator,
} from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface SetEventInCalendarContextProps {
  color: EventColor;
  eventName: string;
  timeStart: number;
  timeEnd: number;
}

export const HoursContext = createContext({
  hours: [] as CalendarHour[],
  onSetHours: (hoursToSet: CalendarHour[]) => {},
});

interface Props {
  children: ReactNode;
}

export function HoursContextProvider({ children }: Props) {
  const [hours, setHours] = useState<CalendarHour[]>([]);

  const onSetHours = (hoursToSet: CalendarHour[]) => {
    console.log("Set");
    setHours(hoursToSet);
  };

  console.log("Render");
  useEffect(() => {
    const hoursInADay = calendarDaysGenerator();
    setHours(hoursInADay);
    // Fetch data from API
    // Set data
    //
  }, []);

  return (
    <HoursContext.Provider value={{ hours, onSetHours }}>
      {children}
    </HoursContext.Provider>
  );
}
