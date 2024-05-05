"use client";

import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import NavButton from "@/app/ui/NavButton";

export default function ClientNASALIBRARY({ fetchNASALIBRARY }) {
  const [queryToSend, setQueryToSend] = useState("Galaxy");
  const [Nasa, setNasa] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [loading, setLoading] = useState(true);

  const renderMedia = () => {
    if (selectedType === "image") {
      return (
        <img
          src={selectedMedia}
          alt="Descrição da imagem"
          className="border-customGray border-2 border-solid p-8 max-h-[90%] w-auto h-auto"
        />
      );
    } else if (selectedType === "video") {
      return (
        <video
          src={selectedVideo}
          controls
          className="border-customGray border-2 border-solid p-8 max-h-[90%] w-auto h-auto"
        />
      );
    } else {
      return null;
    }
  };

  const handleInputChange = (event) => {
    setQueryToSend(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    fetchNASALIBRARY(queryToSend)
      .then((tentativa) => {
        const { dataArray } = tentativa;
        setNasa(dataArray);
        setDescription(dataArray[0].description);
        setSelectedMedia(dataArray[0].link);
        setSelectedType(dataArray[0].media_type);
        setKeywords(dataArray[0].keywords);
        setTitle(dataArray[0].title);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do NASA LIBRARY:", error);
      });
  };

  const mediaSelection = (nasa) => {
    const handleImageClick = (
      mediaUrl,
      mediaTitle,
      mediaDescription,
      mediaKeywords,
      media_type,
      videoUrl
    ) => {
      setSelectedMedia(mediaUrl);
      setKeywords(mediaKeywords);
      setTitle(mediaTitle);
      setDescription(mediaDescription);

      setSelectedType(media_type);
      setSelectedVideo(videoUrl);
    };

    return (
      <div className="flex flex-wrap justify-center w-full h-full overflow-auto">
        {nasa.map((nasa, index) => {
          let mediaUrl = nasa.link;
          let mediaTitle = nasa.title;
          let mediaDescription = nasa.description;
          let mediaKeywords = nasa.keywords;
          let media_type = nasa.media_type;
          let videoUrl = nasa.linkVideo;

          const isSelected = selectedMedia === mediaUrl;

          return (
            <div
              key={index}
              className={`h-1/4 w-1/2 m-4 border-customGray 
          
         border-4 justify-self-center  border-solid  rounded transition ease-in-out delay-150  hover:-translate-y-1  hover:scale-110 duration-300 ...
         ${isSelected ? "border-white hover:border-white hover:scale-110" : ""}
        
        }`}
              style={{
                backgroundImage: `url( ${mediaUrl} )`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() =>
                handleImageClick(
                  mediaUrl,
                  mediaTitle,
                  mediaDescription,
                  mediaKeywords,
                  media_type,
                  videoUrl
                )
              }
            ></div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    fetchNASALIBRARY(queryToSend)
      .then((tentativa) => {
        const { dataArray } = tentativa;
        setNasa(dataArray);
        setDescription(dataArray[0].description);
        setSelectedMedia(dataArray[0].link);
        setSelectedType(dataArray[0].media_type);
        setKeywords(dataArray[0].keywords);
        setTitle(dataArray[0].title);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do NASA LIBRARY:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-screen flex-1 flex-row h-screen flex ">
      <NavButton></NavButton>
      <div className="w-2/3 h-screen border-customGray border-2 border-solid border-t-0 border-l-0">
        <div className="w-full h-2/3 border-customGray border-2 border-solid border-x-0 border-b-0 ">
          <div className="max-w-full m-0 w-auto h-full max-h-full flex justify-center items-center">
            {loading ? (
              <Skeleton
                variant="rounded"
                width="70%"
                height="70%"
                sx={{ bgcolor: "grey.900" }}
              />
            ) : (
              renderMedia()
            )}
          </div>
        </div>
        <div className="w-full h-1/3  border-customGray border-2 border-solid border-x-0 border-b-0 overflow-auto p-8">
          {loading ? (
            <div className="space-y-4 w-full h-full overflow-auto">
              {" "}
              <Skeleton
                variant="rounded"
                width="90%"
                height="20%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="90%"
                height="60%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="90%"
                height="20%"
                sx={{ bgcolor: "grey.900" }}
              />
            </div>
          ) : (
            <>
              <h1 className="text-l  mb-4">{title}</h1>
              <h2 className="text-sm mb-2">{description}</h2>

              {keywords !== undefined && (
                <>
                  <p className="text-sm mb-1">Keywords:</p>
                  <ul>
                    {keywords.map((keyword, index) => (
                      <li key={index}>
                        <a className="text-blue-600 font-semibold">{keyword}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-1/3 h-screen  border-customGray border-2 border-solid border-t-0 border-l-0">
        <div className="w-full h-1/4 flex border-customGray border-2 border-solid border-t-0 border-l-0 border-r-0">
          <form className="w-full  h-full" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-1/5 p-2 mb-0 text-black"
              placeholder="Digite aqui os parâmetros de busca..."
              value={queryToSend}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="m-0 flex h-1/5 items-center text-sm"
            >
              <a className="bg-customGray ">Enviar</a>
            </button>
            <div className="w-full h-1/2 color-customGray ">
              Exemplos de keywords para busca:{" "}
              <a className="text-blue-600 font-semibold">
                Sky, Neptune, Solar System, Black Hole, Spacecraft , Supernova
              </a>
            </div>
          </form>
        </div>
        <div className="border-customGray overflow-y-auto border-2 border-b-0 border-t-0 border-solid bg-black flex flex-row flex-nowrap justify-center items-center h-full w-full border-r-0 mb-16 border-l-0 ">
          {loading ? (
            <div className="flex flex-wrap justify-center w-full h-full overflow-auto space-y-4">
              <Skeleton
                variant="rounded"
                width="70%"
                height="25%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="70%"
                height="25%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="70%"
                height="25%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="70%"
                height="25%"
                sx={{ bgcolor: "grey.900" }}
              />
              <Skeleton
                variant="rounded"
                width="70%"
                height="25%"
                sx={{ bgcolor: "grey.900" }}
              />
            </div>
          ) : (
            mediaSelection(Nasa)
          )}
        </div>
      </div>
    </div>
  );
}
