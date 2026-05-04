// Eliminar etiquetas HTML y decodificar entidades
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

// Limitar texto a un número de caracteres sin cortar palabras
export const truncateText = (text = "", maxLength = 120) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + "...";
};

// Formatear fecha a formato legible en español
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

// obtener URL de imagen destacada de un libro
export const getFeaturedImage = (book) => {
  return book?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
};
