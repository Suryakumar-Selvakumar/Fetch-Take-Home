import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useEffect,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export default function PaginationFavorites({
  page,
  fetchFavoriteDogs,
  favoritesPages,
}: {
  page: number;
  fetchFavoriteDogs: (curPage: number) => Promise<void | undefined>;
  favoritesPages: number;
}) {
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

  const hasPrev: boolean = page - 1 >= 0;
  const hasNext: boolean = page + 1 < favoritesPages;

  const handlePrev = (e: MouseEvent | KeyboardEvent) => {
    if (hasPrev) {
      fetchFavoriteDogs(page - 1);
      if (isMobileView) window.scrollTo(0, 0);
      if (page - 2 < 0) (e.currentTarget as HTMLElement).blur();
    }
  };

  const handleNext = (e: MouseEvent | KeyboardEvent) => {
    if (hasNext) {
      fetchFavoriteDogs(page + 1);
      if (isMobileView) window.scrollTo(0, 0);
      if (!(page + 2 < favoritesPages)) (e.currentTarget as HTMLElement).blur();
    }
  };

  return (
    <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            tabIndex={hasPrev ? 0 : -1}
            aria-disabled={!hasPrev}
            aria-label="Previous button"
            onClick={handlePrev}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handlePrev(e);
            }}
            data-testid="pagination-favorites-prev-button"
            className={
              !hasPrev
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-transparent cursor-default select-none"
                : ""
            }
          />
        </PaginationItem>
        {hasPrev && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              tabIndex={0}
              aria-label="Previous page"
              onClick={handlePrev}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePrev(e);
              }}
              data-testid="pagination-favorites-prev-page"
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
                aria-label="Next page"
                onClick={handleNext}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNext(e);
                }}
                data-testid="pagination-favorites-next-page"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            {page + 2 < favoritesPages && (
              <PaginationItem>
                <PaginationEllipsis aria-hidden="true" />
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            tabIndex={hasNext ? 0 : -1}
            aria-disabled={!hasNext}
            aria-label="Next button"
            data-testid="pagination-favorites-next-button"
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
