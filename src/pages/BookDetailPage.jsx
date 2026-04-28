import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/api";
import { formatDate, getFeaturedImage } from "../utils/format";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPostById(Number(id));
        setBook(data);
      } catch (err) {
        setError("Lo sentimos, no hemos podido encontrar el libro que buscas.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p className="text-center" style={{marginTop: '50px'}}>Cargando libro...</p>;

  if (error || !book) {
    return (
      <div className="detail-container not-found-view" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Libro no encontrado</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "30px" }}>
          {error || "Los datos de este ejemplar no están disponibles en este momento."}
        </p>
        <Link to="/" className="back-link" style={{ display: "inline-block" }}>
          Ir al catálogo principal
        </Link>
      </div>
    );
  }

  const imageUrl = getFeaturedImage(book);
  const categories = book._embedded?.["wp:term"]?.[0]?.filter(
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
              alt={book.title?.rendered}
              className="detail-image"
            />
          ) : (
            <div className="no-image">
              <span className="no-image-text">Sin portada disponible</span>
            </div>
          )}
        </div>

        <div className="detail-info">
          <h1
            dangerouslySetInnerHTML={{
              __html: book.title?.rendered || "Sin título",
            }}
          />

          <p className="detail-date">
            📅 Publicado el {formatDate(book.date)}
          </p>

          {categories.length > 0 && (
            <div className="detail-categories">
              {categories.map((cat) => (
                <span key={cat.id} className="category-tag">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="detail-content"
        dangerouslySetInnerHTML={{
          __html: book.content?.rendered || "",
        }}
      />
    </div>
  );
};

export default BookDetailPage;