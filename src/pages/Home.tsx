import Navbar from "@/components/Navbar";
import dogFamImg from "@/assets/dog-family.jpg";
import gdImg from "@/assets/gd-3.jpg";
import fbImg from "@/assets/fb-1.jpg";
import pImg from "@/assets/p-1.jpg";
import gsImg from "@/assets/gs-3.jpg";
import bImg from "@/assets/b-1.jpg";
import cImg from "@/assets/c-2.jpeg";
import HoverCard from "@/components/HoverCard";
import spotsBg from "@/assets/spots.png";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const dogsData = [
  {
    imgUrl: pImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3IzbmptNzMwdmd1aG13d2ZncHZtd3llaHphZ3Z0aHFudzdrcWMweSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jDilStKwxCSSQ/giphy.gif",
    name: "Toy Poodle",
    desc: "A breed of water dog characterized by its small size and a distinctive thick, curly coat that comes in many colours.",
  },
  {
    imgUrl: gsImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YTlxZXV5a3d5eW5oNGExczM4NWxqam4zOGxubmdneWoxM3FpdDgwYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/glFp85a2oy5M0bLy2Q/giphy.gif",
    name: "German Shepherd",
    desc: "A German breed of working dog of medium to large size characterized by its versatility, courage, and confidence.",
  },
  {
    imgUrl: fbImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc293eGVteXV3NjgzcjRycms4N2JzaTM0dm9xeDZtZ3BtZmo2amVheSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mYb4JOmRfa5oKRh6k4/giphy.gif",
    name: "French Bulldog",
    desc: "A French breed of companion dog or toy dog, which appeared in Paris in the mid-nineteenth century.",
  },
  {
    imgUrl: gdImg,
    gifUrl:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJqMHU2NXM3azNqMzh2c2ozZGNlamJtazg3amxocW16MHRyaHNjaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q343jgPdGDu251pGvI/giphy.gif",
    name: "Golden Retriever",
    desc: "A Scottish breed of retriever dog characterised by an affectionate nature and a striking golden coat.",
  },
  {
    imgUrl: cImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2JmZWQxNnBkeWxnaGlmeGUwazNrYTFlOG9xd3I4bXB0N3ZoM201diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WAkTocsutMLrG/giphy.gif",
    name: "Cardigan",
    desc: "A livestock-herding breed characterized by a long, low stature, upright ears, extreme loyalty and trainability.",
  },
  {
    imgUrl: bImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXFvODh4MjNmbnRxdHh4YnNveGVxeDYwN3JvN2hlbzlrMjYwcHB0NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/65VFOpltBDvIRdOpgD/giphy.gif",
    name: "Boxer",
    desc: "A medium to large, short-haired dog breed of mastiff-type, characterized by a smooth and tight-fitting coat.",
  },
];

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const navigateToSearch = (breed: string) => {
    if (isLoggedIn) {
      navigate("/search", { state: [breed] });
    } else {
      toast.info("User must be logged in to access the catalog");
    }
  };

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <div
        style={{
          background: `radial-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.3)), url(${dogFamImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "100% 55%",
        }}
        className={`h-325 border-b-10 border-b-amber-400`}
      />
      <div className="relative z-10 flex flex-col w-screen items-center justify-center">
        <div className="absolute -top-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-white font-medium text-shadow-md">
            Find your new best friend
          </h1>
          <p className="text-white text-2xl text-shadow-md">
            Browse 10,000+ dogs from our network of over 14,500 shelters and
            rescues.
          </p>
        </div>
        <div className="absolute flex justify-center items-center -top-20 gap-8">
          {dogsData.map(({ imgUrl, gifUrl, name, desc }) => (
            <HoverCard
              key={name}
              imgUrl={imgUrl}
              gifUrl={gifUrl}
              name={name}
              desc={desc}
              navigateToSearch={navigateToSearch}
            />
          ))}
        </div>
      </div>
      <div className="flex h-full max-h-175 bg-white overflow-hidden">
        <img
          src={spotsBg}
          alt="spots background"
          className="h-full w-full object-cover"
        />
        <img
          src={spotsBg}
          alt="spots background"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  );
}

export default Home;
