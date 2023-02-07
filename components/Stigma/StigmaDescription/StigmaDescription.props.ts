import { ActiveStigma } from "@/utils/fetchCharacterStigmaTree/types";

export interface StigmaDescriptionProps {
  stigma: ActiveStigma;
  stigmaLvl: number;
  isAvailable?: boolean;
  availableSpaceOnRight: number;
  availableSpaceOnBottom: number;
}
