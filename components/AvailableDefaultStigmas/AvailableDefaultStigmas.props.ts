import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface AvailableDefaultStigmasProps {
  stigmas: ActiveStigma[];
  selectedClass: string;
  selectStigma(id: string): void;
  isStigmaCanBeSelected(id: string): boolean;
}
