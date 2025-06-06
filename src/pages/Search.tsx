import { useState } from "react";
import Navbar from "@/components/Navbar";
import spotsBg from "@/assets/spots.png";
import Filterbar from "@/components/Filterbar";

function Search() {
  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <Filterbar />
      <div className="h-full w-full absolute flex -z-1 overflow-x-hidden">
        <img src={spotsBg} alt="spots background" className="object-cover" />
        <img src={spotsBg} alt="spots background" className="object-cover" />
      </div>
    </main>
  );
}

export default Search;
