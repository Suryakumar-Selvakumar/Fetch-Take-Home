import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import spotsBg from "@/assets/spots.png";
import Filterbar from "@/components/Filterbar";
import Sidebar from "@/components/Sidebar";

export type FilterState = {
  search: string[];
  breeds: string[];
  ageMin: number;
  ageMax: number;
};

export type SortState = {
  sortBy: string;
  orderBy: string;
};

function Search() {
  const [filters, setFilters] = useState<FilterState>({
    search: [],
    breeds: [],
    ageMin: 0,
    ageMax: 29,
  });
  const [sort, setSort] = useState<SortState>({
    sortBy: "breed",
    orderBy: "asc",
  });

  const updateSortBy = (sortBy: string): void => {
    setSort((sort) => ({ ...sort, sortBy: sortBy }));
  };

  const updateOrderBy = (orderBy: string): void => {
    setSort((sort) => ({ ...sort, orderBy: orderBy }));
  };

  const updateAgeMin = (ageMin: number[]): void => {
    setFilters((prev: FilterState) => ({ ...prev, ageMin: ageMin[0] }));
  };

  const updateAgeMax = (ageMax: number[]): void => {
    setFilters((prev: FilterState) => ({ ...prev, ageMax: ageMax[0] }));
  };

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <Filterbar
        setFilters={setFilters}
        updateSortBy={updateSortBy}
        updateOrderBy={updateOrderBy}
        sort={sort}
      />
      <div className="bg-white mt-4 w-full max-w-screen-2xl self-center">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          updateAgeMin={updateAgeMin}
          updateAgeMax={updateAgeMax}
        />
      </div>
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
    </main>
  );
}

export default Search;
