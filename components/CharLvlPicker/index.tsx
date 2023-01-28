import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import styles from "./CharLvlPicker.module.css";
import { CharLvlPickerProps } from "@/components/CharLvlPicker/CharLvlPicker.props";
import { MAX_CHARARCTER_LVL, MIN_CHARARCTER_LVL } from "@/utils/consts";
import { useDebounce } from "@/hooks/useDebounce";

export const CharLvlPicker: NextPage<CharLvlPickerProps> = ({
  characterLvl,
  setCharacterLvl,
  selectedClass,
}) => {
  const [value, setValue] = useState<number>(characterLvl);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const getCharacterLvl = () => {
      if (debouncedValue <= MIN_CHARARCTER_LVL) {
        setCharacterLvl(MIN_CHARARCTER_LVL);
        setValue(MIN_CHARARCTER_LVL);
      } else if (debouncedValue >= MAX_CHARARCTER_LVL) {
        setCharacterLvl(MAX_CHARARCTER_LVL);
        setValue(MAX_CHARARCTER_LVL);
      } else {
        setCharacterLvl(debouncedValue);
        setValue(debouncedValue);
      }
    };

    getCharacterLvl();
  }, [debouncedValue]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLvl = parseInt(event.target.value);
    setValue(selectedLvl ? selectedLvl : MAX_CHARARCTER_LVL);
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.icon}
        src={`images/classes/${selectedClass}.png`}
        alt="selectedClassIcon"
      />
      <input
        type="number"
        value={value}
        onChange={onChangeInput}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
};
