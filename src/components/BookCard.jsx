import { Link } from "react-router-dom";
import {
  stripHtml,
  truncateText,
  formatDate,
} from "../utils/format";

const BookCard = ({ book }) => {
  // 🔥 FIX: NO usar placeholder → null si no hay imagen
  const imageUrl =
    book._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  const categories =
    book._embedded?.["wp:term"]?.[0] || [];

  const title = book.title?.rendered || "Untitled";

  // ✅ utils bien usadas
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