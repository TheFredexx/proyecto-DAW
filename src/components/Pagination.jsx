function Pagination({ page, hasMore, onPrev, onNext }) {
    return (
        <div className="pagination">
            {/* Se deshabilita si estamos en la primera página */}
            <button 
                onClick={onPrev} 
                disabled={page === 1}
            >
                ← Anterior
            </button>

            <span className="page-number">Página {page}</span>

            {/* Se deshabilita si hasMore es false (no hay más libros) */}
            <button 
                onClick={onNext} 
                disabled={!hasMore}
            >
                Siguiente →
            </button>
        </div>
    );
}

export default Pagination;