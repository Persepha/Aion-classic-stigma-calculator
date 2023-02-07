import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface StigmaPanelProps {
  numberDefaultSlotsAllowed: number;
  numberAdvancedSlotsAllowed: number;
  selectedDefaultStigmas: ActiveStigma[];
  selectedAdvancedStigmas: ActiveStigma[];
  selectedClass: string;
  characterLvl: number;
}
