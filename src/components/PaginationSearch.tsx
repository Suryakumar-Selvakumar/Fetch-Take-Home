import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { SearchResult } from "@/pages/Search";
import {
  useEffect,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export default function PaginationSearch({
  page,
  fetchDogsData,
  searchResult,
}: {
  page: number;
  fetchDogsData: (
    curPage: number,
    prevPage: number
  ) => Promise<void | undefined>;
  searchResult: SearchResult;
}) {
  const params: URLSearchParams = new URLSearchParams(searchResult.next);
  const from: string | null = params.get("from");
  const size: string | null = params.get("size");

  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = (event: MediaQueryListEvent): false | void =>
      setIsMobileView(event.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const hasPrev: boolean = searchResult.prev ? true : false;
  const hasNext: boolean = Number(from) < searchResult.total;

  const handlePrev = (e: MouseEvent | KeyboardEvent) => {
    if (hasPrev) {
      fetchDogsData(page - 1, page);
      if (isMobileView) window.scrollTo(0, 0);
      if (page - 2 < 0) (e.currentTarget as HTMLElement).blur();
    }
  };

  const handleNext = (e: MouseEvent | KeyboardEvent) => {
    if (hasNext) {
      fetchDogsData(page + 1, page);
      if (isMobileView) window.scrollTo(0, 0);
      if (!(Number(from) + Number(size) < searchResult.total))
        (e.currentTarget as HTMLElement).blur();
    }
  };

  return (
    <Pagination className="mt-2 mb-4">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            tabIndex={hasPrev ? 0 : -1}
            aria-disabled={!hasPrev}
            aria-label="Previous button"
            className={
              !hasPrev
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-transparent cursor-default select-none"
                : ""
            }
            data-testid="pagination-search-prev-button"
            onClick={handlePrev}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handlePrev(e);
            }}
          />
        </PaginationItem>
        {page - 1 >= 0 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              data-testid="pagination-search-prev-page"
              aria-label="Previous page"
              tabIndex={0}
              onClick={handlePrev}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePrev(e);
              }}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-default">
          <PaginationLink
            isActive
            aria-current="page"
            className="hover:bg-transparent"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {hasNext && (
          <>
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                tabIndex={0}
                data-testid="pagination-search-next-page"
                aria-label="Next page"
                onClick={handleNext}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNext(e);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            {Number(from) + Number(size) < searchResult.total && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            tabIndex={hasNext ? 0 : -1}
            aria-disabled={!hasNext}
            aria-label="Next button"
            data-testid="pagination-search-next-button"
            onClick={handleNext}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleNext(e);
            }}
            className={
              !hasNext
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-transparent cursor-default select-none"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
