import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Chanter implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "ch_improvedbody",
      tier2_1: "ch_chant_invincible",
      tier2_2: "ch_surperiorheal",
      tier3_1: "ch_mpheal",
      tier3_2: "ch_blessprotect",
      tier4_1: "ch_protectself",
      tier4_2: "ch_improvedallattack",
      tier4_3: "ch_improvedalldefend",
      tier4_4: "ch_improvedallattack",
      tier4_5: "ch_improvedalldefend",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "ch_slowcrash",
      tier2_1: "ch_mountaincrash",
      tier2_2: "ch_shockwave",
      tier3_1: "ch_imbuepower",
      tier3_2: "ch_chakra",
      tier4_1: "ch_swordbind",
      tier4_2: "ch_splashswing",
      tier4_3: "ch_nightwish",
      tier4_4: "ch_nightwish",
      tier4_5: "ch_swordbind",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.CHANTER);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch chanter stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // 3 1
    graph.addDependency("ch_mpheal", "ch_protectself");
    graph.addDependency("ch_mpheal", "ch_improvedallattack");
    // 3 2
    graph.addDependency("ch_blessprotect", "ch_improvedalldefend");
    // 2 1
    graph.addDependency("ch_chant_invincible", "ch_mpheal");
    graph.addDependency("ch_chant_invincible", "ch_blessprotect");
    // 2 2
    graph.addDependency("ch_surperiorheal", "ch_improvedallattack");
    graph.addDependency("ch_surperiorheal", "ch_improvedalldefend");
    // 1 1
    graph.addDependency("ch_improvedbody", "ch_chant_invincible");
    graph.addDependency("ch_improvedbody", "ch_surperiorheal");

    // 3 1
    graph.addDependency("ch_imbuepower", "ch_swordbind");
    graph.addDependency("ch_imbuepower", "ch_splashswing");
    // 3 2
    graph.addDependency("ch_chakra", "ch_nightwish");
    // 2 1
    graph.addDependency("ch_mountaincrash", "ch_imbuepower");
    graph.addDependency("ch_mountaincrash", "ch_chakra");
    // 2 2
    graph.addDependency("ch_shockwave", "ch_nightwish");
    graph.addDependency("ch_shockwave", "ch_swordbind");
    // 1 1
    graph.addDependency("ch_slowcrash", "ch_mountaincrash");
    graph.addDependency("ch_slowcrash", "ch_shockwave");

    return graph;
  }
}
