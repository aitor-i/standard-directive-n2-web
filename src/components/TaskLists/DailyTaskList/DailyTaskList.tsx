"use client";

import DailyTasksListItem from "./DailyTaskListItem/DailyTasksListItem";
import { DailyTaskListModal } from "./DailyTaskListModal/DailyTaskListModal";
import { useDailyTaskList } from "./useDailyTaskList";

export default function DailyTaskList() {
  const { dialogCloseHandler, dialogOpenHandler, dialogRef, onSubmitHandler, onSelectHandler, availableEndHours, freeHours, dailyTasks } = useDailyTaskList();
  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Daily Tasks</h3>
      <button onClick={() => dialogOpenHandler()} className="primary">
        {" "}
        +{" "}
      </button>
      <dialog className="w-1/2 rounded" ref={dialogRef}>
        <DailyTaskListModal
          availableEndHours={availableEndHours}
          freeHours={freeHours}
          onSelect={onSelectHandler}
          onSubmit={onSubmitHandler}
          onDismiss={() => {
            dialogCloseHandler();
          }}
        />
      </dialog>

      {dailyTasks.map((task) => (
        <DailyTasksListItem
          key={task.taskId}
          isCompleted={task.isCompleted ?? false}
          taskId={task.taskId!}
          taskName={task.eventName}
        />
      ))}
    </div>
  );
}
