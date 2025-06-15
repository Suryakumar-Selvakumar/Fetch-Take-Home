import useAuth from "@/hooks/useAuth";
import type { Dog } from "@/pages/Search";
import getDistance from "@/utils/getDistance";
import { Dialog } from "@material-tailwind/react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ColourfulText from "./ui/colourful-text";
import { NumberTicker } from "./ui/number-ticker";
import { AuroraText } from "./ui/aurora-text";
import { CircleX, X } from "lucide-react";
import { XmarkCircleSolid } from "iconoir-react";

interface ModalProps {
  match: Dog | null;
  showMatchModal: boolean;
  setShowMatchModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  match,
  showMatchModal,
  setShowMatchModal,
}: ModalProps) {
  const handleClose = () => setShowMatchModal(false);
  const [dist, setDist] = useState<number | null>(null);
  const { userZip } = useAuth();
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.matchMedia("(max-width: 1024px)").matches || false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = () => mediaQuery.matches && setIsMobileView(true);

    window.addEventListener("change", handleMediaChange);

    return () => window.removeEventListener("change", handleMediaChange);
  }, []);

  async function getMatchDistance() {
    try {
      const distance = await getDistance(userZip, [match?.zip_code as string]);
      const targetZip: string = String(match?.zip_code as string);

      setDist(Number(distance[targetZip]));
    } catch {
      setDist(null);
    }
  }

  useEffect(() => {
    if (match) {
      getMatchDistance();
    }
  }, []);

  useEffect(() => {
    if (match) {
      getMatchDistance();
    }
  }, [match]);

  function generatePara() {
    if (dist) {
      return `Meet ${match?.name}, a ${match?.age} year old ${
        match?.breed
      } located in
        ${match?.city}, ${match?.state}, ${
        match?.zip_code
      }. Currently ${dist} miles away from you, this ${
        (match?.age as number) <= 1 ? "pup" : "dog"
      } could be the perfect match to bring joy and companionship into your life.`;
    } else {
      return `Meet ${match?.name}, a ${match?.age} year old ${match?.breed} located in
        ${match?.city}, ${match?.state}, ${match?.zip_code}. ${match?.name} could be the perfect match to bring joy and companionship into your life.`;
    }
  }

  return (
    <Dialog
      className="w-[calc(100vw-4rem)] lg:w-[700px] self-center justify-self-center p-8 flex flex-col gap-4 lg:gap-8"
      open={showMatchModal}
      handler={handleClose}
      animate={{
        mount: { scale: 1, opacity: 1 },
        unmount: { scale: 0, opacity: 0 },
      }}
    >
      <span
        onClick={handleClose}
        className="absolute cursor-pointer -right-3 -top-3 p-1 rounded-full bg-[rgb(239,238,241)]"
      >
        <X />
      </span>
      <h1 className="scroll-m-20 text-center text-valentino-hv text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
        You matched with
        <p className="text-white">
          <ColourfulText text={match?.name as string}></ColourfulText>
        </p>
      </h1>
      <img
        src={match?.img}
        alt={match?.name}
        className="object-fill h-[175px] lg:h-[350px] w-full rounded-lg"
      />
      <div className="lg:text-2xl grid grid-cols-2 lg:grid-cols-[400px_1fr] gap-4">
        <span>
          <b>Breed:</b> <AuroraText variant="text">{match?.breed}</AuroraText>
        </span>
        {dist && (
          <span>
            <b className="block lg:inline">Distance (mi):</b>{" "}
            <AuroraText variant={""}>
              <NumberTicker value={dist as number} />
            </AuroraText>
          </span>
        )}
        <span>
          <b className="block lg:inline">ZIP Code: </b>{" "}
          <AuroraText variant={""}>
            <NumberTicker value={Number(match?.zip_code)} />
          </AuroraText>
        </span>
        <span>
          <b className="block lg:inline">City:</b>{" "}
          <AuroraText variant="text">{match?.city}</AuroraText>
        </span>
        <span>
          <b className="block lg:inline">State:</b>{" "}
          <AuroraText variant="text">{match?.state}</AuroraText>
        </span>
        <span>
          <b className="block lg:inline">Age (yrs):</b>{" "}
          <AuroraText variant={""}>
            <NumberTicker value={match?.age as number} />
          </AuroraText>
        </span>
      </div>
      {!isMobileView && (
        <p className="lg:text-xl text-center">{generatePara()}</p>
      )}
    </Dialog>
  );
}
