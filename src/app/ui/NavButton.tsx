"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const links = [
  {
    href: "/Interfaces/apod",
    text: "APOD",
    background: "bg-apodCard",
    bgPosition: "cover",
  },
  {
    href: "/Interfaces/epic",
    text: "EPIC",
    background: "bg-epicCard",
    bgPosition: "center",
  },
  {
    href: "/Interfaces/nasalibrary",
    text: "Nasa Image and Video Library",
    background: "bg-insightCard",
    bgPosition: "cover",
  },
];

export default function NavButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="h-fit w-1/6 bg-black text-white flex flex-column items-center justify-center absolute top-0 left-0">
        <h2 className="text-white w-full text-center text-l ">APIs</h2>
        <div
          className="bg-white h-full w-full justify-self-end hover:bg-black"
          onClick={handleClick}
        >
          E
        </div>
      </div>
      <div
        className={`h-[30vh] w-0 absolute flex flex-col justify-normal bg-black border-customGray border-2 border-t-0 border-solid ${
          isClicked ? "animate-slideDown w-[35vw]" : "hidden"
        }`}
      >
        <Link
          className="h-1/3 w-full flex items-center relative "
          href={links[0].href}
        >
          <div>
            <h1 className="text-white">APOD</h1>

            <div
              className={`absolute h-full z-20 transform transition duration-1000 hover:opacity-25  inset-0 ${links[0].background} max-h-full max-w-full rounded-md opacity-0 `}
            ></div>
          </div>
        </Link>

        <Link
          className="h-1/3 w-full relative flex items-center border-customGray  border-b-0 border-x-0 border-2 border-solid"
          href={links[1].href}
        >
          <div>
            <h1 className="text-white">EPIC</h1>

            <div
              className={`absolute h-full z-20 transform transition duration-1000 hover:opacity-25  inset-0 ${links[1].background} max-h-full max-w-full rounded-md opacity-0 `}
            ></div>
          </div>
        </Link>

        <Link
          href={links[2].href}
          className="h-1/3 w-full flex items-center relative border-customGray border-x-0 border-b-0 border-2 border-solid"
        >
          <div>
            <h1 className="text-white">Nasa Images and Videos Library</h1>

            <div
              className={`absolute h-full w-full  transform transition duration-1000 hover:opacity-25  inset-0 ${links[2].background} max-h-full max-w-full rounded-md opacity-0 `}
            >
              {" "}
            </div>
          </div>
        </Link>

        <Link
          className="h-1/3 w-full relative flex items-center border-customGray border-x-0 border-b-0 border-2 border-solid"
          href="/"
        >
          <div>
            <h1 className="text-white">Home Page</h1>

            <div
              className={`absolute h-full z-20 transform transition duration-1000 hover:opacity-25  inset-0 bg-backgroundLarge2Nav bg-cover max-h-full max-w-full rounded-md opacity-0 `}
            ></div>
          </div>
        </Link>

        <div className="h-[10%] w-[5%] absolute bottom-0 bg-customGray  self-end"></div>
      </div>
    </>
  );
}
