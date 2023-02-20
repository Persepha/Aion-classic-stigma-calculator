import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Cleric implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "pr_calllightning",
      tier2_1:
        this.faction === "elyos"
          ? "pr_eternalservent_light"
          : "pr_eternalservent_dark",
      tier2_2: "pr_suffermemory",
      tier3_1: "pr_painlinks",
      tier3_2: "pr_revivehand",
      tier4_1: "pr_graceofgod",
      tier4_2: "pr_purgatory",
      tier4_3: "pr_sageswisdom",
      tier4_4: "pr_graceofgod",
      tier4_5: "pr_sageswisdom",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "pr_healershand",
      tier2_1: "pr_tranquility",
      tier2_2:
        this.faction === "elyos"
          ? "pr_healingservent_light"
          : "pr_healingservent_dark",
      tier3_1: "pr_regeneraitionshine",
      tier3_2: "pr_memoryblur",
      tier4_1: "pr_firstaid",
      tier4_2: "pr_massemergentheal",
      tier4_3: "pr_massdispel",
      tier4_4: "pr_massdispel",
      tier4_5: "pr_massemergentheal",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.PRIEST);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch cleric stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // 3 1
    graph.addDependency("pr_painlinks", "pr_graceofgod");
    graph.addDependency("pr_painlinks", "pr_purgatory");
    // 3 2
    graph.addDependency("pr_revivehand", "pr_sageswisdom");
    // 2 1
    graph.addDependency(
      this.faction === "elyos"
        ? "pr_eternalservent_light"
        : "pr_eternalservent_dark",
      "pr_painlinks"
    );
    graph.addDependency(
      this.faction === "elyos"
        ? "pr_eternalservent_light"
        : "pr_eternalservent_dark",
      "pr_revivehand"
    );
    // 2 2
    graph.addDependency("pr_suffermemory", "pr_graceofgod");
    graph.addDependency("pr_suffermemory", "pr_sageswisdom");
    // 1 1
    graph.addDependency(
      "pr_calllightning",
      this.faction === "elyos"
        ? "pr_eternalservent_light"
        : "pr_eternalservent_dark"
    );
    graph.addDependency("pr_calllightning", "pr_suffermemory");

    // 3 1
    graph.addDependency("pr_regeneraitionshine", "pr_firstaid");
    graph.addDependency("pr_regeneraitionshine", "pr_massemergentheal");
    // 3 2
    graph.addDependency("pr_memoryblur", "pr_massdispel");
    // 2 1
    graph.addDependency("pr_tranquility", "pr_regeneraitionshine");
    graph.addDependency("pr_tranquility", "pr_memoryblur");
    // 2 2
    graph.addDependency(
      this.faction === "elyos"
        ? "pr_healingservent_light"
        : "pr_healingservent_dark",
      "pr_massdispel"
    );
    graph.addDependency(
      this.faction === "elyos"
        ? "pr_healingservent_light"
        : "pr_healingservent_dark",
      "pr_massemergentheal"
    );
    // 1 1
    graph.addDependency("pr_healershand", "pr_tranquility");
    graph.addDependency(
      "pr_healershand",
      this.faction === "elyos"
        ? "pr_healingservent_light"
        : "pr_healingservent_dark"
    );

    return graph;
  }
}
