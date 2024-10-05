"use client"
import styles from "../styles/MainPage/global.module.scss"
import React, { useEffect, useRef, useState } from "react"
import Description from "@/components/Descr"
import Windows from "../images/windows.png"
import Java from "../images/Java.png"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import Chicken from "@/images/golem.gif"
import Tamuel from "@/images/tamuel.gif"
import Dog from "@/images/dog.gif"
import EnderMan from "@/images/enderman.gif"
import Torch from "@/images/Wall_Torch_BE.webp"

import Arrow from "@/images/Back.png"
import Landing from "@/images/1.png"
import image2 from "@/images/mainpage2.png"
import image3 from "@/images/mainpage3.png"
import image4 from "@/images/mainpage4.png"
import image5 from "@/images/mainpage5.png"

const download_launcher = (name: string) => {
  const link = document.createElement("a")
  link.href = `${process.env.DOMAIN_URL_IMAGES}/${name}`
  link.download = `${name}`
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    topDesc: 0,
    maxScroll: 0,
    bottomDesc: 0,
    height: 0,
  })
  const IMAGES_URL = process.env.IMAGES_URL as string
  const Height = useRef(0)
  const prevScrollPos = useRef(0)
  const { scrollY } = useScroll()
  const scroll = useTransform(
    scrollY,
    [0, 2 * windowSize.height],
    [-windowSize.width, windowSize.width],
  )
  const scrollTorch = useTransform(
    scrollY,
    [windowSize.topDesc, windowSize.bottomDesc - windowSize.height],
    [0, windowSize.bottomDesc - windowSize.topDesc - windowSize.height / 3],
  )

  useEffect(() => {
    window.scrollTo(0, -100)
    window.addEventListener("scroll", () => {
      if (prevScrollPos.current < window.scrollY) {
        window.document.getElementsByTagName("nav")[0].style.top = "-8vh"
        console.log("сдвиг")
      } else {
        window.document.getElementsByTagName("nav")[0].style.top = "10px"
      }
      prevScrollPos.current = window.scrollY
    })
    let width, height, maxScroll
    width = window.innerWidth
    height = window.innerHeight
    maxScroll = document.body.scrollHeight - window.innerHeight
    Height.current = height
    let topDesc = document.getElementById("description")
    //@ts-ignore
    setWindowSize({
      width: width,
      topDesc: topDesc?.getBoundingClientRect()?.top as number,
      maxScroll: maxScroll,
      bottomDesc: topDesc?.getBoundingClientRect()?.bottom as number,
      height: height,
    })
  }, [])

  return (
    <main className={styles.general}>
      <div className={styles.main_block}>
        <div className={styles.main_left}>
          <div className={styles.gif_wrapper}>
            <Image fill={true} src={Tamuel} alt={""} />
          </div>
        </div>
        <div className={styles.main_middle}>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ delay: 0.5 }}
            className={styles.title}
          >
            <motion.h1 transition={{ delay: 0.5 }} className={styles.logo}>
              Atomic <br /> Craft
            </motion.h1>
          </motion.div>
          <div className={styles.block_links}>
            <a
              className={styles.windows}
              target="_blank"
              onClick={() => {
                download_launcher("Atomic-Craft.exe")
              }}
              download
            >
              <div className={styles.image_wrapper}>
                <Image
                  alt={""}
                  src={Windows}
                  fill={true}
                  style={{
                    marginLeft: 5,
                    borderBottom: "6px solid transparent",
                    userSelect: "none",
                  }}
                />
              </div>
              <h1>Скачать</h1>
            </a>
            <a
              target="_blank"
              className={styles.linux}
              onClick={() => {
                download_launcher("Atomic-Craft.jar")
              }}
              download
            >
              <div className={styles.image_wrapper}>
                <Image
                  alt={""}
                  src={Java}
                  fill={true}
                  style={{
                    marginLeft: 5,
                    borderBottom: "6px solid transparent",
                    userSelect: "none",
                  }}
                />
              </div>
              <h1>Скачать</h1>
            </a>
          </div>
          <motion.div
            className={styles.arrow}
            initial={{
              rotate: "-90deg",
              opacity: 1,
            }}
            animate={{
              y: 30,
            }}
            exit={{
              y: 0,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <Image src={Arrow} alt={""} fill={true} />
          </motion.div>
        </div>
        <div className={styles.main_right}>
          <div className={styles.gif_wrapper_dog}>
            <Image
              fill={true}
              src={Dog}
              alt={""}
              style={{ marginLeft: "-20%" }}
            />
          </div>
        </div>
      </div>
      <div className={styles.chicken_wrapper}>
        <motion.div
          className={styles.chicken}
          style={{
            right: scroll,
          }}
        >
          <Image
            src={Chicken}
            alt={""}
            fill={true}
            className={styles.chicken_gif}
          />
        </motion.div>
      </div>
      <div className={styles.description_wrapper} id={"bottom"}>
        <div className={styles.main_description}>
          <div className={styles.description_sides} id={"description"}>
            <motion.div
              className={styles.torch}
              style={{
                marginLeft: "5vw",
                y: scrollTorch,
              }}
              transition={{ ease: "easeInOut" }}
            >
              <Image fill={true} src={Torch} alt={""} />
            </motion.div>
          </div>
          <div className={styles.descriptions_wrapper}>
            <Description
              title={"Увлекательные сборки"}
              description={
                "Для наших серверов мы сами тщательно подбираем и собираем сборки. Каждая сборка прошла несколько проверок на надёжность"
              }
              src={Landing}
            />
            <Description
              title={"Мощные серверы"}
              description={
                "Мы ценим производительность и поэтому наши сборки работают на высокочастотных процессорах, что позволяет держать планку производительности"
              }
              src={image5}
            />
            <Description
              title={"Ценим каноничность"}
              description={
                "Мы выросли на летстплеях самых популярных ютуберов и знаем, что такое настоящие и интересные приключения в игровой вселенной Minecraft!"
              }
              src={image3}
            />
            <Description
              title={"Большие возможности"}
              description={
                "Мы молодой проект, на карте куча свободного места, можно воплотить в жизнь все свои задумки вместе с друзьями!"
              }
              src={image4}
            />
            <Description
              title={"Ждём Вас"}
              description={
                "Рады всем новым игрокам, готовы общаться с вами на нашем Discord сервере"
              }
              src={image2}
            />
          </div>
          <div className={styles.description_sides}>
            <motion.div
              className={styles.torch}
              style={{
                marginLeft: "5vw",
                y: scrollTorch,
              }}
              transition={{ ease: "easeInOut" }}
            >
              <Image
                fill={true}
                src={Torch}
                alt={""}
                style={{
                  transform: "scaleX(-1)",
                }}
              />
            </motion.div>
          </div>
        </div>
        <div
          style={{
            border: "blue",
            borderWidth: "20px",
            width: "100%",
            height: "20vh",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          News gallery???
        </div>
        <div className={styles.footer}>
          <span>
            Сайт был написан InkyCrane. Все права защищены. Любое копирование
            сайта запрещено. 2023-2024
          </span>
        </div>
      </div>
    </main>
  )
}
