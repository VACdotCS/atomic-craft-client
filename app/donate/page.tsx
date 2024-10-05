"use client"
import React, { useState, useEffect } from "react"
import styles from "@/styles/Donate/donate.module.scss"
import ReactCardFlip from "react-card-flip"
import { observer } from "mobx-react-lite"

const Donate = () => {
  const [legendVisible, setLegendVisible] = useState<boolean>(false)
  const [deluxeVisible, setDeluxeVisible] = useState<boolean>(false)
  const [premiumVisible, setPremiumVisible] = useState<boolean>(false)
  const [GodVisible, setGodVisible] = useState<boolean>(false)
  const [serversNames, setServersNames] = useState<Array<String>>([])

  function fetch_servers_names() {}

  useEffect(() => {}, [])

  return (
    <section className={styles.main}>
      <div className={styles.cardWrapper}>
        <ReactCardFlip isFlipped={legendVisible} flipDirection={"horizontal"}>
          <div className={styles.cardFront}>
            Здесь сочная картинка о донате Легенда
            <button
              className={styles.learnMore}
              onClick={() => {
                setLegendVisible(true)
              }}
            >
              Приобрести
            </button>
          </div>

          <div
            className={styles.cardBack}
            onClick={() => {
              setLegendVisible(false)
            }}
          >
            Здесь форма для работы с бэкендом, выбором сервера для присвоения
            категории
          </div>
        </ReactCardFlip>
        <ReactCardFlip isFlipped={deluxeVisible} flipDirection={"horizontal"}>
          <div className={styles.cardFront}>
            Здесь сочная картинка о донате Deluxe
            <button
              className={styles.learnMore}
              onClick={() => {
                setDeluxeVisible(true)
              }}
            >
              Приобрести
            </button>
          </div>

          <div
            className={styles.cardBack}
            onClick={() => {
              setDeluxeVisible(false)
            }}
          >
            Здесь форма для работы с бэкендом, выбором сервера для присвоения
            категории
          </div>
        </ReactCardFlip>
        <ReactCardFlip isFlipped={premiumVisible} flipDirection={"horizontal"}>
          <div className={styles.cardFront}>
            Здесь сочная картинка о донате Premium
            <button
              className={styles.learnMore}
              onClick={() => {
                setPremiumVisible(true)
              }}
            >
              Приобрести
            </button>
          </div>

          <div
            className={styles.cardBack}
            onClick={() => {
              setPremiumVisible(false)
            }}
          >
            Здесь форма для работы с бэкендом, выбором сервера для присвоения
            категории
          </div>
        </ReactCardFlip>
        <ReactCardFlip isFlipped={GodVisible} flipDirection={"horizontal"}>
          <div className={styles.cardFront}>
            Здесь сочная картинка о донате God
            <button
              className={styles.learnMore}
              onClick={() => {
                setGodVisible(true)
              }}
            >
              Приобрести
            </button>
          </div>

          <div
            className={styles.cardBack}
            onClick={() => {
              setGodVisible(false)
            }}
          >
            Здесь форма для работы с бэкендом, выбором сервера для присвоения
            категории
          </div>
        </ReactCardFlip>
      </div>
    </section>
  )
}

export default observer(Donate)
