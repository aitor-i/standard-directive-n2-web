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

interface ApiResponse {
  message: string,
  token?: string,
  username?: string,
  calendar?: CalendarHour[],
}

interface SaveCalendarBody {
  calendar_date: string
  calendar: CalendarHour[]
  token: string
}


export const HoursContext = createContext({
  hours: [] as CalendarHour[],
  onSetHours: (hoursToSet: CalendarHour[]) => { },
});

interface Props {
  children: ReactNode;
}

export function HoursContextProvider({ children }: Props) {
  const { fetcher, response, responseObject } = useFetch<ApiResponse>();
  const [hours, setHours] = useState<CalendarHour[]>([]);
  const [a, setA] = useState(false);

  const saveCalendarsHander = (token: string) => {

    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];

    const body: SaveCalendarBody = {
      calendar_date: dateString,
      calendar: hours,
      token

    }

    const url = new URL("http://localhost:4040/calendar/save-events")
    const fetchParams: FetchParams = {
      url: url.toString(),
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body
    }

    fetcher(fetchParams)
  }

  const onSetHours = (hoursToSet: CalendarHour[]) => {
    const token = window.localStorage.getItem("token");

    setHours(hoursToSet);
    setA((p) => !p);

    if (!token) redirect("/login");
    saveCalendarsHander(token);
  };

  const fetchHandler = async (token: string) => {

    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];

    const url = new URL("http://localhost:4040/calendar/get-calendar-by-date")
    const date = dateString
    url.searchParams.append("date", date);
    url.searchParams.append("token", token);

    fetch(url.toString()).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then((data: ApiResponse) => {
        setHours(data.calendar ?? []);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  useEffect(() => {
    const hoursInADay = calendarDaysGenerator();
    setHours(hoursInADay);
    const token = window.localStorage.getItem("token");

    if (!token) redirect("/login");
    fetchHandler(token);

  }, []);

  return (
    <HoursContext.Provider value={{ hours, onSetHours }}>
      {children}
    </HoursContext.Provider>
  );
}
