
export type FilterStatus = "Semua" | "Belum Selesai" | "Selesai";

interface TaskFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterStatus;
  onFilterChange: (value: FilterStatus) => void;
}

export default function TaskFilter({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: TaskFilterProps) {
  return (
    <section className="filter-section">
      <div className="search-box">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Cari nama tugas atau mata kuliah..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as FilterStatus)}
      >
        <option value="Semua">Semua Tugas</option>
        <option value="Belum Selesai">Belum Selesai</option>
        <option value="Selesai">Selesai</option>
      </select>
    </section>
  );
}
