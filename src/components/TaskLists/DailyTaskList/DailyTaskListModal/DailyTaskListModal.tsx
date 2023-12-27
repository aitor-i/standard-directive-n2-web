import { CalendarHour } from "@/application/calendarDaysGenerator/calendarDaysGenerator";
import { colors } from "@/domain/colors/colors";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSelect: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
  onDismiss: (event: React.MouseEvent<HTMLButtonElement>) => void;
  freeHours: CalendarHour[];
  availableEndHours: CalendarHour[];
}

export function DailyTaskListModal({
  onSelect,
  onSubmit,
  onDismiss,
  freeHours,
  availableEndHours,
}: Props) {
  return (
    <div className="border rounded p-4">
      <h4 className="text-xl mb-4 font-medium">Add a tasks</h4>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <section className="flex flex-col">
          <label htmlFor="task-name">Task Name</label>
          <input
            placeholder="Insert task name"
            required
            type="text"
            name="task-name"
            maxLength={25}
          />
        </section>
        <section className="flex flex-col">
          <label htmlFor="start-time">Start Time</label>
          <select name="start-time" onChange={onSelect}>
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

          <button type="reset" className="danger" onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </form>
    </div>
  );
}
