function Pagination({ page, hasMore, onPrev, onNext }) {
  const isFirstPage = page === 1;
  const isLastPage = !hasMore;

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstPage}
        aria-disabled={isFirstPage}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span className="page-number" aria-current="page">
        Página {page}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isLastPage}
        aria-disabled={isLastPage}
        aria-label="Página siguiente"
      >
        Siguiente →
      </button>
    </div>
  );
}

export default Pagination;