export interface ApiResponse {
  message: string,
  token?: string,
  username?: string,
  calendar?: CalendarHour[],
}

