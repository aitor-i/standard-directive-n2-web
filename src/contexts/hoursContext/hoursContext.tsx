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
  const [a, setA] = useState(false);

  const onSetHours = (hoursToSet: CalendarHour[]) => {
    setHours(hoursToSet);
    setA((p) => !p);
  };

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
