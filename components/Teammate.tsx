import React from "react"
import Image from "next/image"
import styles from "@/styles/About/teammate.module.scss"

interface props {
  love: string
  position: string
  nickname: string
}

const TeamMate: React.FC<props> = ({ nickname, position, love }) => {
  return (
    <section className={styles.wrapper}>
      <span className={styles.nickname}>{nickname}</span>
      <div className={styles.skinWrapper}>
        <Image
          src={`${process.env.IMAGES_URL}/team_skins/${nickname}.png`}
          alt={""}
          fill={true}
          className={styles.image}
        />
      </div>
      <span className={styles.position}>{position}</span>
      <p className={styles.love}>{love}</p>
    </section>
  )
}

export default TeamMate
