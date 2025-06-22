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
import { useEffect, useState } from "react";

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

  return (
    <Pagination className="mt-2 mb-4">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          data-testid="pagination-search-prev-button"
          onClick={() => {
            if (searchResult.prev) {
              fetchDogsData(page - 1, page);
              if (isMobileView) window.scrollTo(0, 0);
            }
          }}
        >
          <PaginationPrevious
            className={
              !searchResult.prev
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-transparent cursor-default select-none"
                : ""
            }
          />
        </PaginationItem>
        {page - 1 >= 0 && (
          <PaginationItem
            data-testid="pagination-search-prev-page"
            className="cursor-pointer"
            onClick={() => {
              if (searchResult.prev) {
                fetchDogsData(page - 1, page);
                if (isMobileView) window.scrollTo(0, 0);
              }
            }}
          >
            <PaginationLink>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {Number(from) < searchResult.total && (
          <>
            <PaginationItem
              className="cursor-pointer"
              data-testid="pagination-search-next-page"
              onClick={() => {
                fetchDogsData(page + 1, page);
                if (isMobileView) window.scrollTo(0, 0);
              }}
            >
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
            {Number(from) + Number(size) < searchResult.total && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem
          data-testid="pagination-search-next-button"
          className="cursor-pointer"
          onClick={() => {
            if (Number(from) < searchResult.total) {
              fetchDogsData(page + 1, page);
              if (isMobileView) window.scrollTo(0, 0);
            }
          }}
        >
          <PaginationNext
            className={
              !(Number(from) < searchResult.total)
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-transparent cursor-default select-none"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
