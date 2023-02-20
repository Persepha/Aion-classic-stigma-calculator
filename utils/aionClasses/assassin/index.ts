import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Assassin implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "as_silentburst",
      tier2_1: "as_chainsignetburst",
      tier2_2: "as_stunburst",
      tier3_1: "as_tigerassault",
      tier3_2: "as_windslash",
      tier4_1: "as_signetwave",
      tier4_2: "as_signetflare",
      tier4_3: "as_visiouseye",
      tier4_4: "as_signetwave",
      tier4_5: "as_visiouseye",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "as_venomslash",
      tier2_1: "as_assaultslash",
      tier2_2: "as_senseboost",
      tier3_1: "as_explosionpoison",
      tier3_2: "as_flashslash",
      tier4_1: "as_stuningintention",
      tier4_2: "as_hitmanmind",
      tier4_3: "as_blindingburst",
      tier4_4: "as_stuningintention",
      tier4_5: "as_blindingburst",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.ASSASSIN);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch assasin stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    // 3 1
    graph.addDependency("as_tigerassault", "as_signetwave");
    graph.addDependency("as_tigerassault", "as_signetflare");
    // 3 2
    graph.addDependency("as_windslash", "as_visiouseye");
    // 2 1
    graph.addDependency("as_chainsignetburst", "as_tigerassault");
    graph.addDependency("as_chainsignetburst", "as_windslash");
    // 2 2
    graph.addDependency("as_stunburst", "as_signetwave");
    graph.addDependency("as_stunburst", "as_visiouseye");
    // 1 1
    graph.addDependency("as_silentburst", "as_chainsignetburst");
    graph.addDependency("as_silentburst", "as_stunburst");

    // 3 1
    graph.addDependency("as_explosionpoison", "as_stuningintention");
    graph.addDependency("as_explosionpoison", "as_hitmanmind");
    // 3 2
    graph.addDependency("as_flashslash", "as_blindingburst");
    // 2 1
    graph.addDependency("as_assaultslash", "as_explosionpoison");
    graph.addDependency("as_assaultslash", "as_flashslash");
    // 2 2
    graph.addDependency("as_senseboost", "as_stuningintention");
    graph.addDependency("as_senseboost", "as_blindingburst");
    // 1 1
    graph.addDependency("as_venomslash", "as_assaultslash");
    graph.addDependency("as_venomslash", "as_senseboost");

    return graph;
  }
}
