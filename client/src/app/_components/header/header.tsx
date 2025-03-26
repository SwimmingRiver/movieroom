import React, { useState } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import LoginModal from "../LoginModal";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(true);
    console.log({ isOpen });
  };
  return (
    <div className={styles.header_info}>
      <Link href={"/"}>logo</Link>
      <div onClick={handleModal}>user name</div>
      {isOpen && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Header;
