"use client"

import React, { useEffect } from "react"
import ReactPortal from "./ReactPortal"
import { AnimatePresence, motion } from "framer-motion"
import styles from "@/styles/Modal/Register.module.scss"
import { ToastContainer } from "react-toastify"
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
            <div
              style={{
                position: "relative",
              }}
            >
              <motion.div
                className={styles.background}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
              <motion.div
                className={styles.container}
                initial={{ y: 1000, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 1000, opacity: 0 }}
              >
                <span onClick={handleClose} className={styles.close}></span>
                <section
                  style={{
                    height: "100%",
                  }}
                >
                  {children}
                </section>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    </ReactPortal>
  )
}

export default Modal
