import { useEffect, useRef, useState } from "react";
import { Roboto } from "@next/font/google";

import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";
import { ClassesPanel } from "@/components/ClassesPanel";
import { StigmaPanel } from "@/components/StigmaPanel";
import {
  getNumberAdvancedSlotsAllowed,
  getNumberDefaultSlotsAllowed,
} from "@/utils/slots_calc";
import { CharLvlPicker } from "@/components/CharLvlPicker";
import {
  getGladiatorStigmaTree,
  gladiatorFirstAdvancedStigmaTree,
} from "@/utils/fetchCharacterStigmaTree/getGladiatorStigmaTree";
import {
  ActiveAdvancedStigmaTree,
  AdvancedStigmaTreeSlots,
  ActiveStigma,
  StigmaTree,
} from "@/utils/fetchCharacterStigmaTree/types";
import { AvailableDefaultStigmas } from "@/components/AvailableDefaultStigmas";
import { AdvancedStigmaTree } from "@/components/AdvancedStigmaTree";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export default function Home() {
  const stigmaGraph = useRef<any>(null);

  const [currentClass, setCurrentClass] = useState<ClassesEnum>(
    ClassesEnum.FIGHTER
  );

  const [characterLvl, setCharacterLvl] = useState<number>(55);

  const [numberDefaultSlots, setNumberDefaultSlots] = useState<number>(6);
  const [numberAdvancedSlots, setNumberAdvancedSlots] = useState<number>(5);

  const [selectedDefaultStigmas, setSelectedDefaultStigmas] = useState<
    ActiveStigma[]
  >([]);

  const [selectedAdvancedStigmas, setSelectedAdvancedStigmas] = useState<
    ActiveStigma[]
  >([]);

  const [firstAdvancedStigmaTree, setFirstAdvancedStigmaTree] =
    useState<StigmaTree>({ stigmaTree: null });

  function selectClass(selectedClass: ClassesEnumType) {
    setCurrentClass(ClassesEnum[selectedClass]);
  }

  const [availableStigmas, setAvailableStigmas] = useState<ActiveStigma[]>([]);

  useEffect(() => {
    const fetchStigmas = async () => {
      const data = await getGladiatorStigmaTree(currentClass);
      stigmaGraph.current = data;

      getAvailableStigmas();

      setFirstAdvancedStigmaTree({
        stigmaTree: getAdvancedStigmaTree(gladiatorFirstAdvancedStigmaTree),
      });
    };

    fetchStigmas();
  }, [characterLvl]);

  const getAdvancedStigmaTree = (tree: AdvancedStigmaTreeSlots) => {
    let stigmaTree = {};
    for (const [key, stigmaId] of Object.entries(tree)) {
      const stigma = getStigmaById(stigmaId);
      stigmaTree = {
        ...stigmaTree,
        [key]: stigma,
      };
    }
    return stigmaTree as ActiveAdvancedStigmaTree;
  };

  const getStigmaById = (id: string): ActiveStigma => {
    const currentStigma = stigmaGraph.current.getNodeData(id);

    const availableStigmaLvls = currentStigma.lvls.filter(
      (lvl: number) => lvl <= characterLvl
    );

    return {
      maxAvailableStigmaLvl: !!availableStigmaLvls.length
        ? Math.max(...availableStigmaLvls)
        : null,
      stigma: currentStigma,
    };
  };

  const getAvailableStigmas = () => {
    setAvailableStigmas(
      stigmaGraph.current
        .overallOrder()
        .map((stigmaId: string) => getStigmaById(stigmaId))
        .filter((stigma: ActiveStigma) => stigma.stigma.type === 0)
    );
  };

  useEffect(() => {
    setNumberDefaultSlots(getNumberDefaultSlotsAllowed(characterLvl));
    setNumberAdvancedSlots(getNumberAdvancedSlotsAllowed(characterLvl));

    setSelectedAdvancedStigmas([]);
    setSelectedDefaultStigmas([]);
  }, [characterLvl]);

  const isStigmaSelected = (stigmaId: string) => {
    return (
      selectedDefaultStigmas.some((stigma) => stigma.stigma.id === stigmaId) ||
      selectedAdvancedStigmas.some((stigma) => stigma.stigma.id === stigmaId)
    );
  };

  const getSelectedStigmaDependencies = (stigmaId: string) => {
    const stigmaDependencies: ActiveStigma[] = stigmaGraph.current
      .dependenciesOf(stigmaId)
      .map((id: string) => getStigmaById(id));

    const selectedStigmas = [
      ...stigmaDependencies,
      getStigmaById(stigmaId),
    ].filter((stigma) => !isStigmaSelected(stigma.stigma.id));

    const defaultStigmas = selectedStigmas.filter(
      (stigma) => stigma.stigma.type === 0
    );
    const advancedStigmas = selectedStigmas.filter(
      (stigma) => stigma.stigma.type === 1
    );

    return [defaultStigmas, advancedStigmas];
  };

  const isStigmaCanBeActivated = (stigmaId: string) => {
    const [defaultStigmas, advancedStigmas] =
      getSelectedStigmaDependencies(stigmaId);

    const numberAdvancedSlotsRequired =
      advancedStigmas.length + selectedAdvancedStigmas.length;

    const numberEmptyAdvancedSlots =
      numberAdvancedSlots - numberAdvancedSlotsRequired;

    const numberDefaultSlotsRequired =
      defaultStigmas.length + selectedDefaultStigmas.length;

    return (
      numberAdvancedSlotsRequired <= numberAdvancedSlots &&
      numberDefaultSlotsRequired <=
        numberDefaultSlots + numberEmptyAdvancedSlots
    );
  };

  const selectStigma = (stigmaId: string) => {
    const [defaultStigmas, advancedStigmas] =
      getSelectedStigmaDependencies(stigmaId);

    if (isStigmaCanBeActivated(stigmaId)) {
      // Remove selected stigmas from available list
      const selectedStigmasId = defaultStigmas.map(
        (stigma) => stigma.stigma.id
      );

      setAvailableStigmas(
        availableStigmas.filter(
          (stigma) => !selectedStigmasId.includes(stigma.stigma.id)
        )
      );

      const numberEmptyDefaultSlots =
        numberDefaultSlots - selectedDefaultStigmas.length;

      let defStigmas = defaultStigmas.splice(0, numberEmptyDefaultSlots);

      setSelectedDefaultStigmas([...selectedDefaultStigmas, ...defStigmas]);

      setSelectedAdvancedStigmas([
        ...selectedAdvancedStigmas,
        ...advancedStigmas,
      ]);

      // Add remaining selected default stimgas to advanced stigma slots
      if (defaultStigmas.length > 0) {
        setSelectedAdvancedStigmas((prev) => [...prev, ...defaultStigmas]);
      }
    }
  };

  return (
    <>
      <div className={font.className}>
        <ClassesPanel selectClass={selectClass} selectedClass={currentClass} />
        <CharLvlPicker
          characterLvl={characterLvl}
          setCharacterLvl={setCharacterLvl}
          selectedClass={currentClass}
        />

        <main className="t">
          <section className="sp">
            <StigmaPanel
              numberAdvancedSlotsAllowed={numberAdvancedSlots}
              numberDefaultSlotsAllowed={numberDefaultSlots}
              selectedDefaultStigmas={selectedDefaultStigmas}
              selectedAdvancedStigmas={selectedAdvancedStigmas}
              selectedClass={currentClass}
              characterLvl={characterLvl}
            />

            <AvailableDefaultStigmas
              selectStigma={selectStigma}
              stigmas={availableStigmas}
              selectedClass={currentClass}
            />
          </section>

          <section className="sp">
            {firstAdvancedStigmaTree.stigmaTree && (
              <AdvancedStigmaTree
                advancedStigmaTree={firstAdvancedStigmaTree.stigmaTree}
                selectedClass={currentClass}
                selectStigma={selectStigma}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeActivated}
              />
            )}

            {firstAdvancedStigmaTree.stigmaTree && (
              <AdvancedStigmaTree
                advancedStigmaTree={firstAdvancedStigmaTree.stigmaTree}
                selectedClass={currentClass}
                selectStigma={selectStigma}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeActivated}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
}
