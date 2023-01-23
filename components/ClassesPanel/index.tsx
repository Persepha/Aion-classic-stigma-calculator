import React from "react";
import { NextPage } from "next";

import { ClassesEnum, ClassesEnumType } from "@/utils/aionClasses/types";
import styles from "./ClassesPanel.module.css";
import { ClassItem } from "@/components/ClassItem";
import { ClassesPanelProps } from "@/components/ClassesPanel/ClassesPanel.props";

export const ClassesPanel: NextPage<ClassesPanelProps> = ({
  selectClass,
  selectedClass,
}) => {
  return (
    <div className={styles.center}>
      <div className={styles.panel}>
        {Object.entries(ClassesEnum).map(([classKey, classValue]) => (
          <ClassItem
            classKey={classKey as ClassesEnumType}
            classValue={classValue}
            selectClass={selectClass}
            selectedClass={selectedClass}
            key={classKey}
          />
        ))}
      </div>
    </div>
  );
};
