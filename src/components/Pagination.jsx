function Pagination({ page, hasMore, onPrev, onNext }) {
    return (
        <div className="pagination">
            <button onClick={onPrev} disabled={page === 1}>
                ← Anterior
            </button>
            <span className="page-number">Página {page}</span>
            <button onClick={onNext} disabled={!hasMore}>
                Siguiente →
            </button>
        </div>
    );
}

export default Pagination;
