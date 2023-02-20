import { NextPage } from "next";
import Image from "next/image";

import cn from "classnames";

import { FactionPickerProps } from "@/components/FactionPicker/FactionPicker.props";
import styles from "./Faction.module.css";

export const FactionPicker: NextPage<FactionPickerProps> = ({
  faction,
  setFaction,
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={"images/elyos.png"}
        alt={"elyos"}
        height={30}
        width={30}
        className={cn(styles.faction, {
          [styles.selectedFaction]: faction == "elyos",
        })}
        onClick={() => setFaction("elyos")}
      />
      <Image
        src={"images/asmodian.png"}
        alt={"asmodian"}
        height={30}
        width={30}
        className={cn(styles.faction, {
          [styles.selectedFaction]: faction == "asmodian",
        })}
        onClick={() => setFaction("asmodian")}
      />
    </div>
  );
};
