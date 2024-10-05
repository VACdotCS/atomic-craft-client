"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/MainPage/slogans.module.scss";

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Slogan = (props: { title?: string }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="overflow-hidden">
        <motion.h1 variants={textAnimation} className={styles.general}>
          {props.title}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default Slogan;
