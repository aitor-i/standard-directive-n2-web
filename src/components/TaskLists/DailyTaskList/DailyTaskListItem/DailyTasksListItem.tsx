import { HoursContext } from "@/contexts/hoursContext/hoursContext";
import React, { useContext, useRef } from "react";
import { EditDailyTaskItemForm } from "./EditDailyTaskItemForm/EditDailyTaskItemForm";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const changeTaskCompletedStatus = () => {
    return hours.map((task) => {
      if (task.taskId === taskId) {
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

  const dialogCloseHandler = () => {
    dialogRef.current?.close();
  };

  const dialogOpenHandler = () => {
    dialogRef.current?.showModal();
  };

  const onEditClickHandler = () => {
    dialogOpenHandler();
  };

  return (
    <div className="flex gap-4 p-2 border border-stdSlateGray m-1">
      <span className="cursor-pointer" onClick={onClickTask}>
        {isCompleted ? "X" : "O"}
      </span>
      <p className="flex-1">{taskName}</p>
      <span className="cursor-pointer" onClick={onEditClickHandler}>
        !
      </span>
      <dialog className="w-1/2 rounded" ref={dialogRef}>
        <EditDailyTaskItemForm
          onDismiss={dialogCloseHandler}
          onSelect={() => { }}
          onSubmit={dialogCloseHandler}
          taskId={taskId}
        />
      </dialog>
    </div>
  );
}
