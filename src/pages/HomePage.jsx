import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useCategories } from "../hooks/useCategories";

import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { books, loading, error, hasMore } = useBooks(
    search,
    category,
    page,
    order
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
    setPage(1);
  };

  return (
    <main>
      <header className="app-header">
        <div className="hero-content">
          <h1 className="hero-title">Biblioteca</h1>
          <p className="hero-subtitle">
            Descubre y explora miles de libros
          </p>
        </div>
      </header>

      <SearchBar
        onSearch={handleSearch}
        category={category}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        loading={loadingCategories}
        error={errorCategories}
      />

      <div className="order-container">
        <select
          className="order-select"
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguos</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Cargando libros...</div>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : books.length === 0 ? (
        <p className="empty">Libros no encontrados</p>
      ) : (
        <>
          <BookList books={books} />
          <Pagination
            page={page}
            hasMore={hasMore}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
        </>
      )}
    </main>
  );
};

export default HomePage;