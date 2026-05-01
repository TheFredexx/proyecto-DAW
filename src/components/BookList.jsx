import BookCard from "./BookCard";

const BookList = ({ books }) => {
    // Ordenar: libros con imagen primero para que la rejilla sea estéticamente mejor
    const sortedBooks = [...books].sort((a, b) => {
        const hasImgA = a._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? 1 : 0;
        const hasImgB = b._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? 1 : 0;
        return hasImgB - hasImgA;
    });

    return (
        <section className="book-grid">
            {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </section>
    );
};

export default BookList;