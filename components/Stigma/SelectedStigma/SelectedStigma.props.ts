import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface SelectedStigmaProps {
  stigma: ActiveStigma;
  selectedClass: string;
  characterLvl: number;
}
