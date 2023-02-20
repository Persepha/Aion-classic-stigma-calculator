import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Spiritmaster implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "el_hellcurse",
      tier2_1: "el_hellpain",
      tier2_2: "el_sleepingspirit",
      tier3_1: "el_enfeeblement",
      tier3_2: "el_manareverse",
      tier4_1: "el_bind",
      tier4_2: "el_silence",
      tier4_3: "el_enchantmentburst",
      tier4_4: "el_silence",
      tier4_5: "el_enchantmentburst",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "el_order_omen",
      tier2_1: "el_stigma_order_destructimpact",
      tier2_2: "el_elementalcharge",
      tier3_1: "el_enchantarmor",
      tier3_2:
        this.faction === "elyos"
          ? "el_slave_stormservent_light"
          : "el_slave_stormservent_dark",
      tier4_1: "el_dimisspolymorph",
      tier4_2: "el_ethercharge",
      tier4_3: "el_sympatheticswitch",
      tier4_4: "el_sympatheticswitch",
      tier4_5: "el_dimisspolymorph",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.ELEMENTALIST);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch spiritmaster stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // 3 1
    graph.addDependency("el_enfeeblement", "el_bind");
    graph.addDependency("el_enfeeblement", "el_silence");
    // 3 2
    graph.addDependency("el_manareverse", "el_enchantmentburst");
    // 2 1
    graph.addDependency("el_hellpain", "el_enfeeblement");
    graph.addDependency("el_hellpain", "el_manareverse");
    // 2 2
    graph.addDependency("el_sleepingspirit", "el_bind");
    graph.addDependency("el_sleepingspirit", "el_enchantmentburst");
    // 1 1
    graph.addDependency("el_hellcurse", "el_hellpain");
    graph.addDependency("el_hellcurse", "el_sleepingspirit");

    // 3 1
    graph.addDependency("el_enchantarmor", "el_dimisspolymorph");
    graph.addDependency("el_enchantarmor", "el_ethercharge");
    // 3 2
    graph.addDependency(
      this.faction === "elyos"
        ? "el_slave_stormservent_light"
        : "el_slave_stormservent_dark",
      "el_sympatheticswitch"
    );
    // 2 1
    graph.addDependency("el_stigma_order_destructimpact", "el_enchantarmor");
    graph.addDependency(
      "el_stigma_order_destructimpact",
      this.faction === "elyos"
        ? "el_slave_stormservent_light"
        : "el_slave_stormservent_dark"
    );
    // 2 2
    graph.addDependency("el_elementalcharge", "el_sympatheticswitch");
    graph.addDependency("el_elementalcharge", "el_dimisspolymorph");
    // 1 1
    graph.addDependency("el_order_omen", "el_stigma_order_destructimpact");
    graph.addDependency("el_order_omen", "el_elementalcharge");

    return graph;
  }
}
