import { NextPage } from "next";

import { StigmaCostPanelProps } from "@/components/StigmaCostPanel/StigmaCostPanel.props";
import styles from "./StigmaCostPanel.module.css";
import Image from "next/image";

export const StigmaCostPanel: NextPage<StigmaCostPanelProps> = ({
  stigmaShardCost,
  stigmaAPCost,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.costItem}>
        <Image
          src={"images/stigma-shards.png"}
          alt={"stigma-shards"}
          width={16}
          height={16}
        />
        <span className={styles.text}>{stigmaShardCost.toLocaleString()}</span>
      </div>

      <div className={styles.costItem}>
        <Image
          src={"images/ap.png"}
          alt={"stigma-shards"}
          width={16}
          height={16}
        />
        <span className={styles.text}>{stigmaAPCost.toLocaleString()}</span>
      </div>
    </div>
  );
};
