"use client";
import React, { useState } from "react";

interface Task {
  id: string;
  taskName: string;
  isCompleted: boolean;
}

export default function BatchTaskList() {
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

  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Batch Tasks</h3>
      <form action="" className="flex gap-4" onSubmit={taskSubmitHandler}>
        <input name="task" type="text" />
        <button className="secondary-btn">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex border rounded-sm align-middle justify-between pl-4 pr-4"
          >
            <p className="mt-auto mb-auto">{task.taskName}</p>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
