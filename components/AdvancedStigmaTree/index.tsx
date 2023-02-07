import cn from "classnames";

import styles from "./AdvancedStigmaTree.module.css";
import { NextPage } from "next";
import { AvailableDefaultStigma } from "@/components/Stigma/AvailableDefaultStigma";
import { AdvancedStigmaTreeProps } from "@/components/AdvancedStigmaTree/AdvancedStigmaTree.props";

export const AdvancedStigmaTree: NextPage<AdvancedStigmaTreeProps> = ({
  advancedStigmaTree,
  selectStigma,
  selectedClass,
  isStigmaSelected,
  isStigmaCanBeSelected,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.tree}>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot1)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier4_1 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier4_1}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowTop}></span>
          </div>
          <span className={styles.arrowSide}></span>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot2)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier4_2 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier4_2}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowBottom}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot3)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier4_3 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier4_3}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.singleArrow}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot4)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier3_1 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier3_1}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowIn}></span>
            <span className={styles.arrowTop}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot5)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier3_2 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier3_2}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowBottom}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot6)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier4_4 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier4_4}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowTop}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot7)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier4_5 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier4_5}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowBottom}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot8)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier2_1 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier2_1}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowIn}></span>
            <span className={styles.arrowTop}></span>
          </div>
          <span className={styles.arrowSide}></span>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot9)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier2_2 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier2_2}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowIn}></span>
            <span className={styles.arrowBottom}></span>
          </div>
        </div>
        <div className={cn(styles.stigmaSlot, styles.stigmaSLot10)}>
          <div className={styles.stigma}>
            {advancedStigmaTree.tier1 && (
              <AvailableDefaultStigma
                stigma={advancedStigmaTree.tier1}
                selectStigma={selectStigma}
                selectedClass={selectedClass}
                isStigmaSelected={isStigmaSelected}
                isStigmaCanBeSelected={isStigmaCanBeSelected}
              />
            )}
            <span className={styles.arrowIn}></span>
          </div>
        </div>
      </div>
    </section>
  );
};
