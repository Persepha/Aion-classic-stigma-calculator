import React, { useEffect, useRef, useState } from "react";

import { NextPage } from "next";
import cn from "classnames";

import { AvailableDefaultStigmaProps } from "@/components/Stigma/AvailableDefaultStigma/AvailableDefaultStigma.props";
import styles from "../Stigma.module.css";
import { StigmaDescription } from "@/components/Stigma/StigmaDescription";

export const AvailableDefaultStigma: NextPage<AvailableDefaultStigmaProps> = ({
  stigma,
  selectedClass,
  selectStigma,
  isStigmaSelected,
  isStigmaCanBeSelected,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    selectStigma(stigma.stigma.id);
  };

  const stigmaLvl = stigma.maxAvailableStigmaLvl
    ? stigma.maxAvailableStigmaLvl
    : Math.max(...stigma.stigma.lvls);

  const isStigmaActive = isStigmaSelected
    ? isStigmaSelected(stigma.stigma.id)
    : false;

  const isStigmaCanBeActivated = isStigmaCanBeSelected
    ? isStigmaCanBeSelected(stigma.stigma.id)
    : true;

  const tooltipEl = useRef<HTMLDivElement>(null);

  const [availableSpaceOnRight, setAvailableSpaceOnRight] = useState<number>(0);
  const [availableSpaceOnBottom, setAvailableSpaceOnBottom] =
    useState<number>(0);

  const handleResize = () => {
    if (tooltipEl.current) {
      const rect = tooltipEl.current.getBoundingClientRect();

      const left = rect.left + document.body.scrollLeft;
      const stigmaOffsetWidth = tooltipEl.current.offsetWidth;
      const availableSpaceOnRight =
        document.body.clientWidth - (left + stigmaOffsetWidth);
      setAvailableSpaceOnRight(availableSpaceOnRight);

      const bottom = rect.bottom + document.body.scrollTop;
      const availableSpaceOnBottom = document.body.clientHeight - bottom;
      setAvailableSpaceOnBottom(availableSpaceOnBottom);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={tooltipEl}
      className={cn({
        [styles.blocked]:
          !stigma.maxAvailableStigmaLvl ||
          isStigmaActive ||
          !isStigmaCanBeActivated,
      })}
    >
      <div
        className={cn(styles.stigmaContainer, {
          [styles.blockedCursor]:
            !stigma.maxAvailableStigmaLvl ||
            isStigmaActive ||
            !isStigmaCanBeActivated,
        })}
      >
        <div className={styles.tooltip}>
          {!stigma.maxAvailableStigmaLvl ? (
            <div className={styles.blockedOverlay}></div>
          ) : !isStigmaCanBeActivated ? (
            <div className={styles.notEnoughSlots}></div>
          ) : null}

          {isStigmaActive && <div className={styles.selectedOverlay}></div>}

          <img
            onClick={handleClick}
            src={`/images/${selectedClass}/${stigma.stigma[stigmaLvl].name}.png`}
            alt={`${stigma.stigma[stigmaLvl].name} icon`}
          />

          <StigmaDescription
            stigma={stigma}
            stigmaLvl={stigmaLvl}
            isAvailable={!stigma.maxAvailableStigmaLvl}
            availableSpaceOnRight={availableSpaceOnRight}
            availableSpaceOnBottom={availableSpaceOnBottom}
          />
        </div>
      </div>
    </div>
  );
};
