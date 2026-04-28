import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

// 1. FUNCIÓN PURA: Fuera del hook para evitar recrearla en cada render y facilitar testing
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
    // 2. CONTROL DE RACE CONDITIONS: Variable de control
    let isMounted = true;

    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPosts({ search, category, page });

        // Si la petición tarda y el usuario ya cambió de filtro, ignoramos el resultado
        if (!isMounted) return;

        // 3. FILTRADO: Limpiamos contenido vacío
        const validPosts = data.filter(
          (post) => post.content?.rendered?.trim()
        );

        // 4. ORDENACIÓN: Basada en la lógica de negocio requerida
        const sortedPosts = [...validPosts].sort((a, b) => {
          const scoreDiff = getScore(b, search) - getScore(a, search);
          
          if (scoreDiff !== 0) return scoreDiff;

          return order === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });

        setBooks(sortedPosts);
        
        // El número 12 debe ser constante según tu per_page en api.js
        setHasMore(data.length === 12);
      } catch (err) {
        if (isMounted) setError(err.message || "Error loading books");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBooks();

    // 5. CLEANUP FUNCTION: Se ejecuta al desmontar o antes del siguiente efecto
    return () => {
      isMounted = false;
    };
  }, [search, category, page, order]);

  return { books, loading, error, hasMore };
};