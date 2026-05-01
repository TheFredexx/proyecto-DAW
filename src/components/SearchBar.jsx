import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = ({
    onSearch,
    category,
    onCategoryChange,
    categories,
    loading,
    error,
}) => {
    const [inputValue, setInputValue] = useState("");

    // 🔥 Sincronizar con estado externo
    useEffect(() => {
        setInputValue("");
    }, [category]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <form className="controls" onSubmit={handleSubmit} role="search">
            {/* SEARCH */}
            <div className="search-wrapper">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Buscar libros por título..."
                    value={inputValue}
                    onChange={handleChange}
                    aria-label="Buscar libros por título"
                />
            </div>

            {/* SELECT */}
            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                disabled={loading || !!error}
                aria-label="Filtrar por categoría"
            >
                <option value="">Todas las Categorías</option>

                {loading && <option disabled>Cargando categorías...</option>}
                {error && <option disabled>Error al cargar</option>}

                {!loading &&
                    !error &&
                    categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.count})
                        </option>
                    ))}
            </select>

            {/* BUTTON */}
            <button type="submit" className="search-btn">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;