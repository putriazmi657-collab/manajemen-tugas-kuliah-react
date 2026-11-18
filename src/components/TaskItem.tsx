
import { useState } from "react";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-top">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <span className={`status ${task.completed ? "done" : "pending"}`}>
          {task.completed ? "Selesai" : "Belum Selesai"}
        </span>
      </div>

      <h3>{task.title}</h3>
      <p className="task-subject">{task.subject}</p>

      <p className="task-deadline">
        Deadline: {task.deadline}
      </p>

      {showDetail && (
        <div className="task-description">
          {task.description || "Tidak ada deskripsi."}
        </div>
      )}

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className="action-button"
        >
          {task.completed ? "Batalkan" : "Selesaikan"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="action-button edit-button"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="action-button delete-button"
        >
          Hapus
        </button>

        <button
          type="button"
          onClick={() => setShowDetail(!showDetail)}
          className="action-button detail-button"
        >
          {showDetail ? "Tutup Detail" : "Detail"}
        </button>
      </div>
    </article>
  );
}
