const BASE_URL = "https://dwec.leaderdreams.com/wp-json/wp/v2";

// Constante para mantener la coherencia en toda la app
export const POSTS_PER_PAGE = 12;

export const fetchPosts = async ({ search, category, page = 1 }) => {
  const params = new URLSearchParams({
    _embed: '', // Fundamental para traer imágenes y categorías en una sola petición
    per_page: POSTS_PER_PAGE,
    page: page
  });

  if (search) params.append("search", search);
  if (category) params.append("categories", category);

  const res = await fetch(`${BASE_URL}/posts?${params.toString()}`);

  if (res.status === 400) {
    // Si pedimos una página que no existe (ej. la 50), devolvemos vacío en lugar de romper
    return [];
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se pudo conectar con el servidor`);
  }

  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}?_embed`);
  if (!res.ok) throw new Error("Libro no encontrado");
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories?per_page=100`);
  if (!res.ok) throw new Error("Error al cargar categorías");
  
  const data = await res.json();
  // Solo mostramos categorías que tengan contenido real
  return data.filter((cat) => cat.count > 0);
};