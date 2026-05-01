// Remove HTML tags and entities from WordPress content
export const stripHtml = (html = "") => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .trim();
};

// Limit text length
export const truncateText = (text = "", maxLength = 120) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + "...";
};

// Format date to readable string (ES)
export const formatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Fecha inválida";

  try {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Fecha no disponible";
  }
};

// Get featured image safely
export const getFeaturedImage = (book) => {
  return (
    book?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
  );
};