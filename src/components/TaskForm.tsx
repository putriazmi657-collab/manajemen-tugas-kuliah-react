
import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types/Task";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  initialTask?: Task | null;
  onUpdateTask?: (task: Task) => void;
}

export default function TaskForm({
  onAddTask,
  initialTask = null,
  onUpdateTask,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [subject, setSubject] = useState(initialTask?.subject ?? "");
  const [deadline, setDeadline] = useState(initialTask?.deadline ?? "");
  const [priority, setPriority] = useState<Task["priority"]>(
    initialTask?.priority ?? "Sedang"
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      alert("Nama tugas minimal 3 karakter!");
      return;
    }

    if (!subject.trim() || !deadline) {
      alert("Mata kuliah dan deadline wajib diisi!");
      return;
    }

    if (initialTask && onUpdateTask) {
      onUpdateTask({
        ...initialTask,
        title: title.trim(),
        description: description.trim(),
        subject: subject.trim(),
        deadline,
        priority,
      });
    } else {
      onAddTask({
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        subject: subject.trim(),
        deadline,
        priority,
        completed: false,
      });
    }

    if (!initialTask) {
      setTitle("");
      setDescription("");
      setSubject("");
      setDeadline("");
      setPriority("Sedang");
    }
  };

  return (
    <section className="panel" id="tambah-tugas">
      <div className="section-heading">
        <div>
          <h2>{initialTask ? "Edit Tugas" : "Tambah Tugas Baru"}</h2>
          <p>
            {initialTask
              ? "Ubah informasi tugas kuliah kamu."
              : "Catat tugas kuliah kamu di sini."}
          </p>
        </div>
        <span className="heading-icon">＋</span>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Nama Tugas</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Membuat laporan praktikum"
          />
        </div>

        <div className="form-group">
          <label>Mata Kuliah</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Masukkan nama mata kuliah"
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tuliskan detail tugas..."
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Prioritas</label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Task["priority"])
              }
            >
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button">
          {initialTask ? "Simpan Perubahan" : "+ Tambahkan Tugas"}
        </button>
      </form>
    </section>
  );
}
