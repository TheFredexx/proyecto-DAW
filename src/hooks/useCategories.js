import { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCategories({ signal: controller.signal });
        //  Filtrar categorías vacías y ordenar por nombre
        const cleaned = data
          .filter((cat) => cat.count > 0)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCategories(cleaned);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error cargando categorías");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return { categories, loading, error };
};
