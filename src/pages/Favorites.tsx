import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import spotsBg from "@/assets/spots.png";
import Modal from "@/components/Modal";
import getMatch from "@/utils/getMatch";
import type { Dog } from "./Search";
import { toast } from "sonner";
import { RainbowButton } from "@/components/ui/Rainbow Button/rainbow-button";
import { cn } from "@/utils/cn";
import { getDogsData } from "@/utils/getDogsData";
import Navbar from "@/components/Navbar";
import { fireWorks } from "@/components/ui/confetti";
import Error from "@/components/Error";
import Cards from "@/components/Cards";
import PaginationFavorites from "@/components/PaginationFavorites";
import Badge from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import type { FavoritesState } from "@/AuthProvider";

const PAGE_SIZE: number = 9;

export default function Favorties(): JSX.Element {
  const [match, setMatch] = useState<Dog | null>(null);
  const [isMatchLoading, setIsMatchLoading] = useState<boolean>(false);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [openedDog, setOpenedDog] = useState<Dog | null>(null);

  const confetti = useRef<number | null>(null);

  const { favorites, setFavorites } = useAuth();

  const fetchFavoriteDogs = useCallback(
    async (currPage: number): Promise<void | undefined> => {
      setError(null);
      setIsLoading(true);
      setPage(currPage);

      const start = currPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const curDogIds: string[] = favorites.slice(start, end);

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
    },
    [favorites]
  );

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
    fetchFavoriteDogs(0);
    setMatch(null);
  }, [fetchFavoriteDogs]);

  useEffect(() => {
    if (showMatchModal) {
      confetti.current = fireWorks();
    } else if (confetti.current !== null) {
      clearInterval(confetti.current);
      confetti.current = null;
    }
  }, [showMatchModal]);

  const toggleFavorite = (dogId: string): void => {
    setFavorites((favs: FavoritesState) => {
      return favs.includes(dogId)
        ? favs.filter((id) => id !== dogId)
        : [...favs, dogId];
    });
  };

  const toggleModal = (dogId: string): void => {
    const chosenDog: Dog = dogs.find((dog) => dog.id === dogId)!;
    setOpenedDog(chosenDog);
    setShowCardModal(true);
  };

  return (
    <>
      <Navbar />
      <main
        className="w-full min-h-screen h-full flex flex-col"
        style={{
          background: `url(${spotsBg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      >
        {/* Match Modal */}
        <Modal
          dog={match}
          showModal={showMatchModal}
          setShowModal={setShowMatchModal}
          displayingMatch={true}
          isInSearch={false}
        />
        {/* Card Modal */}
        <Modal
          dog={openedDog}
          showModal={showCardModal}
          setShowModal={setShowCardModal}
          displayingMatch={false}
          favorite={openedDog ? favorites.includes(openedDog.id) : false}
          toggleFavorite={toggleFavorite}
          isInSearch={false}
        />
        <div className="w-full max-w-screen-2xl h-min py-4 flex self-center justify-center">
          <Badge
            role="status"
            aria-live="polite"
            aria-label={`${favorites.length} dogs favorited`}
            className="text-xl text-valentino shadow-sm"
            variant={"secondary"}
          >
            {favorites.length} Dogs Favorited
          </Badge>
        </div>
        <section
          aria-label="Page content"
          className="mt-4 w-full max-w-screen-2xl self-center grid grid-cols-1 lg:grid-cols-[min-content_1fr] h-full grid-rows-[min-content_1fr]"
        >
          <section
            role="region"
            aria-label="Match generator"
            className="row-start-1 h-max w-full lg:w-max flex flex-col px-10 lg:px-4 pb-3 lg:pt-8"
          >
            <RainbowButton
              aria-label={
                match !== null
                  ? "Show your match"
                  : isMatchLoading
                  ? "Generating match"
                  : "Generate a match"
              }
              aria-busy={isMatchLoading}
              className={cn(
                "w-full lg:w-[300px] text-base",
                isMatchLoading && "text-muted-foreground"
              )}
              data-testid="generate-match-button"
              variant={"outline"}
              size={"lg"}
              onClick={generateMatch}
              disabled={isMatchLoading}
            >
              {match !== null ? "Show Match" : "Generate Match"}
            </RainbowButton>
          </section>
          <section
            aria-live="polite"
            role="region"
            aria-label="Results"
            className="lg:col-start-[2] lg:row-span-full grid grid-rows-[1fr_max-content] px-6 lg:px-0"
          >
            <Error error={error} />
            {dogs.length > 0 && (
              <Cards
                dogs={dogs}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isLoading={isLoading}
                toggleModal={toggleModal}
              />
            )}
            {!error && dogs.length > 0 && (
              <PaginationFavorites
                page={page}
                fetchFavoriteDogs={fetchFavoriteDogs}
                favoritesPages={Math.ceil(favorites.length / PAGE_SIZE)}
              />
            )}
          </section>
        </section>
      </main>
    </>
  );
}
