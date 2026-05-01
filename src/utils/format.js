// Remove HTML tags and entities from WordPress content
export const stripHtml = (html = "") => {
  if (!html) return "";
  // Eliminamos etiquetas HTML y luego entidades comunes de WP
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
};

// Limit text length
export const truncateText = (text = "", maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Format date to readable string (ES)
export const formatDate = (dateString) => {
  if (!dateString) return "Fecha no disponible";
  const date = new Date(dateString);
  // Verificamos si la fecha es válida antes de formatear
  return isNaN(date.getTime()) 
    ? "Fecha inválida" 
    : date.toLocaleDateString("es-ES", {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
};

// Get featured image safely
export const getFeaturedImage = (book) => {
  return book?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
};