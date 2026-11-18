
interface HeaderProps {
  name: string;
  nim: string;
}

export default function Header({ name, nim }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-icon">T</div>
          <div>
            <h1>Taskly</h1>
            <p>Manajemen Tugas Kuliah</p>
          </div>
        </div>

        <div className="student-info">
          <span>{name}</span>
          <small>{nim}</small>
        </div>
      </div>

      <nav className="navigation">
        <a href="#dashboard">Dashboard</a>
        <a href="#daftar-tugas">Daftar Tugas</a>
        <a href="#tambah-tugas">Tambah Tugas</a>
      </nav>
    </header>
  );
}
