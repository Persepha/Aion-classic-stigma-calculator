import { NextPage } from "next";

import cn from "classnames";

import { StigmaPanelProps } from "@/components/StigmaPanel/StigmaPanel.props";
import {
  MAX_ADVANCED_STIGMA_SLOTS,
  MAX_DEFAULT_STIGMA_SLOTS,
} from "@/utils/consts";
import styles from "./StigmaPanel.module.css";

export const StigmaPanel: NextPage<StigmaPanelProps> = ({
  numberDefaultSlotsAllowed,
  numberAdvancedSlotsAllowed,
}) => {
  return (
    <section className={styles.panel}>
      <div className={styles.stigmaContainer}>
        {[...Array(MAX_DEFAULT_STIGMA_SLOTS)].map((slot, index) => (
          <div
            className={cn(
              styles.stigmaSlot,
              numberDefaultSlotsAllowed > index
                ? styles.defaultStigmaSlot
                : styles.disabledDefaultStigmaSlot
            )}
            key={index}
          ></div>
        ))}
      </div>

      <div className={styles.stigmaContainer}>
        {[...Array(MAX_ADVANCED_STIGMA_SLOTS)].map((slot, index) => (
          <div
            className={cn(
              styles.stigmaSlot,
              styles.advancedStigma,
              numberAdvancedSlotsAllowed > index
                ? styles.advancedStigmaSlot
                : styles.disabledAdvancedStigmaSlot
            )}
            key={index}
          ></div>
        ))}
      </div>
    </section>
  );
};
