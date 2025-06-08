import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import spotsBg from "@/assets/spots.png";
import Filterbar from "@/components/Filterbar";
import Sidebar from "@/components/Sidebar";
import getSearchUrl from "@/utils/getSearchUrl";
import { getDogIds } from "@/utils/getDogIds";
import { getDogsData } from "@/utils/getDogsData";
import { Filters } from "@/components/Filters";
import Error from "@/components/Error";
import PaginationNav from "@/components/PaginationNav";
import Cards from "@/components/Cards";

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
  const [page, setPage] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const fetchDogsData = useCallback(
    async (curPage: number, prevPage: number): Promise<void | undefined> => {
      setError(null);
      setIsLoading(true);

      const controller = createAbortController();

      let url: string;

      if (curPage > prevPage) {
        url = await getSearchUrl(filters, sort, searchResult.next);
      } else if (curPage < prevPage) {
        url = await getSearchUrl(filters, sort, searchResult.prev);
      } else {
        url = await getSearchUrl(filters, sort, "");
      }

      try {
        const searchRes = await getDogIds(url, controller.signal);
        setSearchResult(searchRes);
        const dogObjs = await getDogsData(
          searchRes.resultIds,
          controller.signal
        );
        setDogs(dogObjs);

        console.log("Search Results:", searchRes);
        console.log("Dog Objects:", dogObjs);
        console.log("Page:", curPage);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("Aborted");
          return;
        } else if (err instanceof Error) {
          setError((err as Error).message);
        } else setError("An unknown error occured");
      } finally {
        setIsLoading(false);
        setPage(curPage);
      }
    },
    [filters, sort, searchResult.next, searchResult.prev]
  );

  useEffect(() => {
    return () => signalRef.current?.abort();
  }, []);

  useEffect(() => {
    fetchDogsData(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  const updateFilters = (filter: keyof FiltersState, value: string): void => {
    const updatedFilters: FiltersState = {
      ...filters,
      [filter]: Array.isArray(filters[filter])
        ? filters[filter].filter((val) => val !== value)
        : filter === "ageMin"
        ? 0
        : 15,
    };

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
      <div className="bg-white mt-4 w-full max-w-screen-2xl self-center grid grid-cols-[min-content_1fr]">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          updateAgeMin={updateAgeMin}
          updateAgeMax={updateAgeMax}
        />
        <div className="col-start-[2] flex flex-col gap-4">
          <Filters
            filters={filters}
            clearFilters={clearFilters}
            updateFilters={updateFilters}
          />
          <Error error={error} />
          {dogs.length && (
            <Cards dogs={dogs} favorites={favorites} isLoading={isLoading} />
          )}
          <PaginationNav
            page={page}
            searchResult={searchResult}
            fetchDogsData={fetchDogsData}
          />
        </div>
      </div>
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
    </main>
  );
}

export default Search;
