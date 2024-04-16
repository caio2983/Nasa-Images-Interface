import { fetchAPOD } from "@/app/lib/data";
import ClientAPOD from "./clientAPOD";

export default async function APOD() {
  return <ClientAPOD fetchAPOD={fetchAPOD}></ClientAPOD>;
}
