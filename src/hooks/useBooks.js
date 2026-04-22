import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

export const useBooks = (search, category, page, order) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // 🔥 PRO

    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPosts({
          search,
          category,
          page,
          signal: controller.signal, // 🔥 cancelación
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

          const title = post.title?.rendered?.toLowerCase() || "";
          const query = search.toLowerCase();

          if (title === query) return 3;
          if (title.startsWith(query)) return 2;
          if (title.includes(query)) return 1;
          return 0;
        };

        // 🔥 ORDEN FINAL
        const sortedPosts = [...validPosts].sort((a, b) => {
          // prioridad por búsqueda
          const scoreDiff = getScore(b) - getScore(a);
          if (scoreDiff !== 0) return scoreDiff;

          // fallback por fecha
          return order === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });

        setBooks(sortedPosts);

        // ✅ paginación simple (válida para el proyecto)
        setHasMore(data.length === 12);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error loading books");
        }
      } finally {
        setLoading(false);
      }
    };

    loadBooks();

    // 🔥 limpieza (nivel pro)
    return () => controller.abort();
  }, [search, category, page, order]);

  return { books, loading, error, hasMore };
};