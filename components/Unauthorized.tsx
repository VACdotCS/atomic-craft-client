"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import UnAuth from "@/images/lock.png";
import styles from "@/styles/MainPage/UnAuth.module.scss";

const Unauthorized: React.FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.imageWrapper}>
        <Image src={UnAuth} alt={""} fill={true} />
      </div>

      <h1>Авторизуйтесь, чтобы увидеть контент страницы.</h1>
    </section>
  );
};

export default Unauthorized;
