"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/MainPage/Descr.module.scss";
import Image, { StaticImageData } from "next/image";
import Landing from "../images/1.png";

interface DescriptionProps {
  title: string;
  description: string;
  src: StaticImageData;
}

const block_animation_left = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const block_animation_right = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

const Description: React.FC<DescriptionProps> = ({
  title = "Atomic Craft",
  description = "Описание",
  src = Landing,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={block_animation_right}
      transition={{ delay: 0.2 }}
      className={styles.mainPage}
      viewport={{ once: true }}
    >
      <div className={styles.image_wrapper}>
        <Image src={src} fill={true} alt={""} className={styles.image} />
      </div>
      <div className={styles.right}>
        <h1 className={styles.logo}>{title}</h1>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Description;
