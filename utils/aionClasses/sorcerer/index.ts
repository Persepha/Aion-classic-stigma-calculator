import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Sorcerer implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "wi_icyshield",
      tier2_1: "wi_sleepingstorm",
      tier2_2: "wi_elementalseal",
      tier3_1: "wi_illusionstorm",
      tier3_2: "wi_illusiondance",
      tier4_1: "wi_cursedtree",
      tier4_2: "wi_countermagic",
      tier4_3: "wi_arcaneboost",
      tier4_4: "wi_countermagic",
      tier4_5: "wi_arcaneboost",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "wi_zeropoint",
      tier2_1: "wi_flamestrike",
      tier2_2: "wi_stormshock",
      tier3_1: "wi_rockfall",
      tier3_2: "wi_soulgain",
      tier4_1:
        this.faction === "elyos"
          ? "wi_frostpillar_light"
          : "wi_frostpillar_dark",
      tier4_2: "wi_windcutter",
      tier4_3: "wi_arcanepower",
      tier4_4:
        this.faction === "elyos"
          ? "wi_frostpillar_light"
          : "wi_frostpillar_dark",
      tier4_5: "wi_arcanepower",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.WIZARD);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch sorcerer stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // 3 1
    graph.addDependency("wi_illusionstorm", "wi_cursedtree");
    graph.addDependency("wi_illusionstorm", "wi_countermagic");
    // 3 2
    graph.addDependency("wi_illusiondance", "wi_arcaneboost");
    // 2 1
    graph.addDependency("wi_sleepingstorm", "wi_illusionstorm");
    graph.addDependency("wi_sleepingstorm", "wi_illusiondance");
    // 2 2
    graph.addDependency("wi_elementalseal", "wi_countermagic");
    graph.addDependency("wi_elementalseal", "wi_arcaneboost");
    // 1 1
    graph.addDependency("wi_icyshield", "wi_sleepingstorm");
    graph.addDependency("wi_icyshield", "wi_elementalseal");

    // 3 1
    graph.addDependency(
      "wi_rockfall",
      this.faction === "elyos" ? "wi_frostpillar_light" : "wi_frostpillar_dark"
    );
    graph.addDependency("wi_rockfall", "wi_windcutter");
    // 3 2
    graph.addDependency("wi_soulgain", "wi_arcanepower");
    // 2 1
    graph.addDependency("wi_flamestrike", "wi_rockfall");
    graph.addDependency("wi_flamestrike", "wi_soulgain");
    // 2 2
    graph.addDependency(
      "wi_stormshock",
      this.faction === "elyos" ? "wi_frostpillar_light" : "wi_frostpillar_dark"
    );
    graph.addDependency("wi_stormshock", "wi_arcanepower");
    // 1 1
    graph.addDependency("wi_zeropoint", "wi_flamestrike");
    graph.addDependency("wi_zeropoint", "wi_stormshock");

    return graph;
  }
}
