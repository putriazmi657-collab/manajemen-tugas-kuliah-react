
import { useState } from "react";
import type { Task } from "../types/Task";
import type { FilterStatus } from "../components/TaskFilter";
import { useTaskContext } from "../context/TaskContext";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskStats from "../components/TaskStats";

function Dashboard() {
  const { tasks, setTasks } = useTaskContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("Semua");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setEditingTask(null);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(keyword) ||
      task.subject.toLowerCase().includes(keyword);

    const matchesFilter =
      filter === "Semua" ||
      (filter === "Selesai" && task.completed) ||
      (filter === "Belum Selesai" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  return (
    <>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">STUDENT TASK MANAGER</p>
          <h2>Halo, Azmi! 👋</h2>
          <p>Yuk, atur tugas kuliahmu agar lebih terorganisir.</p>
        </div>
      </section>

      <TaskStats
        total={tasks.length}
        completed={completed}
        pending={pending}
      />

      <TaskForm onAddTask={addTask} />

      {editingTask && (
        <TaskForm
          initialTask={editingTask}
          onAddTask={addTask}
          onUpdateTask={updateTask}
        />
      )}

      <TaskFilter
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={(task) => setEditingTask({ ...task })}
      />
    </>
  );
}

export default Dashboard;
