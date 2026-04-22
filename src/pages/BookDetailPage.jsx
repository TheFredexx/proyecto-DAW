import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/api";
import { formatDate, getFeaturedImage } from "../utils/format"; // 🔥 usar utils

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
        console.error(err);
        setError(err.message || "Error loading book");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // 🔴 LOADING
  if (loading)
    return <p className="text-center">Cargando libro...</p>;

  // 🔴 ERROR
  if (error) return <p className="error">{error}</p>;

  // 🔴 SEGURIDAD
  if (!book)
    return <p className="text-center">No hay datos disponibles</p>;

  // 🔥 usar utils (coherencia con BookCard)
  const imageUrl = getFeaturedImage(book);

  const categories =
    book._embedded?.["wp:term"]?.[0]?.filter(
      (cat) => cat.taxonomy === "category"
    ) || [];

  return (
    <div className="detail-container">
      {/* 🔙 BACK */}
      <Link to="/" className="back-link">
        Volver al listado
      </Link>

      <div className="detail-grid">
        {/* IMAGE */}
        <div className="detail-image-wrapper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={book.title?.rendered}
              className="detail-image"
            />
          ) : (
            <div className="no-image">
              <span className="no-image-text">
                No cover available
              </span>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="detail-info">
          {/* WordPress devuelve HTML en el título */}
          <h1
            dangerouslySetInnerHTML={{
              __html: book.title?.rendered || "Sin título",
            }}
          />

          <p className="detail-date">
            📅 {formatDate(book.date)}
          </p>

          {/* CATEGORIES */}
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

      {/* WordPress devuelve HTML en el contenido */}
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