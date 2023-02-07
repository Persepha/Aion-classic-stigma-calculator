import { NextPage } from "next";

import cn from "classnames";

import { StigmaPanelProps } from "@/components/StigmaPanel/StigmaPanel.props";
import {
  MAX_ADVANCED_STIGMA_SLOTS,
  MAX_DEFAULT_STIGMA_SLOTS,
} from "@/utils/consts";
import styles from "./StigmaPanel.module.css";
import { SelectedStigma } from "@/components/Stigma/SelectedStigma";

export const StigmaPanel: NextPage<StigmaPanelProps> = ({
  numberDefaultSlotsAllowed,
  numberAdvancedSlotsAllowed,
  selectedDefaultStigmas,
  selectedAdvancedStigmas,
  selectedClass,
  characterLvl,
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
                : styles.disabledDefaultStigmaSlot,
              {
                [styles.activeDefaultStigmaSlot]:
                  !!selectedDefaultStigmas[index],
              }
            )}
            key={index}
          >
            {selectedDefaultStigmas[index] ? (
              <SelectedStigma
                selectedClass={selectedClass}
                stigma={selectedDefaultStigmas[index]}
                characterLvl={characterLvl}
              />
            ) : null}
          </div>
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
                : styles.disabledAdvancedStigmaSlot,
              {
                [styles.activeAdvancedStigmaSlot]:
                  !!selectedAdvancedStigmas[index],
              }
            )}
            key={index}
          >
            {selectedAdvancedStigmas[index] ? (
              <SelectedStigma
                selectedClass={selectedClass}
                stigma={selectedAdvancedStigmas[index]}
                characterLvl={characterLvl}
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};
