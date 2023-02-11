import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface StigmaPanelProps {
  numberDefaultSlotsAllowed: number;
  numberAdvancedSlotsAllowed: number;
  selectedDefaultStigmas: ActiveStigma[];
  selectedAdvancedStigmas: ActiveStigma[];
  selectedClass: string;
  characterLvl: number;
  updateSelectedStigmaLvl(stigmaId: string, lvl: number): void;
  deleteStigma(id: string): void;
}
