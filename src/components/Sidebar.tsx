import type { FiltersState } from "@/pages/Search";
import {
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "./ui/slider";
import { Xmark } from "iconoir-react";
import spotsBg from "@/assets/spots.png";

interface SidebarProps {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  updateAgeMin: (value: number[]) => void;
  updateAgeMax: (value: number[]) => void;
  isSidebarPageVisible: boolean;
  setIsSidebarPageVisible: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  filters,
  setFilters,
  updateAgeMin,
  updateAgeMax,
  isSidebarPageVisible,
  setIsSidebarPageVisible,
}: SidebarProps): JSX.Element {
  const { breeds, ageMin, ageMax } = filters;
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = (event: MediaQueryListEvent): false | void =>
      setIsMobileView(event.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    async function fetchBreeds() {
      await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        credentials: "include",
      })
        .then((res: Response) => res.json())
        .then((vals: string[]) => setAllBreeds(vals));
    }

    fetchBreeds();

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const toggleSelection = (value: string): void => {
    setFilters((prev: FiltersState) =>
      prev.breeds.includes(value)
        ? { ...prev, breeds: prev.breeds.filter((v: string) => v !== value) }
        : { ...prev, breeds: [...prev.breeds, value] }
    );
  };

  return (
    <section
      role={isMobileView ? "dialog" : "region"}
      aria-modal={isMobileView ? "true" : undefined}
      aria-label="Sidebar"
      className={cn(
        "lg:h-max lg:w-max flex flex-col gap-8 lg:px-4 lg:pb-4 lg:pt-8",
        isMobileView
          ? `flex-col items-center p-4 transition-opacity duration-300 ease-in-out fixed inset-0 overflow-hidden
        ${
          isSidebarPageVisible
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
      {isMobileView && isSidebarPageVisible && (
        <button
          aria-label="Close sidebar menu"
          className="self-end rounded-sm"
          onClick={() => setIsSidebarPageVisible(false)}
        >
          <Xmark fontSize={"1.5rem"} />
        </button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-haspopup="listbox"
            aria-controls="breed-dropdown-list"
            variant="outlineAlt"
            data-testid="breed-button"
            role="combobox"
            className="w-full lg:w-[300px] justify-between hover:bg-none cursor-pointer select-none"
          >
            {breeds.length === 0 ? (
              <span className="font-normal">
                Breed: <span className="font-medium">Any</span>
              </span>
            ) : (
              <span>
                <span className="font-medium">{breeds.length}</span>{" "}
                {breeds.length > 1 ? "Breeds" : "Breed"}
              </span>
            )}
            <ChevronDown className="opacity-50 size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] lg:w-[300px] max-h-90 p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList id="breed-dropdown-list">
              <CommandEmpty>No breeds found.</CommandEmpty>
              <CommandGroup>
                {allBreeds.map((breed) => (
                  <CommandItem
                    key={breed}
                    value={breed}
                    onSelect={() => toggleSelection(breed)}
                  >
                    {breed}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        breeds.includes(breed) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-sm pl-3">
          Min Age:{" "}
          <span className="font-medium" data-testid="age-min">
            {ageMin == 0 ? "Any" : ageMin}
          </span>
        </span>
        <Slider
          defaultValue={[0]}
          max={15}
          step={1}
          value={[ageMin]}
          onValueChange={updateAgeMin}
          className="cursor-pointer w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-sm pl-3">
          Max Age:{" "}
          <span className="font-medium" data-testid="age-max">
            {ageMax == 15 ? "Any" : ageMax}
          </span>
        </span>
        <Slider
          defaultValue={[15]}
          max={15}
          step={1}
          value={[ageMax]}
          onValueChange={updateAgeMax}
          className="cursor-pointer w-full"
        />
      </div>
    </section>
  );
}
