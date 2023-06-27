import React from 'react';
import styles from '../styles/Modal.module.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.header_modal}>
            <h1>Cadastrar produto</h1>
            <button className={styles.close_button} onClick={onClose}>
              X
            </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;