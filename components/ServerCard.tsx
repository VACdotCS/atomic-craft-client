"use client"
import React from "react"
import { motion } from "framer-motion"
import styles from "@/styles/Habs/Page.module.scss"
import Image from "next/image"

interface CardProps {
  id: string
  version: string
  title: string
  isOnline: boolean
  onClick: () => void
}

const ServerCard: React.FC<CardProps> = ({
  id,
  version,
  title,
  isOnline,
  onClick,
}) => {
  const imagePath = title.split(" ").join("_")
  return (
    <motion.li
      layoutId={id}
      className={styles.serverInfo}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      whileHover={{
        scale: 1.02,
      }}
      onClick={onClick}
    >
      <motion.span
        className={styles.isOnline}
        style={
          isOnline
            ? {
                backgroundColor: "chartreuse",
              }
            : {
                backgroundColor: "red",
              }
        }
        initial={{
          opacity: 0.5,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0.5,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        }}
      ></motion.span>
      <motion.div className={styles.imageWrapper_card}>
        <motion.div className={styles.image}>
          <Image
            src={`${process.env.IMAGES_URL}/${imagePath}.jpg`}
            alt={""}
            fill={true}
            className={styles.imageShadow_card}
            style={{
              backgroundSize: "cover",
            }}
          />
        </motion.div>
        <motion.div className={styles.ImageText_card}>
          <motion.div className={styles.image_text_wrapper_card}>
            <span className={styles.ImageText_version_card}>{version}</span>
            <br></br>
            <span className={styles.ImageText_title_card}>{title}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.li>
  )
}

export default ServerCard
