import { Link } from "react-router-dom";
import {
  stripHtml,
  truncateText,
  formatDate,
  getFeaturedImage,
} from "../utils/format";

const BookCard = ({ book }) => {
  // ✅ usar utilidad correctamente
  const imageUrl = getFeaturedImage(book);

  // 🔥 FIX categorías (solo taxonomy "category")
  const categories =
    book._embedded?.["wp:term"]?.[0]?.filter(
      (cat) => cat.taxonomy === "category"
    ) || [];

  const title = book.title?.rendered || "Untitled";

  // ✅ utils bien aplicadas
  const excerpt = truncateText(
    stripHtml(book.excerpt?.rendered || "")
  );

  const date = formatDate(book.date);

  return (
    <article className="book-card">
      <div className="card-img-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="card-img" />
        ) : (
          <div className="no-image">
            <span className="no-image-text">
              No cover available
            </span>
          </div>
        )}
      </div>

      <div className="card-body">
        {/* CATEGORÍAS */}
        {categories.length > 0 && (
          <div className="card-categories">
            {categories.slice(0, 2).map((cat) => (
              <span key={cat.id} className="category-tag">
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* WordPress devuelve HTML en el título */}
        <h3
          className="card-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p className="card-date">📅 {date}</p>

        <p className="card-excerpt">{excerpt}</p>

        <Link to={`/book/${book.id}`} className="btn-detail">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
};

export default BookCard;