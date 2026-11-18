
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  return (
    <section className="panel" id="daftar-tugas">
      <div className="section-heading">
        <div>
          <h2>Daftar Tugas</h2>
          <p>Semua tugas kuliah yang perlu kamu kerjakan.</p>
        </div>
        <span className="heading-icon">☷</span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <span>♡</span>
          <h3>Belum Ada Tugas</h3>
          <p>Yuk, tambahkan tugas kuliah pertamamu!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}
