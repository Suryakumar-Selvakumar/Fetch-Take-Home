import type { FilterState } from "@/pages/Search";
import {
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Slider } from "./slider";
import { RainbowButton } from "./rainbow-button";
import { ShimmerButton } from "./shimmer-button";

interface SidebarProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  updateAgeMin: (value: number[]) => void;
  updateAgeMax: (value: number[]) => void;
}

export default function Sidebar({
  filters,
  setFilters,
  updateAgeMin,
  updateAgeMax,
}: SidebarProps): JSX.Element {
  const { breeds, ageMin, ageMax } = filters;
  const [allBreeds, setAllBreeds] = useState([]);

  const toggleSelection = (value: string): void => {
    setFilters((prev: FilterState) =>
      prev.breeds.includes(value)
        ? { ...prev, breeds: prev.breeds.filter((v: string) => v !== value) }
        : { ...prev, breeds: [...prev.breeds, value] }
    );
  };

  useEffect(() => {
    async function fetchBreeds() {
      await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((vals) => setAllBreeds(vals));
    }

    fetchBreeds();
  }, []);

  return (
    <div className="h-full w-sm flex flex-col gap-4 p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outlineAlt"
            role="combobox"
            className="w-[300px] justify-between hover:bg-none"
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
        <PopoverContent className="w-[300px] max-h-64 p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
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
      <div>
        <span className="text-sm">
          Min Age: <span className="font-medium">{ageMin}</span>
        </span>
        <Slider
          defaultValue={[0]}
          max={29}
          step={1}
          value={[ageMin]}
          onValueChange={updateAgeMin}
        />
      </div>
      <div>
        <span className="text-sm font-medium">
          Max Age: <span className="font-medium">{ageMax}</span>
        </span>
        <Slider
          defaultValue={[29]}
          max={29}
          step={1}
          value={[ageMax]}
          onValueChange={updateAgeMax}
        />
      </div>
      <RainbowButton
        className="w-[300px] hover:bg-valentino-hv"
        variant={"outline"}
        size={"lg"}
      >
        Generate Match
      </RainbowButton>
      {/* <ShimmerButton
        background="#300d38"
        borderRadius="15px"
        shimmerSize="0.1em"
        className="w-[300px] hover:bg-valentino-hv transition-colors duration-300 ease-in"
      >
        Generate Match
      </ShimmerButton> */}
    </div>
  );
}
