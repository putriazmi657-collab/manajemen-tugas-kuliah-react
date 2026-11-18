
import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "./types/Task";
import type { FilterStatus } from "./components/TaskFilter";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import TaskStats from "./components/TaskStats";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("Semua");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
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

  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingTask) return;

    if (editingTask.title.trim().length < 3) {
      alert("Nama tugas minimal 3 karakter!");
      return;
    }

    if (!editingTask.subject.trim() || !editingTask.deadline) {
      alert("Mata kuliah dan deadline wajib diisi!");
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...editingTask,
              title: editingTask.title.trim(),
              subject: editingTask.subject.trim(),
              description: editingTask.description.trim(),
            }
          : task
      )
    );

    setEditingTask(null);
    alert("Tugas berhasil diperbarui!");
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
    <div className="app">
      <Header
        name="Azmi Putri Kuswandi"
        nim="1247050126"
      />

      <main className="main-content" id="dashboard">
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

        {editingTask && (
          <section className="panel" id="edit-tugas">
            <div className="section-heading">
              <div>
                <h2>Edit Tugas</h2>
                <p>Ubah informasi tugas yang dipilih.</p>
              </div>
              <span className="heading-icon">✎</span>
            </div>

            <form className="task-form" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Nama Tugas</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Mata Kuliah</label>
                <input
                  type="text"
                  value={editingTask.subject}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  rows={3}
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={editingTask.deadline}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Prioritas</label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        priority: e.target.value as Task["priority"],
                      })
                    }
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
              </div>

              <div className="task-actions">
                <button type="submit" className="primary-button">
                  Simpan Perubahan
                </button>

                <button
                  type="button"
                  className="action-button"
                  onClick={() => setEditingTask(null)}
                >
                  Batal
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
