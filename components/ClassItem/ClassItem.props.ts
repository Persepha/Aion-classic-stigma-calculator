import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";

export interface ClassItemProps {
  classKey: ClassesEnumType;
  classValue: string;
  selectClass: (selectedClass: ClassesEnumType) => void;
  selectedClass: ClassesEnum;
}
