import { useMemo } from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      const hasImgA =
        a._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? 1 : 0;
      const hasImgB =
        b._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? 1 : 0;
      return hasImgB - hasImgA;
    });
  }, [books]);

  return (
    <section className="book-grid">
      {sortedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
};

export default BookList;