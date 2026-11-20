
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

function Materi() {
  const { posts, loading, error } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const author = searchParams.get("author") ?? "Semua";
  const sort = searchParams.get("sort") ?? "Terbaru";
  const pageValue = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);

    if (!value || (key === "author" && value === "Semua") ||
        (key === "sort" && value === "Terbaru") ||
        (key === "page" && value === "1")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== "page") {
      next.delete("page");
    }

    setSearchParams(next);
  };

  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const keyword = search.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(keyword) ||
        post.body.toLowerCase().includes(keyword);
      const matchesAuthor =
        author === "Semua" || post.userId.toString() === author;

      return matchesSearch && matchesAuthor;
    });

    if (sort === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [posts, search, author, sort]);

  const perPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Materi & Artikel Kuliah</h2>
          <p>Jelajahi kumpulan bacaan dari layanan API.</p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="search-post">Cari Artikel</label>
        <input
          id="search-post"
          type="search"
          placeholder="Cari judul atau isi artikel..."
          value={search}
          onChange={(e) => updateParam("q", e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="author-filter">Filter Penulis</label>
          <select
            id="author-filter"
            value={author}
            onChange={(e) => updateParam("author", e.target.value)}
          >
            <option value="Semua">Semua Penulis</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                Penulis {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sort-post">Urutkan</label>
          <select
            id="sort-post"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            <option value="Terbaru">Terbaru</option>
            <option value="A-Z">Judul A-Z</option>
            <option value="Z-A">Judul Z-A</option>
          </select>
        </div>
      </div>

      {loading && <p>Memuat artikel...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && filteredPosts.length === 0 && (
        <p>Artikel tidak ditemukan.</p>
      )}

      {!loading && !error && (
        <>
          <div className="task-list">
            {visiblePosts.map((post) => (
              <article className="task-item" key={post.id}>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <small>Penulis {post.userId}</small>
                </div>
                <Link to={`/materi/${post.id}`} className="primary-button">
                  Baca Detail
                </Link>
              </article>
            ))}
          </div>

          <div className="task-actions">
            <button
              className="action-button"
              disabled={currentPage <= 1}
              onClick={() => updateParam("page", (currentPage - 1).toString())}
            >
              Sebelumnya
            </button>

            <span>
              Halaman {currentPage} dari {Math.max(totalPages, 1)}
            </span>

            <button
              className="action-button"
              disabled={currentPage >= totalPages}
              onClick={() => updateParam("page", (currentPage + 1).toString())}
            >
              Berikutnya
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Materi;
