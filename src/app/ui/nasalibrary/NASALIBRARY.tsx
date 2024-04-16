"use server";

import { fetchNASALIBRARY } from "@/app/lib/data";
import ClientNASALIBRARY from "./clientNASALIBRARY";

export default async function NASALIBRARY() {
  return (
    <ClientNASALIBRARY fetchNASALIBRARY={fetchNASALIBRARY}></ClientNASALIBRARY>
  );
}
