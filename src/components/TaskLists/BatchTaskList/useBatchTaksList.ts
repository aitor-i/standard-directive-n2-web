import React, { useState } from "react";
import Task from 'domain/Task/Task'

export const useBatchTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
    console.log("Tasks to add", taskToAdd);
    setTasks((prevTasks) => [taskToAdd, ...prevTasks]);

    event.currentTarget.reset();
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };
  return { deleteTask, taskSubmitHandler, tasks }
}
