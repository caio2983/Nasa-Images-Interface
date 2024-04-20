"use client";

import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import NavButton from "@/app/ui/NavButton";

export default function ClientEPIC({ fetchEPIC, checkEPICLastAvailable }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#007bff",
      },
      secondary: {
        main: "#28a745",
      },
      text: {
        primary: "#333",
        secondary: "#666",
      },
    },
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateFormat, setSelectedDateFormat] = useState(null);
  const [LinkImagem, setLinkImagem] = useState(null);
  const [NamesImages, setNamesImages] = useState([]);
  const [imageCaption, setImageCaption] = useState("");
  const [sunPosition, setSunPosition] = useState({
    SunX: "",
    SunY: "",
    SunZ: "",
  });
  const [moonPosition, setMoonPosition] = useState({
    MoonX: "",
    MoonY: "",
    MoonZ: "",
  });
  const [maxDate, setMaxDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    const selectedDateFormatada0 = selectedDate.format("YYYY-MM-DD");
    const selectedDateFormatada1 = selectedDate.format("YYYY/MM/DD");
    setSelectedDateFormat(selectedDateFormatada1);

    fetchEPIC(selectedDateFormatada0)
      .then((tentativa) => {
        const { imageDados } = tentativa;
        setLinkImagem(imageDados[0].imageLink);
        setNamesImages(imageDados);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do EPIC:", error);
      });
  };

  const imageSelection = () => {
    const handleImageClick = (
      imageUrl,
      imageCapt,
      SunPosition,
      MoonPosition
    ) => {
      setLinkImagem(imageUrl);
      setImageCaption(imageCapt);
      setSunPosition(SunPosition);
      setMoonPosition(MoonPosition);
      console.log(imageUrl);
      console.log(imageCaption);
    };

    return (
      <div>
        {NamesImages.map((obj, index) => {
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${selectedDateFormat}/png/${obj.imageName}.png`;
          const imageCapt = `${obj.caption}`;
          const SunPosition = {
            SunX: `${obj.imageSunPositionX} `,
            SunY: `${obj.imageSunPositionY} `,
            SunZ: `${obj.imageSunPositionZ}`,
          };
          const MoonPosition = {
            MoonX: `${obj.imageLunarPositionX} `,
            MoonY: `${obj.imageLunarPositionY} `,
            MoonZ: `${obj.imageLunarPositionZ}`,
          };

          const isSelected = LinkImagem === imageUrl;

          return (
            <div
              key={index}
              className={`h-3/4 w-40 m-4 border-customGray border-4 justify-self-center border-solid inline-block rounded transition ease-in-out delay-150  hover:-translate-y-1  hover:scale-110 duration-300 ... ${
                isSelected
                  ? "border-white hover:border-white hover:scale-110"
                  : ""
              }`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() =>
                handleImageClick(imageUrl, imageCapt, SunPosition, MoonPosition)
              }
            ></div>
          );
        })}
      </div>
    );
  };
  //  `url(https://epic.gsfc.nasa.gov/archive/natural/${selectedDateFormat}/png/${image}.png)`

  useEffect(() => {
    checkEPICLastAvailable()
      .then((tentativa) => {
        const { lastDate } = tentativa;

        const lastAvailable = dayjs(lastDate).format("YYYY-MM-DD");
        console.log(lastAvailable);
        setMaxDate(lastAvailable);

        // tentativa sai assim : {lastDateAvailable: '2024-04-10'}
      })
      .catch((error) => {
        console.error(
          "Erro ao buscar a última data disponível do EPIC:",
          error
        );
      });
  }, []);

  return (
    <div className="w-screen flex-1 flex-row h-screen flex ">
      <NavButton></NavButton>
      <div className="w-2/3 h-screen flex flex-col  ">
        <div className="max-w-full m-0 w-auto h-2/3 max-h-full flex justify-center items-center  border-customGray border-2 border-b-0 border-r-0 border-l-0 border-solid">
          <img
            src={LinkImagem}
            alt="Descrição da imagem"
            className="rounded-md inline-block"
            style={{ maxHeight: "50%", maxWidth: "auto" }}
          />
        </div>

        <div className="border-customGray overflow-x-auto overflow-y-auto flex flex-row flex-nowrap justify-items-center border-2 border-b-0 border-solid bg-black max-h-1/3 h-1/3 w-full border-r-0 mb-16 border-l-0 self-end pl-12 ">
          {imageSelection()}
        </div>
      </div>

      <div className="w-1/3 h-screen flex flex-col">
        <div className="overflow-hidden">
          <div className="overflow-auto max-h-[400px] border-customGray border-2 border-r-0 border-solid">
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  maxDate={dayjs("2024-04-06")}
                  minDate={dayjs("2015-06-13")}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
        </div>

        <div className="bg-black h-1/2 mb-16 w-full overflow-auto border-customGray border-2 border-solid border-r-0">
          <a className="text-sm text-white p-4 py-4 block ">
            <span className="mt-4 block">{imageCaption}</span>
            <span className="mt-4 block">
              Sun X's Position: {sunPosition.SunX}
            </span>
            <span className="mt-4 block">
              Sun Y's Position: {sunPosition.SunY}
            </span>
            <span className="mt-4 block">
              Sun Z's Position: {sunPosition.SunZ}
            </span>
            <span className="mt-4 block">
              Moon X's Position: {moonPosition.MoonX}
              <div className="inline-block w-4 h-4 ml-2 bg-moonIcon"></div>
            </span>
            <span className="mt-4 block">
              Moon Y's Position: {moonPosition.MoonY}
            </span>
            <span className="mt-4 block">
              Moon Z's Position: {moonPosition.MoonZ}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
