import Link from "next/link";

const links = [
  {
    href: "/Interfaces/apod",
    text: "API: Apod // Imagem astronômica que muda diariamente",
    background: "bg-apodCard",
    bgPosition: "cover",
  },
  {
    href: "/Interfaces/epic",
    text: "API: Epic // Imagens policromáticas da Terra",
    background: "bg-epicCard",
    bgPosition: "cover",
  },
  {
    href: "/Interfaces/nasalibrary",
    text: "API: Nasa Image and Video Library // Biblioteca de imagens e vídeos da NASA",
    background: "bg-insightCard",
    bgPosition: "cover",
  },
];

export default async function SelectionCard() {
  return (
    <>
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.href}
            className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 ..."
          >
            <div
              className={`bg-${link.bgPosition} w-full h-28 border-solid border-customGray rounded-md border-2 relative `}
            >
              <div
                className={`absolute transform transition duration-1000 hover:opacity-25  inset-0 ${link.background} max-h-full max-w-full rounded-md opacity-0 `}
              ></div>
              <span className="relative z-10 mx-4 my-2 block text-justify ">
                {link.text}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}
