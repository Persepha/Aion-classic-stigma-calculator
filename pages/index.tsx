import { useEffect, useState } from "react";
import { Roboto } from "@next/font/google";

import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";
import { ClassesPanel } from "@/components/ClassesPanel";
import { StigmaPanel } from "@/components/StigmaPanel";
import {
  getNumberAdvancedSlotsAllowed,
  getNumberDefaultSlotsAllowed,
} from "@/utils/slots_calc";
import { CharLvlPicker } from "@/components/CharLvlPicker";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export default function Home() {
  const [currentClass, setCurrentClass] = useState<ClassesEnum>(
    ClassesEnum.FIGHTER
  );

  const [characterLvl, setCharacterLvl] = useState<number>(55);

  const [numberDefaultSlots, setNumberDefaultSlots] = useState<number>(6);
  const [numberAdvancedSlots, setNumberAdvancedSlots] = useState<number>(5);

  const [defaultStigmaSlots, setDefaultStigmaSlots] = useState([]);

  useEffect(() => {
    setNumberDefaultSlots(getNumberDefaultSlotsAllowed(characterLvl));
    setNumberAdvancedSlots(getNumberAdvancedSlotsAllowed(characterLvl));
  }, [characterLvl]);

  function selectClass(selectedClass: ClassesEnumType) {
    setCurrentClass(ClassesEnum[selectedClass]);
  }

  return (
    <>
      <main className={font.className}>
        <ClassesPanel selectClass={selectClass} selectedClass={currentClass} />
        <CharLvlPicker
          characterLvl={characterLvl}
          setCharacterLvl={setCharacterLvl}
          selectedClass={currentClass}
        />
        <StigmaPanel
          numberAdvancedSlotsAllowed={numberAdvancedSlots}
          numberDefaultSlotsAllowed={numberDefaultSlots}
        />
      </main>
    </>
  );
}
