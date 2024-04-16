import Image from "next/image";
import { fetchAPOD } from "./lib/data";
import SelectionCard from "./ui/selection-card";

export default async function Home() {
  return (
    <main className="inline-block p-0 w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex items-center justify-center h-20 border-b border-customGray border-solid bg-black">
        <h1 className="text-white text-center text-xl">
          NASA Astronomic Images Interface
        </h1>
      </div>

      <div className="text-white flex-1 overflow-hidden bg-black">
        <div className="flex flex-col h-full ">
          <div className="flex-1 flex flex-row overflow-hidden">
            <div className="text-2xl w-full flex-1 m-4  relative border-customGray border-2 border-solid rounded-md bg-black">
              <a className="text-white text-justify p-32 block h-full">
                A NASA disponibiliza APIs para que desenvolvedores usem dados
                astronômicos em aplicações.Use a navegação ao lado para conferir
                interfaces de visualização de imagens captadas pela agência
                espacial.
              </a>
              <div
                className={
                  "absolute opacity-25 bg-cover inset-0 bg-backgroundLarge2 max-h-full max-w-full rounded-md"
                }
              ></div>
            </div>
            <div className="text-white w-full flex-1 m-4  ">
              <div className="h-full  flex flex-col flex-shrink flex-wrap justify-evenly p-8 ">
                <SelectionCard></SelectionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
