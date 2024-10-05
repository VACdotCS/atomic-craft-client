"use client"
import React, { useState, useContext } from "react"
import Image from "next/image"
import styles from "@/styles/Nav/UserProfileDropDown.module.scss"
import { Context } from "@/components/GlobalContextProvider"
import { AnimatePresence, motion } from "framer-motion"
import ShowPng from "@/images/show.png"
import Coin from "@/images/Atom-Coin.png"

const UserProfileSelector: React.FC = () => {
  const { store } = useContext(Context)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  const LogoutAndRefresh = () => {
    store.setLoading(true)
    store.logout().then((_) => {
      location.replace("/")
    })
  }

  return (
    <section className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            fill={true}
            src={
              store.user.skinPath !== "default"
                ? `${process.env.IMAGES_URL}/user_skins/${store.user.nick}_head.png`
                : `${process.env.IMAGES_URL}/user_skins/default_head.png`
            }
            alt={""}
            className={styles.image}
          />
        </div>
        <div className={styles.stats}>
          <h1 className={styles.nickname}>{store.user.nick}</h1>
        </div>
        <motion.button
          className={styles.button}
          onClick={handleClick}
          animate={
            isVisible
              ? {
                  rotate: 180,
                  marginTop: "1vh",
                }
              : {}
          }
          transition={{ duration: 0.25 }}
        >
          <Image src={ShowPng} alt={""} />
        </motion.button>
      </div>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{
              height: 0,
              opacity: 1,
              borderBottomRightRadius: "3vh",
            }}
            animate={{ height: "22.5vh", opacity: 1 }}
            exit={{ height: 0 }}
            className={styles.dropdown}
          >
            <div className={styles.userStats}>
              <div className={styles.balance}>
                <div className={styles.coinWrapper}>
                  <Image
                    src={Coin}
                    alt="AtomCoin"
                    fill={true}
                    title={"Atom Coin"}
                  />
                </div>
                <span className={styles.balanceSpan}>
                  {" "}
                  {store.user.balance} AC
                </span>
              </div>
            </div>
            <div className={styles.menu}>
              <a href="/profile">Профиль</a>
              <a href="/deposit">Пополнение</a>
              <a href="#" onClick={LogoutAndRefresh}>
                Выйти
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default UserProfileSelector
