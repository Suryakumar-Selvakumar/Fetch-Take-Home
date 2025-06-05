import { useState } from "react";
import Navbar from "@/components/Navbar";
import spotsBg from "@/assets/spots.png";

function Search() {
  return (
    <main className="w-full h-screen flex flex-col">
      <div className="bg-amber-400 h-min py-3 flex flex-col">
        <Navbar />
      </div>
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
    </main>
  );
}

export default Search;
