import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { DepGraph } from "dependency-graph";
import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Gladiator implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "fi_burserklance",
      tier2_1: "fi_chargingshock",
      tier2_2: "fi_kneecrash",
      tier3_1: "fi_charginghit",
      tier3_2: "fi_berserkstance",
      tier4_1: "fi_enfeeblehit",
      tier4_2: "fi_cripplingcut",
      tier4_3: "fi_lockdownimpact",
      tier4_4: "fi_lockdownimpact",
      tier4_5: "fi_cripplingcut",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "fi_drainsword",
      tier2_1: "fi_vorpalhit",
      tier2_2: "fi_jumpattack",
      tier3_1: "fi_technicalcounter",
      tier3_2: "fi_sharpnesshit",
      tier4_1: "fi_revengeslash",
      tier4_2: "fi_ragespirit",
      tier4_3: "p_equip_dual",
      tier4_4: "p_equip_dual",
      tier4_5: "fi_revengeslash",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.FIGHTER);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch gladiator stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    graph.addDependency("fi_berserkstance", "fi_lockdownimpact");

    graph.addDependency("fi_charginghit", "fi_enfeeblehit");
    graph.addDependency("fi_charginghit", "fi_cripplingcut");

    graph.addDependency("fi_chargingshock", "fi_berserkstance");
    graph.addDependency("fi_chargingshock", "fi_charginghit");

    graph.addDependency("fi_burserklance", "fi_chargingshock");
    graph.addDependency("fi_burserklance", "fi_kneecrash");

    graph.addDependency("fi_chargingshock", "fi_charginghit");
    graph.addDependency("fi_chargingshock", "fi_berserkstance");

    graph.addDependency("fi_drainsword", "fi_vorpalhit");
    graph.addDependency("fi_drainsword", "fi_jumpattack");

    graph.addDependency("fi_jumpattack", "p_equip_dual");
    graph.addDependency("fi_jumpattack", "fi_revengeslash");

    graph.addDependency("fi_kneecrash", "fi_lockdownimpact");
    graph.addDependency("fi_kneecrash", "fi_cripplingcut");

    graph.addDependency("fi_sharpnesshit", "p_equip_dual");

    graph.addDependency("fi_technicalcounter", "fi_revengeslash");
    graph.addDependency("fi_technicalcounter", "fi_ragespirit");

    graph.addDependency("fi_vorpalhit", "fi_technicalcounter");
    graph.addDependency("fi_vorpalhit", "fi_sharpnesshit");

    return graph;
  }
}
