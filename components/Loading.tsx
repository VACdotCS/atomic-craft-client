"use client"
import { AnimatePresence, motion } from "framer-motion"
import styles from "@/styles/Nav/Links.module.scss"
import React, { useState } from "react"

type Props = {
  isVisible: boolean
}

const Loading: React.FC<Props> = ({ isVisible }) => {
  const [completed, setCompleted] = useState<boolean>(false)
  const changeVisible = () => {
    setCompleted(true)
  }
  return (
    <AnimatePresence initial={true}>
      {isVisible && (
        <motion.div
          className={styles.loading}
          initial={{ opacity: 1, display: "block" }}
          animate={{
            opacity: 0,
            display: completed ? "none" : "block",
          }}
          exit={{ display: "none" }}
          onAnimationComplete={() => {
            changeVisible()
          }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.loader}></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading
