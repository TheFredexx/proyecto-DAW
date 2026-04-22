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

        const data = await fetchPosts({
          search,
          category,
          page,
        });

        // ✅ filtrar contenido válido
        const validPosts = data.filter(
          (post) =>
            post.content?.rendered &&
            post.content.rendered.trim() !== ""
        );

        // 🔥 FUNCIÓN DE RELEVANCIA
        const getScore = (post) => {
          if (!search) return 0;

          const title = post.title.rendered.toLowerCase();
          const query = search.toLowerCase();

          if (title === query) return 3;
          if (title.startsWith(query)) return 2;
          if (title.includes(query)) return 1;
          return 0;
        };

        // 🔥 ORDEN FINAL (RELEVANCIA + FECHA)
        const sortedPosts = [...validPosts].sort((a, b) => {
          const scoreDiff = getScore(b) - getScore(a);

          if (scoreDiff !== 0) return scoreDiff;

          return order === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });

        setBooks(sortedPosts);

        setHasMore(data.length === 12);
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