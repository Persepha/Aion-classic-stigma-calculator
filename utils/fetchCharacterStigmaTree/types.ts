export interface AdditionalStigmaData {
  id: number;
  name: string;
  "Usage Cost": string;
  "Cast time": string;
  Cooldown: string;
  Description: string;
  "Abyss point": number;
  "Shards cost": number;
}

export interface Stigma {
  id: string;
  faction: string;
  type: number;
  lvls: number[];
  "Skill type": string;
  Target: string;
  "Additional info": string[];
  [key: number]: AdditionalStigmaData;
}

export interface ActiveStigma {
  maxAvailableStigmaLvl: number | null;
  selectedStigmaLvl: number | null;
  stigma: Stigma;
}

export interface AdvancedStigmaTreeSlots {
  tier4_1: string;
  tier4_2: string;
  tier4_3: string;
  tier4_4: string;
  tier4_5: string;
  tier3_1: string;
  tier3_2: string;
  tier2_1: string;
  tier2_2: string;
  tier1: string;
}

export interface ActiveAdvancedStigmaTree {
  tier4_1: ActiveStigma;
  tier4_2: ActiveStigma;
  tier4_3: ActiveStigma;
  tier4_4: ActiveStigma;
  tier4_5: ActiveStigma;
  tier3_1: ActiveStigma;
  tier3_2: ActiveStigma;
  tier2_1: ActiveStigma;
  tier2_2: ActiveStigma;
  tier1: ActiveStigma;
}

export interface StigmaTree {
  stigmaTree: ActiveAdvancedStigmaTree | null;
}
