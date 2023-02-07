import React, { useEffect, useRef, useState } from "react";

import { NextPage } from "next";

import { StigmaDescriptionProps } from "@/components/Stigma/StigmaDescription/StigmaDescription.props";
import styles from "../Stigma.module.css";

export const StigmaDescription: NextPage<StigmaDescriptionProps> = ({
  stigma,
  stigmaLvl,
  isAvailable,
  availableSpaceOnRight,
  availableSpaceOnBottom,
}) => {
  const tooltipEl = useRef<HTMLDivElement>(null);

  const [tooltiptextOffsetWidth, setTooltiptextOffsetWidth] =
    useState<number>(0);
  const [tooltiptextOffsetHeight, setTooltiptextOffsetHeight] =
    useState<number>(0);

  useEffect(() => {
    if (tooltipEl.current) {
      setTooltiptextOffsetWidth(tooltipEl.current.offsetWidth);
      setTooltiptextOffsetHeight(tooltipEl.current.offsetHeight);
    }
  }, []);

  const getTooltipDirectionStyle = () => {
    if (availableSpaceOnBottom >= tooltiptextOffsetHeight) {
      return availableSpaceOnRight >= tooltiptextOffsetWidth
        ? { left: "110%", top: "-5px" }
        : { right: "100%", top: "-5px" };
    }

    return {
      bottom: "100%",
      left: "50%",
      marginLeft: `${(tooltiptextOffsetWidth / 2) * -1}px`,
    };
  };

  const getTooltipArrowDirectionStyle = () => {
    if (availableSpaceOnBottom >= tooltiptextOffsetHeight) {
      return availableSpaceOnRight >= tooltiptextOffsetWidth
        ? {
            right: "100%",
            borderColor: "transparent black transparent transparent",
            top: "25px",
            marginTop: "-5px",
          }
        : {
            left: "100%",
            borderColor: "transparent transparent transparent black",
            top: "25px",
            marginTop: "-5px",
          };
    }

    return {
      top: "100%",
      left: "50%",
      marginLeft: "-5px",
      borderColor: "black transparent transparent transparent",
    };
  };

  return (
    <div
      ref={tooltipEl}
      style={getTooltipDirectionStyle()}
      className={styles.tooltiptext}
    >
      <span
        style={getTooltipArrowDirectionStyle()}
        className={styles.tooltiptextArrow}
      ></span>
      <div className={styles.desc}>
        <p className={styles.name}>
          {stigma.stigma[stigmaLvl].name}
          {isAvailable && (
            <span className={styles.blockedText}>
              lvl {Math.min(...stigma.stigma.lvls)}
            </span>
          )}
        </p>
        <div className={styles.divider}></div>
        <p>
          <span className={styles.label}>Skill Type: </span>
          {stigma.stigma["Skill type"]}
        </p>
        <p>
          <span className={styles.label}>Target: </span>
          {stigma.stigma.Target}
        </p>
        <div className={styles.divider}></div>
        <p>{stigma.stigma[stigmaLvl].Description}</p>
        <div className={styles.divider}></div>
        {stigma.stigma[stigmaLvl]["Usage Cost"] && (
          <p>
            <span className={styles.label}>Usage const: </span>
            {stigma.stigma[stigmaLvl]["Usage Cost"]}
          </p>
        )}
        {stigma.stigma[stigmaLvl]["Cast time"] && (
          <p>
            <span className={styles.label}>Cast time: </span>
            {stigma.stigma[stigmaLvl]["Cast time"]}
          </p>
        )}
        {stigma.stigma[stigmaLvl].Cooldown && (
          <p>
            <span className={styles.label}>Cooldown: </span>
            {stigma.stigma[stigmaLvl].Cooldown} s
          </p>
        )}

        <div className={styles.divider}></div>
        {stigma.stigma["Additional info"] &&
          stigma.stigma["Additional info"].map((info, index) => (
            <p key={index}>{info}</p>
          ))}
      </div>
    </div>
  );
};
