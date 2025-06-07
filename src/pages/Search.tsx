import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import spotsBg from "@/assets/spots.png";
import Filterbar from "@/components/Filterbar";
import Sidebar from "@/components/Sidebar";
import getSearchUrl from "@/utils/getSearchUrl";
import { getDogIds } from "@/utils/getDogIds";
import { getDogsData } from "@/utils/getDogsData";
import { Filters } from "@/components/Filters";

export type FiltersState = {
  search: string[];
  breeds: string[];
  ageMin: number;
  ageMax: number;
};

export type SortState = {
  sortBy: string;
  orderBy: string;
};

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResult {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

function Search() {
  const [filters, setFilters] = useState<FiltersState>({
    search: [],
    breeds: [],
    ageMin: 0,
    ageMax: 15,
  });
  const [sort, setSort] = useState<SortState>({
    sortBy: "breed",
    orderBy: "asc",
  });
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult>({
    resultIds: [],
    total: 0,
    next: "",
    prev: "",
  });
  const [pageDirection, setPageDirection] = useState("");
  const signalRef = useRef<AbortController>(null);

  const updateSortBy = (sortBy: string): void => {
    setSort((sort) => ({ ...sort, sortBy: sortBy }));
  };

  const updateOrderBy = (orderBy: string): void => {
    setSort((sort) => ({ ...sort, orderBy: orderBy }));
  };

  const updateAgeMin = (ageMin: number[]): void => {
    setFilters((prev: FiltersState) => ({ ...prev, ageMin: ageMin[0] }));
  };

  const updateAgeMax = (ageMax: number[]): void => {
    setFilters((prev: FiltersState) => ({ ...prev, ageMax: ageMax[0] }));
  };

  function createAbortController() {
    signalRef.current?.abort();
    const controller = new AbortController();
    signalRef.current = controller;
    return controller;
  }

  async function fetchDogsData() {
    const controller = createAbortController();

    let url: string;

    // pageDirection will be set based on
    // whether the user clicked the next or prev pagination buttons.
    // Will be "" if the user hasn't clicked on either
    if (pageDirection === "next") {
      url = await getSearchUrl(filters, sort, searchResult.next);
    } else if (pageDirection === "prev") {
      url = await getSearchUrl(filters, sort, searchResult.prev);
    } else {
      url = await getSearchUrl(filters, sort, "");
    }

    // Reset back to "" for next fetch
    setPageDirection("");

    try {
      const searchRes = await getDogIds(url, controller.signal);
      setSearchResult(searchRes);
      const dogObjs = await getDogsData(searchRes.resultIds, controller.signal);
      setDogs(dogObjs);

      console.log("Search Results:", searchRes);
      console.log("Dogs Results:", dogObjs);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("Aborted");
        return;
      }
    }
  }

  useEffect(() => {
    return () => signalRef.current?.abort();
  }, []);

  useEffect(() => {
    fetchDogsData();
  }, [filters, sort]);

  const updateFilters = (filter: string, value: string): void => {
    const updatedFilters = Object.fromEntries(
      Object.entries(filters).map(([f, v]) => {
        if (f === filter) {
          if (Array.isArray(v)) {
            return [f, v.filter((val) => val !== value)];
          } else if (f === "ageMin") {
            return [f, 0];
          } else {
            return [f, 15];
          }
        } else {
          return [f, v];
        }
      })
    );
    setFilters(updatedFilters);
  };

  const clearFilters = (): void => {
    setFilters({
      search: [],
      breeds: [],
      ageMin: 0,
      ageMax: 15,
    });
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
      <div className="bg-white mt-4 w-full max-w-screen-2xl self-center grid grid-cols-[max-content_1fr]">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          updateAgeMin={updateAgeMin}
          updateAgeMax={updateAgeMax}
        />
        <Filters
          filters={filters}
          clearFilters={clearFilters}
          updateFilters={updateFilters}
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
