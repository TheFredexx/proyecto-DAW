import { useCategories } from "../hooks/useCategories";

const CategoryFilter = ({ onChange }) => {
    const { categories, loading, error } = useCategories();

    if (loading) return <p>Cargando categorías...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <select onChange={(e) => onChange(e.target.value)}>
            <option value="">Todas las Categorías</option>

            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default CategoryFilter;