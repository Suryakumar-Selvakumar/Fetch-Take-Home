import { useState, type JSX } from "react";
import { Input } from "./ui/input";
import type {
  Dispatch,
  KeyboardEvent,
  KeyboardEventHandler,
  SetStateAction,
} from "react";
import type { FiltersState, SortState } from "@/pages/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Button } from "./ui/button";

interface FilterbarProps {
  setFilters: Dispatch<SetStateAction<FiltersState>>;
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

  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (searchInput != "") {
        setFilters((filters) => ({
          ...filters,
          search: [...filters.search, searchInput],
        }));
      }
      setSearchInput("");
    }
  };

  return (
    <div className="w-full max-w-screen-2xl h-min py-3 flex self-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Input
          autoComplete="on"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[300px] bg-white"
          type="input"
          placeholder="Enter City, State, or ZIP"
          onKeyDown={handleInputSubmit}
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
          variant={"outline"}
          className="cursor-pointer"
        >
          Search
        </Button>
      </div>
      <div className="flex gap-4">
        <Select value={sort.sortBy} onValueChange={updateSortBy}>
          <SelectTrigger className="w-[150px] select-none bg-white">
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
          <SelectTrigger className="w-[200px] select-none bg-white">
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
