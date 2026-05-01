import { Link } from "react-router-dom";
import {
  stripHtml,
  truncateText,
  formatDate,
  getFeaturedImage,
} from "../utils/format";

const BookCard = ({ book }) => {
  const imageUrl = getFeaturedImage(book);
  const rawTitle = book.title?.rendered || "Sin título";
  const cleanTitle = stripHtml(rawTitle);

  const categories =
    book._embedded?.["wp:term"]?.[0]?.filter(
      (cat) => cat.taxonomy === "category"
    ) || [];

  // Si no hay extracto, ponemos un texto amigable
  const excerptRaw = book.excerpt?.rendered || "";
  const excerpt = excerptRaw.trim() 
    ? truncateText(stripHtml(excerptRaw), 120)
    : "No hay una descripción disponible para este ejemplar.";

  const date = formatDate(book.date);

  return (
    <article className="book-card">
      <div className="card-img-container">
        {imageUrl ? (
          <img src={imageUrl} alt={cleanTitle} className="card-img" />
        ) : (
          <div className="no-image">
            <span className="no-image-text">Sin portada</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="card-categories">
          {categories.length > 0 ? (
            categories.slice(0, 2).map((cat) => (
              <span key={cat.id} className="category-tag">
                {cat.name}
              </span>
            ))
          ) : (
            <span className="category-tag-none">Sin categoría</span>
          )}
        </div>

        <h3
          className="card-title"
          dangerouslySetInnerHTML={{ __html: rawTitle }}
        />

        <p className="card-date">📅 {date}</p>

        <p className="card-excerpt">{excerpt}</p>

        <Link 
          to={`/book/${book.id}`} 
          className="btn-detail"
          aria-label={`Ver detalles de ${cleanTitle}`}
        >
          Ver Detalles
        </Link>
      </div>
    </article>
  );
};

export default BookCard;