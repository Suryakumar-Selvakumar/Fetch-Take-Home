import { useEffect, useState, type JSX } from "react";
import { Input } from "./ui/input";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import type { FiltersState, SortState } from "@/pages/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import Button from "./ui/Button/button";
import type { SearchResult } from "@/pages/Search";
import Badge from "./ui/badge";
import { cn } from "@/utils/cn";
import { Xmark } from "iconoir-react";
import spotsBg from "@/assets/spots.png";

interface FilterbarProps {
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  updateSortBy: (value: string) => void;
  updateOrderBy: (value: string) => void;
  sort: SortState;
  searchResult: SearchResult;
  isFilterPageVisible: boolean;
  setIsFilterPageVisible: Dispatch<SetStateAction<boolean>>;
}

const sortItems = [
  {
    title: "Breed",
    value: "breed",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Age",
    value: "age",
  },
];

const orderItems = [
  {
    title: "Ascending",
    value: "asc",
  },
  {
    title: "Descending",
    value: "desc",
  },
];

export default function Filterbar({
  setFilters,
  updateSortBy,
  updateOrderBy,
  sort,
  searchResult,
  isFilterPageVisible,
  setIsFilterPageVisible,
}: FilterbarProps): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>("");
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

  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (searchInput != "") {
        setFilters((filters: FiltersState) => ({
          ...filters,
          search: [...filters.search, searchInput],
        }));
      }
      setSearchInput("");
    }
  };

  return (
    <section
      role={isMobileView ? "dialog" : "region"}
      aria-modal={isMobileView ? "true" : undefined}
      aria-label="Filterbar"
      className={cn(
        "flex w-full lg:max-w-screen-2xl lg:h-min lg:py-3 lg:self-center lg:justify-between lg:px-4",
        isMobileView
          ? `flex-col items-center p-4 gap-8 transition-opacity duration-300 ease-in-out fixed inset-0 overflow-hidden
        ${
          isFilterPageVisible
            ? "opacity-100 z-50 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        }`
          : ""
      )}
      style={{
        background: isMobileView ? `url(${spotsBg})` : "none",
        backgroundRepeat: isMobileView ? "repeat" : "none",
        backgroundSize: isMobileView ? "contain" : "none",
      }}
    >
      {isMobileView && isFilterPageVisible && (
        <button
          aria-label="Close filter menu"
          className="self-end rounded-sm"
          onClick={() => setIsFilterPageVisible(false)}
        >
          <Xmark fontSize={"1.5rem"} />
        </button>
      )}
      <div className="flex w-full lg:w-max gap-2 items-center">
        <Input
          autoComplete="on"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full lg:w-[300px] bg-white"
          type="input"
          placeholder="Enter City, State, or ZIP"
          onKeyDown={handleInputSubmit}
          data-testid="search-input"
          aria-label="Search by city, state, or ZIP code"
        />
        <Button
          onClick={() => {
            if (searchInput != "") {
              setFilters((filters) => ({
                ...filters,
                search: [...filters.search, searchInput],
              }));
              setSearchInput("");
            }
          }}
          data-testid="search-button"
          variant={"outline"}
          className="cursor-pointer"
          aria-label="Search"
        >
          Search
        </Button>
      </div>
      <Badge
        aria-live="polite"
        role="status"
        className="hidden lg:block text-xl text-valentino shadow-sm"
        variant={"secondary"}
      >
        {searchResult.total < 1000
          ? searchResult.total
          : String(searchResult.total / 1000).includes(".")
          ? `${(searchResult.total / 1000).toFixed(1)}K`
          : `${searchResult.total / 1000}K`}{" "}
        Dogs Found
      </Badge>
      <div className="flex w-full lg:w-max flex-col lg:flex-row gap-8 lg:gap-4">
        <Select value={sort.sortBy} onValueChange={updateSortBy}>
          <SelectTrigger
            aria-label="Sort dogs by"
            data-testid="sort-by-button"
            className="w-full lg:w-[155px] select-none bg-white cursor-pointer"
          >
            <span>
              Sort By:{" "}
              <span className="font-medium">
                {sortItems.find((item) => item.value === sort.sortBy)?.title}
              </span>
            </span>
          </SelectTrigger>
          <SelectContent className="w-[calc(100%-2px)]">
            <SelectGroup>
              {sortItems.map(({ title, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  data-testid={`${value}-option`}
                >
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={sort.orderBy} onValueChange={updateOrderBy}>
          <SelectTrigger
            aria-label="Order of sorting"
            data-testid="order-by-button"
            className="w-full lg:w-[200px] select-none bg-white cursor-pointer"
          >
            <span>
              Order By:{" "}
              <span className="font-medium">
                {orderItems.find((item) => item.value === sort.orderBy)?.title}
              </span>
            </span>
          </SelectTrigger>
          <SelectContent className="w-[calc(100%-2px)]">
            <SelectGroup>
              {orderItems.map(({ title, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  data-testid={`${value}-option`}
                >
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
