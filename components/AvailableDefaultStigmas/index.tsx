import { NextPage } from "next";

import { AvailableDefaultStigmasProps } from "@/components/AvailableDefaultStigmas/AvailableDefaultStigmas.props";
import styles from "./AvailableDefaultStigmas.module.css";
import { AvailableDefaultStigma } from "@/components/Stigma/AvailableDefaultStigma";

export const AvailableDefaultStigmas: NextPage<
  AvailableDefaultStigmasProps
> = ({ stigmas, selectedClass, selectStigma }) => {
  return (
    <section className={styles.availableDefaultStigmasContainer}>
      {stigmas.map((stigma) => (
        <AvailableDefaultStigma
          selectedClass={selectedClass}
          selectStigma={selectStigma}
          key={stigma.stigma.id}
          stigma={stigma}
        />
      ))}
    </section>
  );
};
