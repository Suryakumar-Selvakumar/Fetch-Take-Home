import { useCallback, useEffect, useState, type JSX } from "react";
import spotsBg from "@/assets/spots.png";
import Modal from "@/components/Modal";
import getMatch from "@/utils/getMatch";
import type { Dog, FavoritesState } from "./Search";
import { toast } from "sonner";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/utils/cn";
import { getDogsData } from "@/utils/getDogsData";
import Navbar from "@/components/Navbar";
import { fireWorks, heartEmojis } from "@/components/ui/confetti";
import Error from "@/components/Error";
import Cards from "@/components/Cards";

export default function Favorties(): JSX.Element {
  const [match, setMatch] = useState<Dog | null>(null);
  const [isMatchLoading, setIsMatchLoading] = useState<boolean>(false);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<number | undefined>(undefined);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const storedFavorites: null | string[] = (() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : null;
  })();
  const [favorites, setFavorites] = useState<FavoritesState>(
    storedFavorites || []
  );

  const fetchFavoriteDogs = useCallback(async (): Promise<void | undefined> => {
    setError(null);
    setIsLoading(true);

    try {
      const dogObjs = await getDogsData(favorites, null);
      setDogs(dogObjs);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError((err as Error).message);
      } else setError("An unknown error occured");
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    fetchFavoriteDogs();
    setMatch(null);
  }, [favorites]);

  async function generateMatch(): Promise<void> {
    if (favorites.length === 0) {
      toast.info("Please choose favorites to generate match");
    } else if (match !== null) {
      setShowMatchModal(true);
    } else {
      setIsMatchLoading(true);
      try {
        const fetchedMatchId: string = await getMatch(favorites);
        const matchedDog = dogs.find((dog) => dog.id === fetchedMatchId);
        setMatch(matchedDog as Dog);
      } catch (err: unknown) {
        if (err instanceof Error) console.log((err as Error).message);
      } finally {
        setIsMatchLoading(false);
        setShowMatchModal(true);
      }
    }
  }

  useEffect(() => {
    if (showMatchModal) {
      heartEmojis();
      setConfetti(fireWorks());
    }
    if (!showMatchModal) window.clearInterval(confetti);
  }, [showMatchModal]);

  return (
    <main className=" w-full h-screen flex flex-col">
      <Modal
        match={match}
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
      />
      <Navbar />
      <div className="mt-4 w-full max-w-screen-2xl self-center grid grid-cols-[min-content_1fr]">
        <div className="flex flex-col gap-4 col-span-1">
          <div className="h-max w-max flex flex-col gap-8 pr-4 pb-4 pt-8 pl-2">
            <RainbowButton
              className={cn(
                "w-[300px] text-base mt-1",
                isMatchLoading && "text-muted-foreground"
              )}
              variant={"outline"}
              size={"lg"}
              onClick={generateMatch}
              disabled={isMatchLoading}
            >
              {match !== null ? "Show Match" : "Generate Match"}
            </RainbowButton>
          </div>
        </div>
        <div className="col-start-[2] row-span-full flex flex-col">
          <Error error={error} />
          {dogs.length > 0 && (
            <Cards
              dogs={dogs}
              favorites={favorites}
              setFavorites={setFavorites}
              isLoading={isLoading}
            />
          )}
          {/* {!error && dogs.length > 0 && (
            <PaginationNav
              page={page}
              searchResult={searchResult}
              fetchDogsData={fetchDogsData}
            />
          )} */}
        </div>
      </div>
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
    </main>
  );
}
