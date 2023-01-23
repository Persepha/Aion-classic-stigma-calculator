import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";

export interface ClassesPanelProps {
  selectClass: (selectedClass: ClassesEnumType) => void;
  selectedClass: ClassesEnum;
}
