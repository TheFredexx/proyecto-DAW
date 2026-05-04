import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/api";
import { formatDate, getFeaturedImage, stripHtml } from "../utils/format";
import { Calendar } from "lucide-react";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPostById(Number(id), {
          signal: controller.signal,
        });
        setBook(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Lo sentimos, no hemos podido encontrar el libro que buscas."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [id]);
  if (loading)
    return (
      <div className="text-center" style={{ marginTop: "50px" }}>
        Cargando libro...
      </div>
    );

  if (error || !book) {
    return (
      <div
        className="detail-container not-found-view"
        style={{ padding: "80px 20px", textAlign: "center" }}
      >
        <h2>Libro no encontrado</h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            marginBottom: "30px",
          }}
        >
          {error || "Los datos de este ejemplar no están disponibles."}
        </p>
        <Link to="/" className="back-link" style={{ display: "inline-block" }}>
          Ir al catálogo principal
        </Link>
      </div>
    );
  }

  const imageUrl = getFeaturedImage(book);
  const rawTitle = book.title?.rendered || "Sin título";
  const cleanTitle = stripHtml(rawTitle);
  const categories =
    book._embedded?.["wp:term"]?.[0]?.filter(
      (cat) => cat.taxonomy === "category"
    ) || [];
  return (
    <div className="detail-container">
      <Link to="/" className="back-link">
        ← Volver al listado
      </Link>
      <div className="detail-grid">
        <div className="detail-image-wrapper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={cleanTitle}
              className="detail-image"
            />
          ) : (
            <div className="no-image">
              <span className="no-image-text">
                Sin portada disponible
              </span>
            </div>
          )}
        </div>
        <div className="detail-info">
          <h1>{cleanTitle}</h1>
          <p className="detail-date">
            <Calendar size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Publicado el {formatDate(book.date)}
          </p>
          <div className="detail-categories">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <span key={cat.id} className="category-tag">
                  {cat.name}
                </span>
              ))
            ) : (
              <span className="no-category-label">
                Sin categoría asignada
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="detail-content">
        {book.content?.rendered?.trim() ? (
          <div
            dangerouslySetInnerHTML={{
              __html: book.content.rendered,
            }}
          />
        ) : (
          <p className="no-content-text">
            No hay una descripción extendida para este libro.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;