function Pagination({ page, hasMore, onPrev, onNext }) {
    return (
        <div className="pagination">
            <button 
                onClick={onPrev} 
                disabled={page === 1}
                aria-label="Página anterior"
            >
                ← Anterior
            </button>

            <span className="page-number" aria-current="page">Página {page}</span>

            <button 
                onClick={onNext} 
                disabled={!hasMore}
                aria-label="Página siguiente"
            >
                Siguiente →
            </button>
        </div>
    );
}

export default Pagination;