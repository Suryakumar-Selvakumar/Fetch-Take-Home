import { useEffect, useState, type JSX } from "react";
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
import PaginationFavorites from "@/components/PaginationFavorites";
import Badge from "@/components/ui/badge";

const PAGE_SIZE: number = 9;

export default function Favorties(): JSX.Element {
  const [match, setMatch] = useState<Dog | null>(null);
  const [isMatchLoading, setIsMatchLoading] = useState<boolean>(false);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<number | undefined>(undefined);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const storedFavorites: null | string[] = (() => {
    const data: string | null = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : null;
  })();
  const [favorites, setFavorites] = useState<FavoritesState>(
    storedFavorites || []
  );

  function fetchDogIds(currPage: number): string[] {
    setPage(currPage);
    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const favsCopy = favorites;
    return favsCopy.slice(start, end);
  }

  const fetchFavoriteDogs = async (
    currPage: number
  ): Promise<void | undefined> => {
    setError(null);
    setIsLoading(true);

    const curDogIds: string[] = fetchDogIds(currPage);

    try {
      const dogObjs: Dog[] = await getDogsData(curDogIds, null);
      setDogs(dogObjs);
    } catch (err: unknown) {
      if (err instanceof Error || err instanceof TypeError) {
        setError((err as Error).message);
      } else setError("An unknown error occured");
    } finally {
      setIsLoading(false);
    }
  };

  async function generateMatch(): Promise<void> {
    if (favorites.length === 0) {
      toast.info("Please choose favorites to generate match");
    } else if (match !== null) {
      setShowMatchModal(true);
    } else {
      setIsMatchLoading(true);
      try {
        const fetchedMatchId: string = await getMatch(favorites);
        const matchedDog: Dog | undefined = dogs.find(
          (dog) => dog.id === fetchedMatchId
        );
        if (matchedDog != undefined) {
          setMatch(matchedDog);
        } else {
          const matchedDog: Dog[] = await getDogsData([fetchedMatchId], null);
          setMatch(matchedDog[0] as Dog);
        }
      } catch (err: unknown) {
        if (err instanceof Error) console.log((err as Error).message);
      } finally {
        setIsMatchLoading(false);
        setShowMatchModal(true);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    fetchFavoriteDogs(0);
    setMatch(null);
  }, [favorites]);

  useEffect(() => {
    if (showMatchModal) {
      heartEmojis();
      setConfetti(fireWorks());
    }
    if (!showMatchModal) window.clearInterval(confetti);
  }, [showMatchModal]);

  return (
    <main
      className="w-full min-h-screen h-full flex flex-col"
      style={{
        background: `url(${spotsBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      <Modal
        match={match}
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
      />
      <Navbar />
      <div className="w-full max-w-screen-2xl h-min py-3 flex self-center justify-center pl-2">
        <Badge className="text-xl text-valentino" variant={"secondary"}>
          {favorites.length} Dogs Favorited
        </Badge>
      </div>
      <div className="mt-4 w-full max-w-screen-2xl self-center grid grid-cols-1 lg:grid-cols-[min-content_1fr] h-full grid-rows-[min-content_1fr]">
        <div className="row-start-1 h-max w-full lg:w-max flex flex-col px-10 lg:px-0 lg:pr-4 pb-4 lg:pt-8 lg:pl-2">
          <RainbowButton
            className={cn(
              "w-full lg:w-[300px] text-base mt-1",
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
        <div className="lg:col-start-[2] lg:row-span-full grid grid-rows-[1fr_max-content] px-6 lg:px-0">
          <Error error={error} />
          {dogs.length > 0 && (
            <Cards
              dogs={dogs}
              favorites={favorites}
              setFavorites={setFavorites}
              isLoading={isLoading}
            />
          )}
          {!error && dogs.length > 0 && (
            <PaginationFavorites
              page={page}
              fetchFavoriteDogs={fetchFavoriteDogs}
              favoritesPages={Math.ceil(favorites.length / PAGE_SIZE)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
