import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Ranger implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "ra_lightningshot",
      tier2_1: "ra_shadowarrow",
      tier2_2:
        this.faction === "elyos"
          ? "ra_blazingtrap_light"
          : "ra_blazingtrap_dark",
      tier3_1: "ra_movingshot",
      tier3_2: "ra_panthermove",
      tier4_1: "ra_backdashstab",
      tier4_2: "ra_breathofnature",
      tier4_3:
        this.faction === "elyos"
          ? "ra_throwingtrap_light"
          : "ra_throwingtrap_dark",
      tier4_4: "ra_breathofnature",
      tier4_5:
        this.faction === "elyos"
          ? "ra_throwingtrap_light"
          : "ra_throwingtrap_dark",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "ra_painarrow",
      tier2_1: "ra_massexplosionarrow",
      tier2_2: "ra_trackermind",
      tier3_1: "ra_explosionarrow",
      tier3_2: "ra_huntermind",
      tier4_1: "ra_enchantbow",
      tier4_2: "sc_trueshotmind",
      tier4_3: "ra_spoutarrow",
      tier4_4: "ra_spoutarrow",
      tier4_5: "sc_trueshotmind",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.RANGER);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch ranger stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // first advanced stigma tree
    // 3 1
    graph.addDependency("ra_movingshot", "ra_backdashstab");
    graph.addDependency("ra_movingshot", "ra_breathofnature");
    // 3 2
    graph.addDependency(
      "ra_panthermove",
      this.faction === "elyos"
        ? "ra_throwingtrap_light"
        : "ra_throwingtrap_dark"
    );
    //2 1
    graph.addDependency("ra_shadowarrow", "ra_movingshot");
    graph.addDependency("ra_shadowarrow", "ra_panthermove");
    // 2 2
    graph.addDependency(
      this.faction === "elyos" ? "ra_blazingtrap_light" : "ra_blazingtrap_dark",
      "ra_breathofnature"
    );
    graph.addDependency(
      this.faction === "elyos" ? "ra_blazingtrap_light" : "ra_blazingtrap_dark",
      this.faction === "elyos"
        ? "ra_throwingtrap_light"
        : "ra_throwingtrap_dark"
    );
    // 1 1
    graph.addDependency("ra_lightningshot", "ra_shadowarrow");
    graph.addDependency(
      "ra_lightningshot",
      this.faction === "elyos" ? "ra_blazingtrap_light" : "ra_blazingtrap_dark"
    );

    // 3 1
    graph.addDependency("ra_explosionarrow", "ra_enchantbow");
    graph.addDependency("ra_explosionarrow", "sc_trueshotmind");

    // 3 2
    graph.addDependency("ra_huntermind", "ra_spoutarrow");

    // 2 1
    graph.addDependency("ra_massexplosionarrow", "ra_explosionarrow");
    graph.addDependency("ra_massexplosionarrow", "ra_huntermind");

    // 2 2
    graph.addDependency("ra_trackermind", "ra_explosionarrow");
    graph.addDependency("ra_trackermind", "sc_trueshotmind");

    // 1 1
    graph.addDependency("ra_painarrow", "ra_massexplosionarrow");
    graph.addDependency("ra_painarrow", "ra_trackermind");

    return graph;
  }
}
