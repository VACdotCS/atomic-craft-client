"use client"

import React, { useEffect } from "react"
import ReactPortal from "./ReactPortal"
import { AnimatePresence, motion } from "framer-motion"
import styles from "@/styles/Modal/ServerModal.module.scss"

interface ConfirmationModalProps {
  children: React.ReactNode
  isOpen: boolean
  handleClose: () => void
}

const Modal = ({ children, isOpen, handleClose }: ConfirmationModalProps) => {
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <AnimatePresence>
          {isOpen && (
            <div className={styles.mainWrapper}>
              <motion.div
                className={styles.background}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
              <motion.div
                className={styles.container}
                initial={{
                  scaleX: 0,
                  scaleY: 0,
                  scaleZ: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleX: 1,
                  scaleY: 1,
                  scaleZ: 1,
                  opacity: 1,
                }}
                exit={{
                  scaleX: 0,
                  scaleY: 0,
                  scaleZ: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span onClick={handleClose} className={styles.close}></span>
                {children}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    </ReactPortal>
  )
}

export default Modal
