import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationFavorites({
  page,
  fetchFavoriteDogs,
  favoritesPages,
}: {
  page: number;
  fetchFavoriteDogs: (curPage: number) => Promise<void | undefined>;
  favoritesPages: number;
}) {
  return (
    <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() => {
            if (page - 1 >= 0) fetchFavoriteDogs(page - 1);
          }}
        >
          <PaginationPrevious
            className={
              page - 1 < 0
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-white"
                : ""
            }
          />
        </PaginationItem>
        {page - 1 >= 0 && (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => fetchFavoriteDogs(page - 1)}
          >
            <PaginationLink>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page + 1 < favoritesPages && (
          <>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => {
                if (page + 1 < favoritesPages) fetchFavoriteDogs(page + 1);
              }}
            >
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
            {page + 2 < favoritesPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        <PaginationItem
          className="cursor-pointer"
          onClick={() => {
            if (page + 1 < favoritesPages) fetchFavoriteDogs(page + 1);
          }}
        >
          <PaginationNext
            className={
              !(page + 1 < favoritesPages)
                ? "text-muted-foreground hover:text-muted-foreground hover:bg-white"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
