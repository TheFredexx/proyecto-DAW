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
    let isMounted = true;

    const delay = search ? 500 : 0; 
    
    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPosts({ search, category, page });

        if (!isMounted) return;

        /**
         * 🛠️ CORRECCIÓN PARA EL GRID:
         * He eliminado el .filter() que borraba los libros sin contenido.
         * Ahora 'data' mantiene la cantidad exacta de elementos que devuelve la API.
         * Así el grid siempre estará lleno (12 elementos).
         */
        
        // Lógica de ordenación (ahora sobre todos los libros recibidos)
        const sortedPosts = [...data].sort((a, b) => {
          const scoreDiff = getScore(b, search) - getScore(a, search);
          
          if (scoreDiff !== 0) return scoreDiff;

          return order === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });

        setBooks(sortedPosts);
        
        // Comprobación de paginación robusta
        setHasMore(data.length === POSTS_PER_PAGE);

      } catch (err) {
        if (isMounted) setError(err.message || "Error cargando los libros");
      } finally {
        if (isMounted) setLoading(false);
      }
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(handler);
    };
  }, [search, category, page, order]);

  return { books, loading, error, hasMore };
};