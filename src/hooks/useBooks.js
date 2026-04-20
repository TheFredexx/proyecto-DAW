import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

export const useBooks = (search, category, page, order) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPosts({ search, category, page });

        // ✅ filtrar contenido vacío
        const validPosts = data.filter(
          (post) =>
            post.content?.rendered &&
            post.content.rendered.trim() !== ""
        );

        setBooks((prev) => {
          const combined =
            page === 1 ? validPosts : [...prev, ...validPosts];

          // ✅ ordenar por fecha
          return [...combined].sort((a, b) => {
            return order === "asc"
              ? new Date(a.date) - new Date(b.date)
              : new Date(b.date) - new Date(a.date);
          });
        });

        setHasMore(validPosts.length > 0);
      } catch (err) {
        setError(err.message || "Error loading books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [search, category, page, order]);

  return { books, loading, error, hasMore };
};