"use client";
import {
  CalendarHour,
  EventColor,
  calendarDaysGenerator,
} from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { FetchParams, useFetch } from "@/hooks/useFetch/useFeltch";
import { ReactNode, createContext, useEffect, useState } from "react";
import { redirect } from "next/navigation"

export interface SetEventInCalendarContextProps {
  color: EventColor;
  eventName: string;
  timeStart: number;
  timeEnd: number;
}

export const HoursContext = createContext({
  hours: [] as CalendarHour[],
  onSetHours: (hoursToSet: CalendarHour[]) => { },
});

interface Props {
  children: ReactNode;
}

export function HoursContextProvider({ children }: Props) {
  const { fetcher, response } = useFetch();
  const [hours, setHours] = useState<CalendarHour[]>([]);
  const [a, setA] = useState(false);

  const onSetHours = (hoursToSet: CalendarHour[]) => {
    setHours(hoursToSet);
    setA((p) => !p);
  };

  const fetchHandler = (token: string) => {

    const url = new URL("http://localhost:4040/calendar/get-calendar-by-date")
    const date = "2024-01-13"
    url.searchParams.append("date", date);
    url.searchParams.append("token", token);
    const fetchParams: FetchParams = {
      url: url.toString()
    }

    fetcher(fetchParams);

  }

  useEffect(() => {
    const hoursInADay = calendarDaysGenerator();
    setHours(hoursInADay);
    const token = window.localStorage.getItem("token");

    if (!token) redirect("/login");
    fetchHandler(token);


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
