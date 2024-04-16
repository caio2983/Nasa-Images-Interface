"use client";

import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

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
    console.log(queryToSend);

    fetchNASALIBRARY(queryToSend)
      .then((tentativa) => {
        const { dataArray } = tentativa; // Fazer map aqui quando eu usar várias imagens / vídeos
        setNasa(dataArray);
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
        setLoading(false); // Define o estado de carregamento como falso após receber a resposta
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do NASA LIBRARY:", error);
        setLoading(false); // Define o estado de carregamento como falso em caso de erro também
      });
  }, []);

  return (
    <div className="w-screen flex-1 flex-row h-screen flex ">
      <div className="w-2/3 h-screen border-customGray border-2 border-solid border-t-0 border-l-0">
        <div className="w-full h-2/3 border-customGray border-2 border-solid border-x-0 border-b-0 ">
          <div className="max-w-full m-0 w-auto h-full max-h-full flex justify-center items-center">
            {loading ? ( // Verifica se está carregando
              <Skeleton
                variant="rectangular"
                width={210}
                height={118}
                sx={{ bgcolor: "grey.900" }}
              /> // Renderiza o Skeleton se estiver carregando
            ) : (
              renderMedia() // Renderiza a mídia normal se não estiver carregando
            )}
          </div>
        </div>
        <div className="w-full h-1/3  border-customGray border-2 border-solid border-x-0 border-b-0 overflow-auto p-8">
          <h1>Title: {title}</h1>
          <h2>Description : {description}</h2>
          <p>Keywords:</p>
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={210}
            height={118}
          />
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>
                <a>{keyword}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/3 h-screen  border-customGray border-2 border-solid border-t-0 border-l-0">
        <div className="w-full h-1/4 flex border-customGray border-2 border-solid border-t-0 border-l-0 border-r-0">
          <form className="w-full  h-fit" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-1/5 p-2  text-black"
              placeholder="Digite aqui os parâmetros de busca..."
              value={queryToSend}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="m-0 flex h-1/5 items-center text-sm"
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="border-customGray overflow-y-auto border-2 border-b-0 border-t-0 border-solid bg-black flex flex-row flex-nowrap justify-items-center h-full w-full border-r-0 mb-16 border-l-0 ">
          {mediaSelection(Nasa)}
        </div>
      </div>
    </div>
  );
}
