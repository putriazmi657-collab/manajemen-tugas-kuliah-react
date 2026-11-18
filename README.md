
# Taskly - Manajemen Tugas Kuliah

Taskly adalah aplikasi berbasis React untuk membantu mahasiswa mencatat, mengatur, dan memantau tugas perkuliahan.

## Identitas Pembuat

- Nama: Azmi Putri Kuswandi
- NIM: 1247050126
- Program Studi: S1 Teknik Informatika
- Kelas: A

## Teknologi

- React
- TypeScript
- Vite
- CSS
- Git dan GitHub

## Fitur Aplikasi

1. Menambahkan tugas kuliah.
2. Mengedit informasi tugas.
3. Menghapus tugas.
4. Menandai tugas sebagai selesai.
5. Mencari tugas berdasarkan nama atau mata kuliah.
6. Memfilter tugas berdasarkan status.
7. Menampilkan statistik tugas.

## Komponen React

- Header
- TaskForm
- TaskItem
- TaskList
- TaskFilter
- TaskStats
- Footer

## Cara Menjalankan Aplikasi

1. Clone repository.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka alamat lokal yang ditampilkan Vite.

## Repository

https://github.com/putriazmi657-collab/manajemen-tugas-kuliah-react

## Struktur Folder

```text
src/
├── components/
│   ├── Header.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── TaskFilter.tsx
│   ├── TaskStats.tsx
│   └── Footer.tsx
├── types/
│   └── Task.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

Struktur folder dibuat untuk memisahkan komponen tampilan, tipe data, dan logika utama aplikasi.

## Cara Menggunakan Aplikasi

1. Isi formulir untuk menambahkan tugas kuliah.
2. Klik tombol Edit untuk mengubah informasi tugas.
3. Klik tombol Hapus untuk menghapus tugas.
4. Gunakan tombol Selesaikan untuk mengubah status tugas.
5. Gunakan kolom pencarian untuk mencari tugas.
6. Gunakan filter untuk menampilkan tugas berdasarkan status.
7. Lihat statistik untuk memantau jumlah tugas.

## Pengembangan Selanjutnya

Aplikasi Taskly dapat dikembangkan dengan menambahkan penyimpanan data menggunakan Local Storage, autentikasi pengguna, dan integrasi API agar pengelolaan tugas menjadi lebih lengkap.
