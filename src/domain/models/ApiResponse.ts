import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { Task } from '@/domain/Task/Task'
import { TrackerObject } from "@/pages/trackerPage/TrackerPackage";

export interface ApiResponse {
  message: string,
  token?: string,
  username?: string,
  calendar?: CalendarHour[],
  tasks?: Task[]
  trackers?: TrackerObject[]
}

