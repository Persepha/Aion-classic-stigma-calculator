export enum ClassesEnum {
  PRIEST = "cleric",
  CHANTER = "chanter",
  WIZARD = "sorcerer",
  ELEMENTALIST = "spiritmaster",
  FIGHTER = "gladiator",
  KNIGHT = "templar",
  RANGER = "ranger",
  ASSASSIN = "assassin",
}

export type ClassesEnumType = keyof typeof ClassesEnum;
