import React from "react";

interface Props {
  taskName: string;
  id: string;
  onDelete: (taskId: string) => void;
}

export default function BatchTaskItem({ taskName, id, onDelete }: Props) {
  return (
    <li className="flex border rounded-sm align-middle justify-between pl-4 pr-4">
      <p className="mt-auto mb-auto">{taskName}</p>
      <button onClick={() => onDelete(id)}>X</button>
    </li>
  );
}
