"use client";
import BatchTaskItem from "./BatchTaskItem";
import { useBatchTaskList } from "./useBatchTaksList";

export default function BatchTaskList() {

  const { tasks, taskSubmitHandler, deleteTask } = useBatchTaskList();

  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Batch Tasks</h3>
      <form action="" className="flex gap-4" onSubmit={taskSubmitHandler}>
        <input name="task" type="text" />
        <button className="secondary-btn">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <BatchTaskItem
            key={task.id}
            id={task.id}
            onDelete={deleteTask}
            taskName={task.taskName}
          />
        ))}
      </ul>
    </div>
  );
}
