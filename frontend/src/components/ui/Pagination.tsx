import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const navBtn =
    "inline-flex items-center gap-100 px-200 py-150 rounded-lg border text-preset-4 transition-colors";
  const pageBtn =
    "w-[40px] h-[40px] flex items-center justify-center rounded-lg border text-preset-4 transition-colors";

  return (
    <nav className="flex items-center justify-between gap-100" aria-label="Pagination">
      <button
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        className={`${navBtn} ${
          isFirst
            ? "bg-beige-500 border-beige-500 text-white cursor-not-allowed"
            : "bg-white border-grey-300 text-grey-900 hover:bg-grey-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      <div className="flex items-center gap-100">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${pageBtn} ${
              page === currentPage
                ? "bg-grey-900 border-grey-900 text-white"
                : "bg-white border-grey-300 text-grey-900 hover:bg-beige-500 hover:border-beige-500 hover:text-white"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        className={`${navBtn} ${
          isLast
            ? "bg-beige-500 border-beige-500 text-white cursor-not-allowed"
            : "bg-white border-grey-300 text-grey-900 hover:bg-grey-100"
        }`}
        aria-label="Next page"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
