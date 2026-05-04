import { useEffect, useState } from "react";
import { fetchPosts, POSTS_PER_PAGE } from "../services/api";

const getScore = (post, search) => {
  if (!search) return 0;
  const title = post.title?.rendered?.toLowerCase() || "";
  const query = search.toLowerCase();
  if (title === query) return 3;
  if (title.startsWith(query)) return 2;
  if (title.includes(query)) return 1;
  return 0;
};

export const useBooks = (search, category, page, order) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const delay = search ? 500 : 0;

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPosts({
          search,
          category,
          page,
          signal: controller.signal,
        });

        // Ordenación personalizada basada en relevancia y fecha
        const sortedPosts = [...data].sort((a, b) => {
          const scoreDiff = getScore(b, search) - getScore(a, search);
          if (scoreDiff !== 0) return scoreDiff;
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return order === "asc" ? dateA - dateB : dateB - dateA;
        });

        setBooks(sortedPosts);
        setHasMore(data.length === POSTS_PER_PAGE);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error cargando los libros");
        }
      } finally {
        // Evita estado tras abortar la solicitud
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, delay);

    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [search, category, page, order]);

  return { books, loading, error, hasMore };
};
