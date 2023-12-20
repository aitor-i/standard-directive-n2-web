"use client";
import {
  CalendarHour,
  EventColor,
  calendarDaysGenerator,
} from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { setEventInCalendar } from "@/application/setEventInCalendar/setEventInCalendar";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface SetEventInCalendarContextProps {
  color: EventColor;
  eventName: string;
  timeStart: number;
  timeEnd: number;
}

export const HoursContext = createContext({
  hours: [] as CalendarHour[],
  setEventInCalendar: (props: SetEventInCalendarContextProps) => {},
});

interface Props {
  children: ReactNode;
}

export function HoursContextProvider({ children }: Props) {
  const [hours, setHours] = useState<CalendarHour[]>([]);

  const onSetEventInCalendar = (props: SetEventInCalendarContextProps) => {
    const hoursInADay = calendarDaysGenerator();
    setHours(hoursInADay);

    setHours((prevHours) => {
      setEventInCalendar({ hours: prevHours, ...props });
      return prevHours;
    });
  };

  useEffect(() => {
    const hoursInADay = calendarDaysGenerator();
    setHours(hoursInADay);
    // Fetch data from API
    // Set data

    // setHours((prevHours) => {
    //   const setEventProps: SetEventInCalendarContextProps = {
    //     color: "color-blue",
    //     eventName: "Task 1",
    //     timeStart: 12,
    //     timeEnd: 15,
    //   };
    //   setEventInCalendar({ hours: prevHours, ...setEventProps });
    //   console.log("Prev hours...", prevHours);
    //   return prevHours;
    // });
  }, []);

  return (
    <HoursContext.Provider
      value={{ hours, setEventInCalendar: onSetEventInCalendar }}
    >
      {children}
    </HoursContext.Provider>
  );
}
