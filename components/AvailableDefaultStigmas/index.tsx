import { NextPage } from "next";

import { AvailableDefaultStigmasProps } from "@/components/AvailableDefaultStigmas/AvailableDefaultStigmas.props";
import styles from "./AvailableDefaultStigmas.module.css";
import { AvailableDefaultStigma } from "@/components/Stigma/AvailableDefaultStigma";
import { useEffect, useState } from "react";

export const AvailableDefaultStigmas: NextPage<
  AvailableDefaultStigmasProps
> = ({ stigmas, selectedClass, selectStigma }) => {
  const [triggerSelectStigma, setTriggerSelectStigma] = useState<number>(0);
  useEffect(() => {
    setTriggerSelectStigma((triggerSelectStigma) => triggerSelectStigma + 1);
  }, [stigmas]);
  return (
    <section className={styles.availableDefaultStigmasContainer}>
      {stigmas.map((stigma) => (
        <AvailableDefaultStigma
          triggerSelectStigma={triggerSelectStigma}
          selectedClass={selectedClass}
          selectStigma={selectStigma}
          key={stigma.stigma.id}
          stigma={stigma}
        />
      ))}
    </section>
  );
};
