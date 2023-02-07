import axios from "axios";
import { Stigma } from "@/utils/fetchCharacterStigmaTree/types";

export const fetchStigmas = async (character: string) => {
  try {
    const response = await axios.get<Stigma[]>(`data/${character}.json`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    console.log(error);
  }
};
