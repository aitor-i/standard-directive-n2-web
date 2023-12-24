import { HoursContext } from "@/contexts/hoursContext/hoursContext";
import React, { useContext } from "react";

interface Props {
  isCompleted: boolean;
  taskName: string;
  taskId: number;
}

export default function DailyTasksListItem({
  isCompleted,
  taskId,
  taskName,
}: Props) {
  const { hours, onSetHours } = useContext(HoursContext);

  const changeTaskCompletedStatus = () => {
    return hours.map((task) => {
      if ((task.taskId = taskId)) {
        task.isCompleted = !task.isCompleted;
        return task;
      }
      return task;
    });
  };

  const onClickTask = () => {
    const newHours = changeTaskCompletedStatus();
    onSetHours(newHours);
  };

  return (
    <div className="flex gap-4">
      <span onClick={onClickTask}>{isCompleted ? "X" : "O"}</span>
      <p>{taskName}</p>
    </div>
  );
}
