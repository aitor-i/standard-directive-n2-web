import { Task } from "@/domain/Task/Task";
import { ApiResponse } from "@/domain/models/ApiResponse";
import { FetchParams, useFetch } from "@/hooks/useFetch/useFeltch";

import { redirect } from "next/navigation"

import React, { useEffect, useState } from "react";


export const TasksContext = React.createContext({
  tasks: [] as Task[],
  onSetTasks: (tasks: Task[]) => { }
})


interface RequestBody {
  token: String,
  tasks: Task[]
}

interface Props {
  children: React.ReactNode
}

export function TasksContextProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { fetcher, response, responseObject } = useFetch<ApiResponse>()

  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const postTasks = (token: String, tasks: Task[]) => {
    const body: RequestBody = {
      token,
      tasks,
    }

    const params: FetchParams = {
      method: 'POST',
      url: `${baseUrl}/tasks/save-tasks`,
      body,
      headers: { "Content-Type": "application/json" },

    }

    fetcher(params)
  }


  const onSetTasks = (tasks: Task[]) => {

    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");
    postTasks(token, tasks)


    // upolad changes
    setTasks(tasks)
  }


  const fetchTasks = async (token: string) => {

    const url = new URL(`${baseUrl}/tasks/get-tasks`)
    url.searchParams.append("token", token);

    fetch(url.toString()).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then((data: ApiResponse) => {
        setTasks(data.tasks ?? []);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) redirect("/login");
    fetchTasks(token);

  }, [])

  return <TasksContext.Provider value={{ tasks: tasks, onSetTasks: onSetTasks }} >
    {children}
  </TasksContext.Provider >

}
