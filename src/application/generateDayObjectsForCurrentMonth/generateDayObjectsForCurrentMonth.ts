
type DayObject = {
  completed: boolean;
  date: { year: number; month: number };
  day: number;
  color: string;
};

export function generateDayObjectsForCurrentMonth(color: string = 'green'): DayObject[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // Note: month is 0-indexed
  const today = now.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dayObjects: DayObject[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    dayObjects.push({
      completed: day < today,
      date: { year: currentYear, month: currentMonth + 1 }, // Adjust month to be 1-indexed for the object
      day: day,
      color: day < today ? color : 'grey',
    });
  }

  return dayObjects;
}
