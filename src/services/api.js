const BASE_URL = "https://dwec.leaderdreams.com/wp-json/wp/v2";

export const POSTS_PER_PAGE = 12;

const handleResponse = async (res) => {
  if (res.status === 400) return [];

  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se pudo conectar con el servidor`);
  }

  return res.json();
};

export const fetchPosts = async ({ search, category, page = 1, signal }) => {
  const params = new URLSearchParams({
    _embed: "",
    per_page: POSTS_PER_PAGE,
    page: page,
  });

  if (search) params.append("search", search);
  if (category) params.append("categories", category);

  const res = await fetch(`${BASE_URL}/posts?${params.toString()}`, {
    signal,
  });

  return handleResponse(res);
};

export const fetchPostById = async (id, { signal } = {}) => {
  const res = await fetch(`${BASE_URL}/posts/${id}?_embed`, { signal });

  if (!res.ok) {
    throw new Error("Libro no encontrado");
  }

  return res.json();
};

export const fetchCategories = async ({ signal } = {}) => {
  const res = await fetch(`${BASE_URL}/categories?per_page=100`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Error al cargar categorías");
  }

  const data = await res.json();

  return data.filter((cat) => cat.count > 0);
};