import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface AvailableDefaultStigmaProps {
  stigma: ActiveStigma;
  selectedClass: string;
  triggerSelectStigma?: number;
  selectStigma(id: string): void;
  isStigmaSelected?(id: string): boolean;
  isStigmaCanBeSelected?(id: string): boolean;
}
