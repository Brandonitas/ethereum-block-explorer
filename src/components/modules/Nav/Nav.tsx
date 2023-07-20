import React from "react";
import styles from "./Nav.module.scss";
import Link from "next/link";
import Image from "next/image";

const Nav: React.FC = (): JSX.Element => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.leftSection}>
        <Link href={"/home"}>
          <Image
            alt="logo"
            blurDataURL={"/assets/ebe-logo.png"}
            className={styles.logo}
            height={51}
            placeholder={"blur"}
            src="/assets/ebe-logo.png"
            width={140}
          />
        </Link>
      </div>
      <div className={styles.rightSection}></div>
    </nav>
  );
};

export default Nav;
