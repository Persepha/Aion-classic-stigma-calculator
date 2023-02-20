import {
  AdvancedStigmaTreeSlots,
  CharacterStigmas,
} from "@/utils/fetchCharacterStigmaTree/types";
import { DepGraph } from "dependency-graph";
import { fetchStigmas } from "@/utils/fetchCharacterStigmaTree/fetchCharacterStigmas";
import { ClassesEnum } from "@/utils/aionClasses/types";

export class Templar implements CharacterStigmas {
  faction: string;

  constructor(faction: string) {
    this.faction = faction;
  }

  getFirstStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "kn_destructshield",
      tier2_1: "kn_destructwish",
      tier2_2: "kn_fortitudewave",
      tier3_1: "kn_brainstorm",
      tier3_2: "kn_powersink",
      tier4_1: "kn_divinepower",
      tier4_2: "kn_breakpower",
      tier4_3: "kn_holywrath",
      tier4_4: "kn_breakpower",
      tier4_5: "kn_holywrath",
    };
  }

  getSecondStigmaTree(): AdvancedStigmaTreeSlots {
    return {
      tier1: "kn_invinsibleprotect",
      tier2_1: "kn_invinsibleshield",
      tier2_2: "kn_intimidation",
      tier3_1: "kn_recover",
      tier3_2: "kn_sentinel",
      tier4_1: "kn_highprovoke",
      tier4_2: "kn_massiveprovoke",
      tier4_3: "kn_grandprotection",
      tier4_4: "kn_highprovoke",
      tier4_5: "kn_grandprotection",
    };
  }

  async getStigmas(): Promise<DepGraph<any>> {
    const stigmas = await fetchStigmas(ClassesEnum.KNIGHT);

    if (!stigmas) {
      return Promise.reject(new Error("Fetch templar stigmas error"));
    }

    let graph = new DepGraph();

    for (const stigma of stigmas) {
      graph.addNode(stigma.id, stigma);
    }

    graph.addDependency("kn_brainstorm", "kn_divinepower");
    graph.addDependency("kn_brainstorm", "kn_breakpower");

    graph.addDependency("kn_powersink", "kn_holywrath");

    graph.addDependency("kn_destructwish", "kn_brainstorm");
    graph.addDependency("kn_destructwish", "kn_holywrath");

    graph.addDependency("kn_fortitudewave", "kn_breakpower");
    graph.addDependency("kn_fortitudewave", "kn_holywrath");

    graph.addDependency("kn_destructshield", "kn_destructwish");
    graph.addDependency("kn_destructshield", "kn_fortitudewave");

    graph.addDependency("kn_sentinel", "kn_massiveprovoke");
    graph.addDependency("kn_sentinel", "kn_grandprotection");

    graph.addDependency("kn_recover", "kn_highprovoke");

    graph.addDependency("kn_invinsibleshield", "kn_sentinel");
    graph.addDependency("kn_invinsibleshield", "kn_recover");

    graph.addDependency("kn_intimidation", "kn_highprovoke");
    graph.addDependency("kn_intimidation", "kn_grandprotection");

    graph.addDependency("kn_invinsibleprotect", "kn_invinsibleshield");
    graph.addDependency("kn_invinsibleprotect", "kn_intimidation");

    return graph;
  }
}
