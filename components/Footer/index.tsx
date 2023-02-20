import { Roboto } from "@next/font/google";

import cn from "classnames";

import styles from "./Footer.module.css";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export const Footer = () => {
  return (
    <footer className={cn(font.className, styles.footer)}>
      <section className={styles.container}>
        <p className={styles.logoText}>
          <span>Ai</span>
          <img src={"images/aion.svg"} className={styles.logo} alt="o" />
          <span>n </span>
          <span> classic 2.4</span>
        </p>
        <span className={styles.secondaryText}>stigma calculator</span>
      </section>
    </footer>
  );
};
