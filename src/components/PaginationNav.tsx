import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination";

export default function PaginationNav({
  page,
  fetchDogsData,
}: {
  page: number;
  fetchDogsData: (value: number) => Promise<void | undefined>;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() => {
            if (page > 0) fetchDogsData(page - 1);
          }}
        >
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem onClick={() => fetchDogsData(page + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
