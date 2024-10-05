"use client"
import React from "react"
import styles from "../styles/Donate/ComingSoon.module.scss"
import Image from "next/image"
import Waiter from "@/images/Waiting.gif"
const PlugComingSoon = () => {
  return (
    <div className={styles.main}>
      <h1>
        В разработке <br /> ...
      </h1>
      <div className={styles.imageWrapper}>
        <Image src={Waiter} alt={""} fill={true} />
      </div>
    </div>
  )
}

export default PlugComingSoon
