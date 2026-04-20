const BASE_URL = "https://dwec.leaderdreams.com/wp-json/wp/v2";

export const fetchPosts = async ({ search, category, page }) => {
  let url = `${BASE_URL}/posts?_embed&per_page=12&page=${page}`;

  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category) url += `&categories=${category}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}?_embed`);

  if (!res.ok) throw new Error("Post not found");

  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(
    `${BASE_URL}/categories?per_page=100`
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();

  return data.filter((cat) => cat.count > 0);
};
