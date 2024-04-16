"use client";

import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";

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

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    const selectedDateFormatada = selectedDate.format("YYYY-MM-DD");

    setDataToSend(selectedDateFormatada);

    fetchAPOD(selectedDateFormatada)
      .then((tentativa) => {
        const { imagemLink, imagemText, imagemTitle } = tentativa;
        setLinkImagem(imagemLink);
        setTextImagem(imagemText);
        setTitleImagem(imagemTitle);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do APOD:", error);
      });
  };

  return (
    <div>
      <div className="w-screen flex-1 flex-row h-screen flex ">
        <div className="w-2/3 h-screen flex justify-center items-center">
          <img
            src={LinkImagem}
            alt="Imagem"
            className="rounded p-8 max-h-[90%] w-auto h-auto "
          />
        </div>
        <div className="w-1/3 h-screen flex flex-col">
          <div className="overflow-hidden">
            <div className="overflow-auto max-h-[400px] border-customGray border-2 border-t-0 border-solid">
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
          </div>

          <div className="bg-black h-1/2 mb-16 w-full overflow-auto border-customGray border-2 border-solid">
            <a className="text-sm text-white p-4 py-4 block">
              Title: {TitleImagem} // {TextImagem}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
