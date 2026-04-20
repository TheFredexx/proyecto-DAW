import BookCard from "./BookCard";

const BookList = ({ books }) => {
    // ✅ separar libros con y sin imagen
    const booksWithImage = books.filter(
        (b) => b._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    );

    const booksWithoutImage = books.filter(
        (b) => !b._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    );

    // ✅ combinar (primero con imagen)
    const sortedBooks = [...booksWithImage, ...booksWithoutImage];

    return (
        <section className="book-grid">
            {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </section>
    );
};

export default BookList;