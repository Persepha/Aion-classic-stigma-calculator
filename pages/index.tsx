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
  ActiveAdvancedStigmaTree,
  AdvancedStigmaTreeSlots,
  ActiveStigma,
  StigmaTree,
} from "@/utils/fetchCharacterStigmaTree/types";
import { AvailableDefaultStigmas } from "@/components/AvailableDefaultStigmas";
import { AdvancedStigmaTree } from "@/components/AdvancedStigmaTree";
import { StigmaCostPanel } from "@/components/StigmaCostPanel";
import {
  MAX_ADVANCED_STIGMA_SLOTS,
  MAX_CHARARCTER_LVL,
  MAX_DEFAULT_STIGMA_SLOTS,
} from "@/utils/consts";
import { FactionPicker } from "@/components/FactionPicker";
import { getCharacterStigmas } from "@/utils/fetchCharacterStigmaTree/getCharacterStigmas";
import { Footer } from "@/components/Footer";
import { IndexPage } from "@/components/IndexPage";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export default function Home() {
  const stigmaGraph = useRef<any>(null);

  const [currentClass, setCurrentClass] = useState<ClassesEnum>(
    ClassesEnum.FIGHTER
  );

  const [characterLvl, setCharacterLvl] = useState<number>(MAX_CHARARCTER_LVL);

  const [numberDefaultSlots, setNumberDefaultSlots] = useState<number>(
    MAX_DEFAULT_STIGMA_SLOTS
  );
  const [numberAdvancedSlots, setNumberAdvancedSlots] = useState<number>(
    MAX_ADVANCED_STIGMA_SLOTS
  );

  const [selectedDefaultStigmas, setSelectedDefaultStigmas] = useState<
    ActiveStigma[]
  >([]);

  const [selectedAdvancedStigmas, setSelectedAdvancedStigmas] = useState<
    ActiveStigma[]
  >([]);

  const [stigmasShardCost, setStigmasShardCost] = useState<number>(0);
  const [stigmasAPCost, setStigmasAPCost] = useState<number>(0);

  const updateSelectedStigmaLvl = (stigmaId: string, lvl: number) => {
    setSelectedDefaultStigmas(
      selectedDefaultStigmas.map((stigma) =>
        stigma.stigma.id === stigmaId
          ? { ...stigma, selectedStigmaLvl: lvl }
          : stigma
      )
    );
    setSelectedAdvancedStigmas(
      selectedAdvancedStigmas.map((stigma) =>
        stigma.stigma.id === stigmaId
          ? { ...stigma, selectedStigmaLvl: lvl }
          : stigma
      )
    );
  };

  const updateStigmaCost = () => {
    const selectedStigmas = [
      ...selectedDefaultStigmas,
      ...selectedAdvancedStigmas,
    ];

    const shardCost = selectedStigmas.reduce((sum, stigma) => {
      if (stigma.selectedStigmaLvl) {
        return sum + stigma.stigma[stigma.selectedStigmaLvl]["Shards cost"];
      }
      return sum;
    }, 0);

    setStigmasShardCost(shardCost);

    const apCost = selectedStigmas.reduce((sum, stigma) => {
      if (stigma.selectedStigmaLvl) {
        const apCost = stigma.stigma[stigma.selectedStigmaLvl]["Abyss point"]
          ? stigma.stigma[stigma.selectedStigmaLvl]["Abyss point"]
          : 0;
        return sum + apCost;
      }
      return sum;
    }, 0);

    setStigmasAPCost(apCost);
  };

  useEffect(() => {
    updateStigmaCost();
  }, [selectedDefaultStigmas, selectedAdvancedStigmas]);

  const [firstAdvancedStigmaTree, setFirstAdvancedStigmaTree] =
    useState<StigmaTree>({ stigmaTree: null });

  const [secondAdvancedStigmaTree, setSecondAdvancedStigmaTree] =
    useState<StigmaTree>({ stigmaTree: null });

  function selectClass(selectedClass: ClassesEnumType) {
    setCurrentClass(ClassesEnum[selectedClass]);
  }

  const [faction, setFaction] = useState<string>("elyos");

  const [availableStigmas, setAvailableStigmas] = useState<ActiveStigma[]>([]);

  useEffect(() => {
    const fetchStigmas = async () => {
      const { stigmas, firstStigmaTree, secondStigmaTree } =
        await getCharacterStigmas(currentClass, faction);
      stigmaGraph.current = stigmas;

      getAvailableStigmas();

      setFirstAdvancedStigmaTree({
        stigmaTree: getAdvancedStigmaTree(firstStigmaTree!),
      });

      setSecondAdvancedStigmaTree({
        stigmaTree: getAdvancedStigmaTree(secondStigmaTree!),
      });
    };

    fetchStigmas();
  }, [characterLvl, faction, currentClass]);

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

    const maxAvailableStigmaLvl = !!availableStigmaLvls.length
      ? Math.max(...availableStigmaLvls)
      : null;

    return {
      maxAvailableStigmaLvl: maxAvailableStigmaLvl,
      selectedStigmaLvl: maxAvailableStigmaLvl,
      stigma: currentStigma,
    };
  };

  const getAvailableStigmas = () => {
    setAvailableStigmas(
      stigmaGraph.current
        .overallOrder()
        .map((stigmaId: string) => getStigmaById(stigmaId))
        .filter(
          (stigma: ActiveStigma) =>
            stigma.stigma.type === 0 &&
            (stigma.stigma.faction === "daeva" ||
              stigma.stigma.faction === faction)
        )
    );
  };

  useEffect(() => {
    setNumberDefaultSlots(getNumberDefaultSlotsAllowed(characterLvl));
    setNumberAdvancedSlots(getNumberAdvancedSlotsAllowed(characterLvl));

    setSelectedAdvancedStigmas([]);
    setSelectedDefaultStigmas([]);
  }, [characterLvl, currentClass, faction]);

  const isStigmaSelected = (stigmaId: string) => {
    return (
      selectedDefaultStigmas.some((stigma) => stigma.stigma.id === stigmaId) ||
      selectedAdvancedStigmas.some((stigma) => stigma.stigma.id === stigmaId)
    );
  };

  const getStigmaDependencies = (stigmaId: string) => {
    const stigmaDependencies: ActiveStigma[] = stigmaGraph.current
      .dependenciesOf(stigmaId)
      .map((id: string) => getStigmaById(id));

    return [...stigmaDependencies, getStigmaById(stigmaId)];
  };

  const getStigmaDependantsOf = (stigmaId: string) => {
    const stigmaDependencies: ActiveStigma[] = stigmaGraph.current
      .dependantsOf(stigmaId)
      .map((id: string) => getStigmaById(id));

    return [...stigmaDependencies, getStigmaById(stigmaId)];
  };

  const getSelectedStigmaDependencies = (stigmaId: string) => {
    const selectedStigmas = getStigmaDependencies(stigmaId).filter(
      (stigma) => !isStigmaSelected(stigma.stigma.id)
    );

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

  const deleteStigma = (stigmaId: string) => {
    const stigmaDependants = getStigmaDependantsOf(stigmaId);

    const removalAdvancedStigmas = selectedAdvancedStigmas.filter(
      (selectedStigma) =>
        stigmaDependants.some(
          (stigma) => stigma.stigma.id === selectedStigma.stigma.id
        )
    );

    const removalDefaultStigmas = selectedDefaultStigmas.filter(
      (selectedStigma) =>
        stigmaDependants.some(
          (stigma) => stigma.stigma.id === selectedStigma.stigma.id
        )
    );

    const removalStigmas = [
      ...removalDefaultStigmas,
      ...removalAdvancedStigmas,
    ];

    setSelectedDefaultStigmas(
      selectedDefaultStigmas.filter(
        (selectedStigma) =>
          !removalStigmas.some(
            (stigma) => stigma.stigma.id === selectedStigma.stigma.id
          )
      )
    );

    setSelectedAdvancedStigmas(
      selectedAdvancedStigmas.filter(
        (selectedStigma) =>
          !removalStigmas.some(
            (stigma) => stigma.stigma.id === selectedStigma.stigma.id
          )
      )
    );

    setAvailableStigmas([
      ...availableStigmas,
      ...removalStigmas.filter((stigma) => stigma.stigma.type === 0),
    ]);
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
      <IndexPage />
      <div className={font.className}>
        <main className="stigmaCalculator">
          <ClassesPanel
            selectClass={selectClass}
            selectedClass={currentClass}
          />

          <section className="sp">
            <div className="flexColumn">
              <StigmaPanel
                numberAdvancedSlotsAllowed={numberAdvancedSlots}
                numberDefaultSlotsAllowed={numberDefaultSlots}
                selectedDefaultStigmas={selectedDefaultStigmas}
                selectedAdvancedStigmas={selectedAdvancedStigmas}
                selectedClass={currentClass}
                characterLvl={characterLvl}
                updateSelectedStigmaLvl={updateSelectedStigmaLvl}
                deleteStigma={deleteStigma}
              />

              <div className="stigmaCostPanel">
                <StigmaCostPanel
                  stigmaShardCost={stigmasShardCost}
                  stigmaAPCost={stigmasAPCost}
                />
              </div>
            </div>

            <div className="flexColumn">
              <div className="dataPickerPanel">
                <FactionPicker faction={faction} setFaction={setFaction} />

                <CharLvlPicker
                  characterLvl={characterLvl}
                  setCharacterLvl={setCharacterLvl}
                  selectedClass={currentClass}
                />
              </div>

              <AvailableDefaultStigmas
                selectStigma={selectStigma}
                stigmas={availableStigmas}
                selectedClass={currentClass}
                isStigmaCanBeSelected={isStigmaCanBeActivated}
              />
            </div>
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

            {secondAdvancedStigmaTree.stigmaTree && (
              <AdvancedStigmaTree
                advancedStigmaTree={secondAdvancedStigmaTree.stigmaTree}
                selectedClass={currentClass}
                selectStigma={selectStigma}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeActivated}
              />
            )}
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
