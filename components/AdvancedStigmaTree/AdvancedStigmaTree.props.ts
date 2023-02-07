import { ActiveAdvancedStigmaTree } from "@/utils/fetchCharacterStigmaTree/types";

export interface AdvancedStigmaTreeProps {
  advancedStigmaTree: ActiveAdvancedStigmaTree;
  selectedClass: string;
  selectStigma(id: string): void;
  isStigmaSelected(id: string): boolean;
  isStigmaCanBeSelected(id: string): boolean;
}
