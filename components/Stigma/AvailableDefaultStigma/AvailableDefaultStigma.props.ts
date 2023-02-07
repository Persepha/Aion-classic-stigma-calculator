import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface AvailableDefaultStigmaProps {
  stigma: ActiveStigma;
  selectedClass: string;
  selectStigma(id: string): void;
  isStigmaSelected?(id: string): boolean;
  isStigmaCanBeSelected?(id: string): boolean;
}
