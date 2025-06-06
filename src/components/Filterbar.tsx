import { useState, type JSX } from "react";
import { Input } from "./input";
import type { Dispatch, SetStateAction } from "react";
import type { FilterState, SortState } from "@/pages/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./select";
import { Button } from "./button";

interface FilterbarProps {
  setFilters: Dispatch<SetStateAction<FilterState>>;
  updateSortBy: (value: string) => void;
  updateOrderBy: (value: string) => void;
  sort: SortState;
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
}: FilterbarProps): JSX.Element {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="bg-white w-full max-w-screen-xl h-min py-3 flex self-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Input
          autoComplete="on"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[300px]"
          type="input"
          placeholder="Enter City, State, or ZIP"
        />
        <Button
          onClick={() =>
            setFilters((filters) => ({
              ...filters,
              search: [...filters.search, searchInput],
            }))
          }
          variant={"outline"}
          className="cursor-pointer"
        >
          Search
        </Button>
      </div>
      <div className="flex gap-4">
        <Select value={sort.sortBy} onValueChange={updateSortBy}>
          <SelectTrigger className="w-[150px]">
            <span>
              Sort By:{" "}
              <span className="font-medium">
                {sortItems.find((item) => item.value === sort.sortBy)?.title}
              </span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortItems.map(({ title, value }) => (
                <SelectItem key={value} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={sort.orderBy} onValueChange={updateOrderBy}>
          <SelectTrigger className="w-[200px]">
            <span>
              Order By:{" "}
              <span className="font-medium">
                {orderItems.find((item) => item.value === sort.orderBy)?.title}
              </span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {orderItems.map(({ title, value }) => (
                <SelectItem key={value} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
