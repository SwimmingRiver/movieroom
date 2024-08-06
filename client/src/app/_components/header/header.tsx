import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <div className={styles.header_info}>
      <Link href={"/"}>logo</Link>
      <div>user name</div>
    </div>
  );
};

export default Header;
