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
  const params = new URLSearchParams(searchResult.next);
  const from: string | null = params.get("from");
  const size: string | null = params.get("size");

  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches || false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = () => mediaQuery.matches && setIsMobileView(true);

    window.addEventListener("change", handleMediaChange);

    return () => window.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <Pagination className="mt-2 mb-4">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
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
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-white"
                : ""
            }
          />
        </PaginationItem>
        {page - 1 >= 0 && (
          <PaginationItem
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
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-white"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
