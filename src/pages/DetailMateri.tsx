
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, type Post } from "../services/postService";

function DetailMateri() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(Number(id));
        setPost(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat detail artikel."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id && Number.isInteger(Number(id)) && Number(id) > 0) {
      fetchDetail();
    } else {
      setError("ID artikel tidak valid.");
      setLoading(false);
    }
  }, [id]);

  return (
    <section className="panel">
      <Link to="/materi" className="action-button">
        ← Kembali ke Materi
      </Link>

      {loading && <p>Memuat detail artikel...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && post && (
        <article>
          <p className="welcome-label">ARTIKEL KULIAH</p>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <small>Penulis {post.userId} · Artikel #{post.id}</small>
        </article>
      )}
    </section>
  );
}

export default DetailMateri;
