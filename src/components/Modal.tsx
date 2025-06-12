import useAuth from "@/hooks/useAuth";
import type { Dog } from "@/pages/Search";
import getDistance from "@/utils/getDistance";
import { Dialog } from "@material-tailwind/react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ColourfulText from "./ui/colourful-text";
import { NumberTicker } from "./ui/number-ticker";
import { AuroraText } from "./ui/aurora-text";

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

  async function getMatchDistance() {
    const distance = await getDistance(userZip, [match?.zip_code as string]);
    const targetZip: string = String(match?.zip_code as string);

    setDist(Number(distance[targetZip]) || null);
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
        zip code ${match?.zip_code}. ${match?.name} could be the perfect match to bring joy and companionship into your life.`;
    }
  }

  return (
    <Dialog
      className="w-[700px] self-center justify-self-center p-8 flex flex-col gap-8"
      open={showMatchModal}
      handler={handleClose}
      animate={{
        mount: { scale: 1, opacity: 1 },
        unmount: { scale: 0, opacity: 0 },
      }}
    >
      <h1 className="scroll-m-20 text-center text-valentino-hv text-4xl font-extrabold tracking-tight text-balance">
        You matched with
        <p className="text-white">
          <ColourfulText text={match?.name as string}></ColourfulText>
        </p>
      </h1>
      <img
        src={match?.img}
        alt={match?.name}
        className="object-fill h-[350px] w-full rounded-lg"
      />
      <div className="text-2xl grid grid-cols-[400px_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <span>
            <b>Breed:</b> <AuroraText variant="text">{match?.breed}</AuroraText>
          </span>
          <span>
            <b>City:</b> <AuroraText variant="text">{match?.city}</AuroraText>
          </span>
          <span>
            <b>Zip:</b>{" "}
            <AuroraText>
              <NumberTicker value={Number(match?.zip_code)} />
            </AuroraText>
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span>
            <b>Age (yrs):</b>{" "}
            <AuroraText>
              <NumberTicker value={match?.age as number} />
            </AuroraText>
          </span>
          <span>
            <b>State:</b> <AuroraText variant="text">{match?.state}</AuroraText>
          </span>
          <span>
            <b>Distance (mi):</b>{" "}
            {dist && (
              <AuroraText>
                <NumberTicker value={dist as number} />
                {/* {dist} */}
              </AuroraText>
            )}
          </span>
        </div>
      </div>
      <p className="text-xl text-center">{generatePara()}</p>
    </Dialog>
  );
}
