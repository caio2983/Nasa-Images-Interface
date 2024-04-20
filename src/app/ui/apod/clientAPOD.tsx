"use client";

import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import NavButton from "@/app/ui/NavButton";

export default function ClientAPOD({ fetchAPOD }) {
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

  useEffect(() => {
    const dateToday = dayjs(new Date()).format("YYYY-MM-DD");
    console.log(dateToday);

    fetchAPOD(dateToday)
      .then((tentativa) => {
        const { imagemLink, imagemText, imagemTitle } = tentativa;
        setLinkImagem(imagemLink);
        setTextImagem(imagemText);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do APOD:", error);
      });
  }, []);

  const dateToday = dayjs(new Date()).format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataToSend, setDataToSend] = useState(dateToday);
  const [LinkImagem, setLinkImagem] = useState(null);
  const [TextImagem, setTextImagem] = useState(null);
  const [TitleImagem, setTitleImagem] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    const selectedDateFormatada = selectedDate.format("YYYY-MM-DD");

    setDataToSend(selectedDateFormatada);

    fetchAPOD(selectedDateFormatada)
      .then((tentativa) => {
        const { imagemLink, imagemText, imagemTitle } = tentativa;
        setLinkImagem(imagemLink);
        setTextImagem(imagemText);
        setTitleImagem(`Title : ${imagemTitle} //`);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do APOD:", error);
      });
  };

  return (
    <div className="w-screen flex-1 flex-row h-screen flex border-customGray border-2 border-l-0 border-r-0">
      <NavButton></NavButton>
      <div className="w-2/3 h-screen flex justify-center items-center">
        {loading ? (
          <div className="flex flex-wrap justify-center w-full content-center h-full overflow-auto m-0">
            <Skeleton
              variant="rounded"
              width="70%"
              height="80%"
              sx={{ bgcolor: "grey.900" }}
            />
          </div>
        ) : (
          <img
            src={LinkImagem}
            alt="Imagem"
            className="rounded p-8 max-h-[90%] w-auto h-auto "
          />
        )}
      </div>
      <div className="w-1/3 h-screen flex flex-col">
        <div className="overflow-auto h-full p-4 m-0 border-customGray border-2 border-t-0 border-b-0 border-solid">
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                maxDate={dayjs(new Date())}
                minDate={dayjs("1995-05-20")}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>

        <div className="bg-black h-2/3 mb-16 w-full overflow-auto border-customGray border-2 border-solid border-r-0">
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
              {TitleImagem} {TextImagem}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
