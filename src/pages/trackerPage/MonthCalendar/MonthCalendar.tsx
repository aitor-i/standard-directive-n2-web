import { generateDayObjectsForCurrentMonth } from "@/application/generateDayObjectsForCurrentMonth/generateDayObjectsForCurrentMonth";
import { DaySquare } from "../DaySquare/DaySquare";

export const MonthCalendar: React.FC = () => {

  const daysOfTheMonth = generateDayObjectsForCurrentMonth("red")

  return <div>{
    daysOfTheMonth.map((day) => {

      return <DaySquare key={day.day} color={day.color} />
    })

    setdaysInMonth(updatedDays)
  }

  const getCompletedPercentage = (days: DayObject[]) => {

    const completed = days.reduce((prevValue, day) => {

      if (day.completed) return prevValue + 1;
      return prevValue;

    }, 0)

    return (completed / days.length).toFixed()
  }

  const percentage = getCompletedPercentage(daysInMonth).toFixed(2) / 100

  useEffect(() => {

    const daysOfTheMonth = generateDayObjectsForCurrentMonth("#ff5252")
    setdaysInMonth(daysOfTheMonth);
  }, [])

  return <div className="flex items-center h-min gap-4">
    <p>Task Name</p>
    <div className="flex items-center h-min">
      {
        daysInMonth.map((day) => {
          return <DaySquare key={day.day} color={day.color} day={day.day} isCompleted={day.completed} />
        })
      }
    </div>

    <p>{}</p>
    <button className="primary" onClick={onclickCompleteHandler}>Complete</button>
  </div>;
};
