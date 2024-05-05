"use client";

import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import NavButton from "@/app/ui/NavButton";
import Skeleton from "@mui/material/Skeleton";
import { renderDateViewCalendar } from "@mui/x-date-pickers";

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
  const [LinkImagem, setLinkImagem] = useState("");
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
  const [loading, setLoading] = useState(true);
  const [lastDate, setLastDate] = useState("");
  const [dateDescription, setDateDescription] = useState("");

  const renderMedia = () => {
    return (
      <img
        src={LinkImagem}
        className="rounded-md inline-block"
        style={{ maxHeight: "50%", maxWidth: "auto" }}
      />
    );
  };

  const handleDateChange = (selectedDate) => {
    setLoading(true);
    setSelectedDate(selectedDate);
    const selectedDateFormatada0 = selectedDate.format("YYYY-MM-DD");
    const selectedDateFormatada1 = selectedDate.format("YYYY/MM/DD");
    setSelectedDateFormat(selectedDateFormatada1);

    fetchEPIC(selectedDateFormatada0)
      .then((tentativa) => {
        const { imageDados } = tentativa;
        setNamesImages(imageDados);

        const selecDateFormat = dayjs(selectedDateFormatada0).format(
          "YYYY/MM/DD"
        );
        const url = `https://epic.gsfc.nasa.gov/archive/natural/${selectedDateFormatada1}/png/${imageDados[0].imageName}.png`;
        setLinkImagem(url);
        setLoading(false);
        setDateDescription(imageDados[0].date);
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
      MoonPosition,
      imageDate
    ) => {
      setLinkImagem(imageUrl);
      setImageCaption(imageCapt);
      setSunPosition(SunPosition);
      setMoonPosition(MoonPosition);
      setDateDescription(imageDate);
    };

    return (
      <div>
        {NamesImages.map((obj, index) => {
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${selectedDateFormat}/png/${obj.imageName}.png`;
          const imageCapt = `${obj.caption}`;
          const imageDate = `${obj.date}`;
          const SunPosition = {
            SunX: `Sun X's Position: ${obj.imageSunPositionX} `,
            SunY: `Sun Y's Position: ${obj.imageSunPositionY} `,
            SunZ: `Sun Z's Position: ${obj.imageSunPositionZ}`,
          };
          const MoonPosition = {
            MoonX: `Moon X's Position: ${obj.imageLunarPositionX} `,
            MoonY: `Moon Y's Position: ${obj.imageLunarPositionY} `,
            MoonZ: `Moon Z's Position: ${obj.imageLunarPositionZ}`,
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
                handleImageClick(
                  imageUrl,
                  imageCapt,
                  SunPosition,
                  MoonPosition,
                  imageDate
                )
              }
            ></div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
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

    checkEPICLastAvailable()
      .then((tentativa) => {
        const lastAvailable = dayjs(tentativa.lastDateAvailable).format(
          "YYYY-MM-DD"
        );

        fetchEPIC(lastAvailable)
          .then((tentativa) => {
            const { imageDados } = tentativa;

            const lastAvailableFormat =
              dayjs(lastAvailable).format("YYYY/MM/DD");
            const url = `https://epic.gsfc.nasa.gov/archive/natural/${lastAvailableFormat}/png/${imageDados[0].imageName}.png`;
            setLinkImagem(url);
            setNamesImages(imageDados);
            setImageCaption(imageDados[0].caption);
            setDateDescription(imageDados[0].date);

            setSunPosition({
              SunX: `Sun X's Position: ${imageDados[0].imageSunPositionX} `,
              SunY: `Sun Y's Position: ${imageDados[0].imageSunPositionY} `,
              SunZ: `Sun Z's Position: ${imageDados[0].imageSunPositionZ}`,
            });
            setMoonPosition({
              MoonX: `Moon X's Position: ${imageDados[0].imageLunarPositionX} `,
              MoonY: `Moon Y's Position: ${imageDados[0].imageLunarPositionY} `,
              MoonZ: `Moon Z's Position: ${imageDados[0].imageLunarPositionZ}`,
            });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Erro ao buscar dados do EPIC:", error);
          });

        const selectedDateFormatada01 = dayjs(
          lastAvailable,
          "YYYY/MM/DD"
        ).format("YYYY/MM/DD");

        setSelectedDateFormat(selectedDateFormatada01);
        setLastDate(lastAvailable);
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

        <div className="border-customGray overflow-x-auto overflow-y-auto flex flex-row flex-nowrap justify-items-center border-2 border-b-0 border-solid bg-black max-h-1/3 h-1/3 w-full border-r-0 mb-16 border-l-0 self-end pl-12 ">
          {loading ? (
            <div className=" w-full h-full py-8 overflow-auto">
              <Skeleton
                variant="rounded"
                width="90%"
                height="90%"
                sx={{ bgcolor: "grey.900" }}
              />
            </div>
          ) : (
            imageSelection()
          )}
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
                  maxDate={dayjs("2024-05-01")}
                  minDate={dayjs("2015-06-13")}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
        </div>

        <div className="bg-black h-1/2 mb-16 w-full overflow-auto border-customGray border-2 border-solid border-r-0">
          {loading ? (
            <div className="h-full w-full space-y-2 p-4 overflow-hidden">
              <Skeleton
                variant="rectangular"
                sx={{
                  width: "100%",
                  height: "10%",
                  bgcolor: "grey.900",
                }}
              />
              <Skeleton
                variant="rounded"
                sx={{
                  width: "100%",
                  height: "90%",
                  bgcolor: "grey.900",
                }}
              />
            </div>
          ) : (
            <a className="text-sm text-white p-4 py-4 block">
              <span className="mt-4 block">{imageCaption}</span>
              <span className="mt-4 block">
                <a className="text-blue-600 font-semibold">Date:</a>
                {dateDescription}
              </span>
              <span className="mt-4 block">{sunPosition.SunX}</span>
              <span className="mt-4 block">{sunPosition.SunY}</span>
              <span className="mt-4 block">{sunPosition.SunZ}</span>
              <span className="mt-4 block">{moonPosition.MoonX}</span>
              <span className="mt-4 block">{moonPosition.MoonY}</span>
              <span className="mt-4 block">{moonPosition.MoonZ}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
