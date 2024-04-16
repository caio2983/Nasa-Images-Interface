"use server";

import { fetchEPIC, checkEPICLastAvailable } from "@/app/lib/data";
import ClientEPIC from "./clientEPIC";

export default async function EPIC() {
  return (
    <ClientEPIC
      fetchEPIC={fetchEPIC}
      checkEPICLastAvailable={checkEPICLastAvailable}
    ></ClientEPIC>
  );
}
