import { useState } from "react";
import Navbar from "../components/Navbar";
import dogFamImg from "../assets/dog-family.jpg";
import gdImg from "../assets/gd-1.jpg";
import fbImg from "../assets/fb-1.jpg";
import pImg from "../assets/p-1.jpg";
import gsImg from "../assets/gs-3.jpg";
import HoverCard from "../components/HoverCard";

const dogsData = [
  {
    imgUrl: gdImg,
    gifUrl:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJqMHU2NXM3azNqMzh2c2ozZGNlamJtazg3amxocW16MHRyaHNjaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q343jgPdGDu251pGvI/giphy.gif",
    name: "Golden Retriever",
    desc: "A Scottish breed of retriever dog characterised by an affectionate nature and a striking golden coat.",
  },
  {
    imgUrl: fbImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc293eGVteXV3NjgzcjRycms4N2JzaTM0dm9xeDZtZ3BtZmo2amVheSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mYb4JOmRfa5oKRh6k4/giphy.gif",
    name: "French Bulldog",
    desc: "A French breed of companion dog or toy dog, which appeared in Paris in the mid-nineteenth century.",
  },
  {
    imgUrl: pImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3IzbmptNzMwdmd1aG13d2ZncHZtd3llaHphZ3Z0aHFudzdrcWMweSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jDilStKwxCSSQ/giphy.gif",
    name: "Poodle",
    desc: "A breed of water dog characterized by a distinctive thick, curly coat that comes in many colours and patterns.",
  },
  {
    imgUrl: gsImg,
    gifUrl:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YTlxZXV5a3d5eW5oNGExczM4NWxqam4zOGxubmdneWoxM3FpdDgwYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/glFp85a2oy5M0bLy2Q/giphy.gif",
    name: "German Shepherd",
    desc: "A German breed of working dog of medium to large size characterized by its versatility, courage, and confidence.",
  },
];

function Home() {
  return (
    <main className="w-full h-screen flex flex-col">
      <div className="bg-amber-400 h-min py-4 flex flex-col items-end">
        <Navbar />
      </div>
      <div
        style={{
          background: `radial-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.3)), url(${dogFamImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "100% 55%",
        }}
        className={`h-400 border-b-10 border-b-amber-400`}
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
            />
          ))}
        </div>
      </div>
      <div className="bg-alabaster h-full"></div>
    </main>
  );
}

export default Home;
