import { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || "Error cargando categorías");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};
