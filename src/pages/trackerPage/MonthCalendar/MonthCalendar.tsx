import { generateDayObjectsForCurrentMonth } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { DaySquare } from "../DaySquare/DaySquare";

export const MonthCalendar: React.FC = () => {

  const daysOfTheMonth = generateDayObjectsForCurrentMonth("red")

  return <div>{
    daysOfTheMonth.map((day) => {

      return <DaySquare key={day.day} color={day.color} />
    })
  }</div>;
};
