import useAuth from "@/hooks/useAuth";
import type { Dog } from "@/pages/Search";
import getDistance from "@/utils/getDistance";
import { Dialog } from "@material-tailwind/react";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import ColourfulText from "./ui/colourful-text";
import { NumberTicker } from "./ui/number-ticker";
import { AuroraText } from "./ui/aurora-text";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface ModalProps {
  dog: Dog | null;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  displayingMatch: boolean;
  isInSearch: boolean;
  favorite?: boolean;
  toggleFavorite?: (dogId: string) => void;
}

export default function Modal({
  dog,
  showModal,
  setShowModal,
  displayingMatch,
  isInSearch,
  favorite,
  toggleFavorite,
}: ModalProps) {
  const handleClose = useCallback(() => setShowModal(false), [setShowModal]);

  const [dist, setDist] = useState<number | null>(null);

  const { userZip }: { userZip: string } = useAuth();
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = (event: MediaQueryListEvent): false | void =>
      setIsMobileView(event.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const getMatchDistance = useCallback(async () => {
    try {
      const distance: Record<string, number> = await getDistance(userZip, [
        dog?.zip_code as string,
      ]);
      const targetZip: string = String(dog?.zip_code as string);

      setDist(Number(distance[targetZip]));
    } catch {
      setDist(null);
    }
  }, [userZip, dog?.zip_code]);

  useEffect(() => {
    if (dog) {
      getMatchDistance();
    }
  }, [dog, getMatchDistance]);

  useEffect(() => {
    if (!favorite && !displayingMatch && !isInSearch) handleClose();
  }, [favorite, handleClose, displayingMatch, isInSearch]);

  function generatePara() {
    if (dist) {
      return `Meet ${dog?.name}, a ${dog?.age} year old ${dog?.breed} located in
        ${dog?.city}, ${dog?.state}, ${
        dog?.zip_code
      }. Currently ${dist} miles away from you, this ${
        (dog?.age as number) <= 1 ? "pup" : "dog"
      } could be the perfect match to bring joy and companionship into your life.`;
    } else {
      return `Meet ${dog?.name}, a ${dog?.age} year old ${dog?.breed} located in
        ${dog?.city}, ${dog?.state}, ${dog?.zip_code}. ${dog?.name} could be the perfect match to bring joy and companionship into your life.`;
    }
  }

  return (
    <Dialog
      aria-labelledby="dog-dialog-title"
      aria-describedby="dog-dialog-description"
      aria-modal="true"
      {...({
        className:
          "w-[calc(100vw-4rem)] lg:w-[700px] self-center justify-self-center p-6 lg:p-8",
        open: showModal,
        handler: handleClose,
        animate: {
          mount: { scale: 1, opacity: 1 },
          unmount: { scale: 0, opacity: 0 },
        },
      } as unknown as React.ComponentProps<typeof Dialog>)}
    >
      <button
        aria-label="Close modal"
        data-testid="modal-close-button"
        onClick={handleClose}
        className="absolute cursor-pointer -right-3 -top-3 p-1 rounded-full bg-[rgb(239,238,241)]"
      >
        <X />
      </button>
      {displayingMatch ? (
        <article role="document" className="flex flex-col gap-4 lg:gap-8">
          <h1
            id="dog-dialog-title"
            className="scroll-m-20 text-center text-valentino-hv text-2xl lg:text-4xl font-extrabold tracking-tight text-balance"
          >
            You matched with
            <p className="text-white">
              <ColourfulText text={dog?.name as string}></ColourfulText>
            </p>
          </h1>
          <img
            src={dog?.img}
            alt={dog?.name}
            className="object-fill h-[175px] lg:h-[350px] w-full rounded-lg"
          />
          <div
            id="dog-dialog-description"
            className="lg:text-2xl grid grid-cols-2 lg:grid-cols-[400px_1fr] gap-4"
          >
            <span>
              <b className="block lg:inline">Breed:</b>{" "}
              <AuroraText variant="text">{dog?.breed}</AuroraText>
            </span>
            <span>
              <b className="block lg:inline">Age (yrs):</b>{" "}
              <AuroraText variant={""}>
                <NumberTicker value={dog?.age as number} />
              </AuroraText>
            </span>
            <span>
              <b className="block lg:inline">City:</b>{" "}
              <AuroraText variant="text">{dog?.city}</AuroraText>
            </span>
            <span>
              <b className="block lg:inline">State:</b>{" "}
              <AuroraText variant="text">{dog?.state}</AuroraText>
            </span>
            <span>
              <b className="block lg:inline">ZIP Code: </b>{" "}
              <AuroraText variant={""}>
                <NumberTicker value={Number(dog?.zip_code)} />
              </AuroraText>
            </span>
            {dist ? (
              <span>
                <b className="block lg:inline">Distance (mi):</b>{" "}
                <AuroraText variant={""}>
                  <NumberTicker value={dist as number} />
                </AuroraText>
              </span>
            ) : (
              <span>
                <b className="block lg:inline">County:</b>{" "}
                <AuroraText variant="text">{dog?.county}</AuroraText>
              </span>
            )}
            <span>
              <b className="block lg:inline">Latitude: </b>{" "}
              <AuroraText variant={""}>
                <NumberTicker decimalPlaces={3} value={Number(dog?.latitude)} />
              </AuroraText>
            </span>
            <span>
              <b className="block lg:inline">Longitude: </b>{" "}
              <AuroraText variant={""}>
                <NumberTicker
                  decimalPlaces={3}
                  value={Number(dog?.longitude)}
                />
              </AuroraText>
            </span>
          </div>
          {!isMobileView && (
            <p data-testid="dog-paragraph" className="lg:text-xl text-center">
              {generatePara()}
            </p>
          )}
        </article>
      ) : (
        <article role="document" className="flex flex-col gap-4 lg:gap-8">
          <h1
            id="dog-dialog-title"
            className="scroll-m-20 text-center text-valentino-hv text-2xl lg:text-4xl font-extrabold tracking-tight text-balance"
          >
            {dog?.name}
          </h1>
          <span className="relative">
            <img
              src={dog?.img}
              alt={dog?.name}
              className="object-fill h-[175px] lg:h-[350px] w-full rounded-lg"
            />
            <button
              type="button"
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={!!favorite}
              className={cn(
                "rounded-full p-2 absolute fill-transparent stroke-valentino-hv stroke-20 cursor-pointer right-3 top-3 hover:bg-[rgb(255,255,255,1)]",
                "bg-[rgb(255,255,255,0.7)]",
                "transition-colors ease-in duration-100",
                "transition-opacity duration-500 ease-in"
              )}
              data-testid="favorite-button"
              onClick={() => toggleFavorite(dog.id)}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#ffffff"
                strokeWidth="1.5"
                className="overflow-visible group"
              >
                <path
                  className="[stroke-dashoffset:0] [stroke-dasharray:1550] origin-center group-hover:animate-stroke-animation duration-200 ease-in-out fill-mode-forwards"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
                  fill={favorite ? "var(--color-valentino-hv)" : "transparent"}
                ></path>
              </svg>
            </button>
          </span>
          <div
            id="dog-dialog-description"
            className="lg:text-2xl grid grid-cols-2 lg:grid-cols-[370px_1fr] gap-4"
          >
            <span>
              <b className="block lg:inline">Breed:</b>{" "}
              <span>{dog?.breed}</span>
            </span>
            <span>
              <b className="block lg:inline">Age (yrs):</b>{" "}
              <span>{dog?.age}</span>
            </span>
            <span>
              <b className="block lg:inline">City:</b> <span>{dog?.city}</span>
            </span>
            <span>
              <b className="block lg:inline">State:</b>{" "}
              <span>{dog?.state}</span>
            </span>
            <span>
              <b className="block lg:inline">ZIP Code: </b>{" "}
              <span>{dog?.zip_code}</span>
            </span>
            {dist ? (
              <span>
                <b className="block lg:inline">Distance (mi):</b>{" "}
                <span>{dist?.toFixed(2)}</span>
              </span>
            ) : (
              <span>
                <b className="block lg:inline">County:</b>{" "}
                <span>{dog?.county}</span>
              </span>
            )}
            <span>
              <b className="block lg:inline">Latitude: </b>{" "}
              <span>{dog?.latitude.toFixed(3)}</span>
            </span>
            <span>
              <b className="block lg:inline">Longitude: </b>{" "}
              <span>{dog?.longitude.toFixed(3)}</span>
            </span>
          </div>
        </article>
      )}
    </Dialog>
  );
}
