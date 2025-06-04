import { useState } from "react";
import Navbar from "../components/Navbar";
import dogFamImg from "../assets/dog-family.jpg";

function Home() {
  return (
    <main className="w-full h-screen flex flex-col">
      <div className="bg-amber-400 h-min py-4 flex flex-col items-end">
        <Navbar />
      </div>
      <img
        src={dogFamImg}
        alt="a family petting a dog"
        className="h-200 border-b-10 border-b-amber-400"
      />
      <div className="absolute z-10 flex flex-col w-screen h-screen items-center justify-center">
        <h1 className="text-4xl">Find your new best friend</h1>
        <p>Browse pets from our network over 14,500 shelters and rescues.</p>
      </div>
      <div className="bg-alabaster h-full"></div>
    </main>
  );
}

export default Home;
