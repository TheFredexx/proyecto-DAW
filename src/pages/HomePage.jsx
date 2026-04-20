import { useState } from "react";
import { useBooks } from "../hooks/useBooks";

import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import LoadMoreButton from "../components/LoadMoreButton";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  // 🔥 NUEVO
  const [order, setOrder] = useState("desc");

  const { books, loading, error, hasMore } = useBooks(
    search,
    category,
    page,
    order // 🔥 IMPORTANTE
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
      {/* ================= HEADER ================= */}
      <header className="app-header">
        <div className="hero-content">
          <h1 className="hero-title">Biblioteca</h1>
          <p className="hero-subtitle">
            Descubre y explora miles de libros
          </p>
        </div>
      </header>

      {/* ================= CONTROLS ================= */}
      <SearchBar
        onSearch={handleSearch}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* 🔥 ORDER SELECT (NUEVO) */}
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

      {/* ================= STATES ================= */}

      {loading && books.length === 0 && (
        <p className="text-center">Cargando Libros...</p>
      )}

      {error && <p className="error">Error: {error}</p>}

      {!loading && books.length === 0 && !error && (
        <p className="empty">Libros no encontrados</p>
      )}

      {/* ================= LIST ================= */}
      {books.length > 0 && <BookList books={books} />}

      {/* ================= LOAD MORE ================= */}
      {books.length > 0 && (
        <LoadMoreButton
          loading={loading}
          hasMore={hasMore}
          onClick={() => setPage((p) => p + 1)}
        />
      )}

      {loading && books.length > 0 && (
        <p className="text-center">Cargando más libros...</p>
      )}
    </main>
  );
};

export default HomePage;