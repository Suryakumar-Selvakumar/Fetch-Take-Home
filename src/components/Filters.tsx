import type { FiltersState } from "@/pages/Search";
import { X } from "lucide-react";
import Button from "./ui/Button/button";
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
      filterArr.forEach(
        ({ filter, value }: { filter: string; value: string }) => {
          if (
            (filter === "ageMin" && value === "0") ||
            (filter === "ageMax" && value === "15")
          ) {
            booleanArr.push(false);
          } else booleanArr.push(true);
        }
      );
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
        <section
          role="region"
          aria-label="Applied Filters"
          className="flex flex-col gap-2 p-4 select-none col-span-full lg:col-span-1 row-start-1 row-end-1 lg:row-start-2 lg:row-end-2"
        >
          <p role="heading" aria-level={3} className="text-base font-medium">
            Filters Applied
          </p>
          <ul className="flex lg:flex-wrap gap-4 items-center overflow-x-scroll lg:overflow-auto">
            {filterArr.map(({ filter, value }) =>
              value != "0" && value != "15" ? (
                <li
                  key={`${filter}-${value}`}
                  className="bg-valentino-hv h-max py-1 px-2 rounded-sm text-white flex text-sm items-center justify-between gap-4"
                >
                  <span className="w-max" data-testid="filter-text">
                    {processFilter(filter)}
                    {value}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove filter ${processFilter(
                      filter
                    )}${value}`}
                    onClick={() =>
                      updateFilters(filter as keyof FiltersState, value)
                    }
                    className="cursor-pointer"
                    data-testid="filter-close"
                  >
                    <X size={"16"} strokeWidth={"3"} />
                  </button>
                </li>
              ) : (
                ""
              )
            )}
            <li
              aria-label="Clear all filters"
              data-testid="clear-all-button"
              onClick={clearFilters}
            >
              <Button
                variant={"link"}
                className="cursor-pointer p-0 text-valentino-hv max-h-min"
              >
                Clear All
              </Button>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
