import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

const SearchBar = ({ onSearch, category, onCategoryChange }) => {
    const [inputValue, setInputValue] = useState("");

    // ✅ cargar categorías
    const { categories, loading, error } = useCategories();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <form className="controls" onSubmit={handleSubmit}>
            {/* SEARCH */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Buscar libros..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            {/* SELECT */}
            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Todas las Categorías</option>

                {loading && <option>Cargando...</option>}
                {error && <option>Error cargando categorías</option>}

                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* BUTTON */}
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
};

export default SearchBar;