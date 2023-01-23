import { Roboto } from "@next/font/google";
import { useState } from "react";
import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";
import { ClassesPanel } from "@/components/ClassesPanel";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export default function Home() {
  const [currentClass, setCurrentClass] = useState<ClassesEnum>(
    ClassesEnum.FIGHTER
  );

  function selectClass(selectedClass: ClassesEnumType) {
    setCurrentClass(ClassesEnum[selectedClass]);
  }

  return (
    <>
      <main className={font.className}>
        <ClassesPanel selectClass={selectClass} selectedClass={currentClass} />
      </main>
    </>
  );
}
