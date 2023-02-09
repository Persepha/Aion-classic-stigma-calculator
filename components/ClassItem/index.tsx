import React from "react";
import { NextPage } from "next";
import Image from "next/image";

import cn from "classnames";

import { ClassItemProps } from "@/components/ClassItem/ClassItem.props";
import styles from "./ClassItem.module.css";

export const ClassItem: NextPage<ClassItemProps> = ({
  classKey,
  classValue,
  selectClass,
  selectedClass,
}) => {
  const handleClick = () => {
    selectClass(classKey);
  };

  return (
    <Image
      onClick={handleClick}
      src={`/images/classes/${classValue}.png`}
      alt={classValue}
      width={64}
      height={64}
      className={cn(styles.item, {
        [styles.selected]: classValue === selectedClass,
      })}
    />
  );
};
