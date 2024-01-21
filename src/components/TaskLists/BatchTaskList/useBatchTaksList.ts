import React, { useContext, useState } from "react";
import { TasksContext } from "@/contexts/hoursContext/tasksContext";
import { Task } from "@/domain/Task/Task";

export const useBatchTaskList = () => {
  const { onSetTasks, tasks } = useContext(TasksContext);
  const taskSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formEvent = new FormData(event.currentTarget);

    const taskName = formEvent.get("task");
    const id = (Math.random() * 100000000).toFixed(0).toString();
    const taskToAdd: Task = {
      id,
      isCompleted: false,
      taskName: taskName?.toString() ?? "",
      isSelected: false,
    };

    onSetTasks([taskToAdd, ...tasks])

    event.currentTarget.reset();
  };

  const deleteTask = (taskId: string) => {
    onSetTasks(tasks.filter((task) => task.id !== taskId))
  };

  return { deleteTask, taskSubmitHandler, tasks }
}
