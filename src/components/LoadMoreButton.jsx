const LoadMoreButton = ({ loading, hasMore, onClick }) => {
    if (!hasMore) {
        return <p className="loadmore-end">No more books</p>;
    }

    return (
        <div className="loadmore-container">
            <button
                onClick={onClick}
                disabled={loading}
                className="loadmore-btn"
            >
                {loading ? "Cargando..." : "Cargar Más"}
            </button>
        </div>
    );
};

export default LoadMoreButton;