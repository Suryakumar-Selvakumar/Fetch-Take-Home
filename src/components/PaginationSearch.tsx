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

  return (
    <Pagination className="mt-2 mb-4">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() => {
            if (searchResult.prev) fetchDogsData(page - 1, page);
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
              if (searchResult.prev) fetchDogsData(page - 1, page);
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
                if (Number(from) < searchResult.total)
                  fetchDogsData(page + 1, page);
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
            if (Number(from) < searchResult.total)
              fetchDogsData(page + 1, page);
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
