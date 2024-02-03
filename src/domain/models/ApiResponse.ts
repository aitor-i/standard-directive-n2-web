import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { Task } from '@/domain/Task/Task'

export interface ApiResponse {
  message: string,
  token?: string,
  username?: string,
  calendar?: CalendarHour[],
  tasks?: Task[]
}

