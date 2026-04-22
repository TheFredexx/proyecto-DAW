// Remove HTML tags from WordPress content
export const stripHtml = (html = "") => {
  return html.replace(/<[^>]*>/g, "");
};

// Limit text length
export const truncateText = (text, maxLength = 120) => {
  if (!text) return "";

  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

// Format date to readable string (ES)
export const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("es-ES");
};

// Get featured image safely (🔥 SIN placeholder)
export const getFeaturedImage = (book) => {
  return (
    book?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null
  );
};