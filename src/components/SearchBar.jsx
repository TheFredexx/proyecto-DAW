import { useState } from "react";

const SearchBar = ({
    onSearch,
    category,
    onCategoryChange,
    categories,
    loading,
    error,
}) => {
    const [inputValue, setInputValue] = useState("");

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
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;