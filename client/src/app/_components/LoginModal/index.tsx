import React from "react";
import ReactModal from "react-modal";
import styles from "./style.module.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-%",
    transform: "translate(-50%, -50%)",
  },
};
const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ReactModal
      portalClassName={styles.Modal}
      isOpen={isOpen}
      onAfterOpen={() => {
        null;
      }}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      contentLabel="Login"
      style={customStyles}
    >
      <div>
        <h3>LoginModal</h3>
        <form className={styles.Form__Container}>
          <input placeholder="id" />
          <input placeholder="pw" />
          <button>login</button>
        </form>
      </div>
    </ReactModal>
  );
};

export default LoginModal;
