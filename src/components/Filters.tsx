import type { FiltersState } from "@/pages/Search";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface FiltersProps {
  filters: FiltersState;
  updateFilters: (filter: keyof FiltersState, value: string) => void;
  clearFilters: () => void;
}

export function Filters({
  filters,
  updateFilters,
  clearFilters,
}: FiltersProps) {
  const [showFilterApplied, setShowFiltersApplied] = useState<boolean>(true);

  const filterArr: { filter: string; value: string }[] = Object.entries(
    filters
  ).flatMap(([filter, value]) =>
    Array.isArray(value)
      ? value.map((v) => ({ filter, value: String(v) }))
      : [{ filter, value: String(value) }]
  );

  useEffect(() => {
    if (filterArr.length === 2) {
      const booleanArr: boolean[] = [];
      filterArr.forEach(({ filter, value }) => {
        if (
          (filter === "ageMin" && value === "0") ||
          (filter === "ageMax" && value === "15")
        ) {
          booleanArr.push(false);
        } else booleanArr.push(true);
      });
      if (booleanArr.includes(true)) setShowFiltersApplied(true);
      else setShowFiltersApplied(false);
    } else setShowFiltersApplied(true);
  }, [filterArr]);

  const processFilter = (filter: string): string => {
    switch (filter) {
      case "breeds":
        return "";

      case "search":
        return "";

      case "ageMin":
        return "Min Age: ";

      case "ageMax":
        return "Max Age: ";

      default:
        return "";
    }
  };

  return (
    <>
      {showFilterApplied && (
        <div className="flex flex-col gap-2 p-4">
          <p className="text-base font-medium">Filters Applied</p>
          <div className="flex flex-wrap gap-4">
            {filterArr.map(({ filter, value }) =>
              value != "0" && value != "15" ? (
                <div
                  key={`${filter}-${value}`}
                  className="col-span-3 bg-valentino-hv h-max py-1 px-2 rounded-sm text-white flex text-sm items-center justify-between gap-4"
                >
                  <span>
                    {processFilter(filter)}
                    {value}
                  </span>
                  <X
                    size={"16"}
                    strokeWidth={"3"}
                    onClick={() =>
                      updateFilters(filter as keyof FiltersState, value)
                    }
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                ""
              )
            )}
            <Button
              variant={"link"}
              className="cursor-pointer p-0 text-valentino-hv"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
