import { ClassesEnum } from "@/utils/aionClasses/types";
import {
  Assassin,
  Chanter,
  Cleric,
  Gladiator,
  Ranger,
  Sorcerer,
  Spiritmaster,
  Templar,
} from "@/utils/aionClasses";

const characters = {
  [ClassesEnum.FIGHTER]: Gladiator,
  [ClassesEnum.KNIGHT]: Templar,
  [ClassesEnum.RANGER]: Ranger,
  [ClassesEnum.ASSASSIN]: Assassin,
  [ClassesEnum.WIZARD]: Sorcerer,
  [ClassesEnum.ELEMENTALIST]: Spiritmaster,
  [ClassesEnum.PRIEST]: Cleric,
  [ClassesEnum.CHANTER]: Chanter,
};

export const getCharacterStigmas = async (
  characterName: string,
  faction: string
) => {
  const character = new characters[characterName as keyof typeof characters](
    faction
  );

  return {
    stigmas: await character.getStigmas(),
    firstStigmaTree: character.getFirstStigmaTree(),
    secondStigmaTree: character.getSecondStigmaTree(),
  };
};
