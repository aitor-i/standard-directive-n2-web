import { colors } from "@/domain/colors/colors";
import React from "react";
import { useEditDailyTaskItemForm } from "./useEditDailyTaskItemForm";

interface Props {
  onSubmit: () => void;
  onSelect: () => void;
  onDismiss: () => void;
  taskId: number;
  isModalOpen: boolean
}


export function EditDailyTaskItemForm({
  onSelect,
  onSubmit,
  onDismiss,
  taskId,
  isModalOpen
}: Props) {

  const { taskName, taskEndTime, taskColor, freeHours, onDeleteHandler, onDismissHandler, onSubmitHandler, availableEndHours, onSelectTimeHandler, taskStartTime } = useEditDailyTaskItemForm(taskId, isModalOpen, onSubmit, onDismiss)

  return (
    <div className="border rounded p-4">
      <h4 className="text-xl mb-4 font-medium">Edit tasks</h4>

      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <section className="flex flex-col">
          <label htmlFor="task-name">Task Name</label>
          <input
            placeholder="Insert task name"
            required
            type="text"
            name="task-name"
            maxLength={25}
            defaultValue={taskName}
          />
        </section>

        <section className="flex flex-col">
          <label htmlFor="start-time">Start Time</label>
          <select name="start-time" onChange={onSelectTimeHandler}>
            <option value={taskStartTime?.hour}>
              {taskStartTime?.hourDisplay}
            </option>
            {freeHours.map((hour) => (
              <option value={hour.hour} key={hour.hour}>
                {hour.hourDisplay}
              </option>
            ))}
          </select>
        </section>

        <section className="flex flex-col">
          <label htmlFor="end-time">End time</label>
          <select name="end-time">
            <option value={taskEndTime?.hour}>
              {taskEndTime?.hourDisplay}
            </option>
            {availableEndHours.map((hour) => (
              <option key={hour.hour} value={hour.hour}>
                {hour.hourDisplay}
              </option>
            ))}
          </select>
        </section>

        <section className="flex flex-col">
          <label htmlFor="color">Set Color</label>
          <select name="color">
            <option value={taskColor}>{taskColor}</option>
            {Object.keys(colors).map((colorName) => (
              <option key={colorName} value={colorName}>
                {colorName}
              </option>
            ))}
          </select>
        </section>
        <div className="flex gap-4 self-end">
          <button type="submit" className="primary">
            Save
          </button>

          <button type="reset" className="warning" onClick={onDismissHandler}>
            Dismiss
          </button>

          <button className="danger" onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
