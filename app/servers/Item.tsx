import React from "react"
import { motion } from "framer-motion"
import styles from "@/styles/Habs/Page.module.scss"
import Image from "next/image"

const IMAGES_URL = process.env.DOMAIN_URL_IMAGES

interface serverInfo {
  id: string
  title: string
  version: string
  isOnline: boolean
  online: number
  description: string
  mods: Array<string>
}

interface ItemProps {
  id: string
  data: Array<serverInfo>
}

const chooseGear = (n: number | undefined) => {
  const index = 100 / 85
  // @ts-ignore
  return Math.round(n / index)
}

export const Item: React.FC<ItemProps> = ({ id, data }) => {
  const item = data.find((value) => value.id == id)
  const imageId = chooseGear(item?.online)
  const imagePath = item?.title.split(" ").join("_")

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.serverInfoOpen}
        layoutId={id}
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.Card_content}
          layoutId={`card-content-${id}`}
        >
          <motion.div className={styles.upper}>
            <motion.div className={styles.imageWrapper}>
              <Image
                src={`${process.env.IMAGES_URL}/${imagePath}.jpg`}
                alt={""}
                fill={true}
                className={styles.imageShadow}
                style={{
                  backgroundSize: "cover",
                }}
              />
              <motion.span
                layoutId={`gear_${id}`}
                className={styles.gear_wrapper}
              >
                <Image
                  src={`${IMAGES_URL}/gear/${imageId}.svg`}
                  alt={""}
                  fill={true}
                  style={
                    item?.online === -1
                      ? {
                          display: "none",
                        }
                      : {
                          display: "block",
                        }
                  }
                />
                {
                  <h1 className={styles.onlineNum}>
                    {item?.online === -1 ? "Оффлайн" : item?.online}
                  </h1>
                }
              </motion.span>
            </motion.div>
            <motion.section className={styles.upper_info}>
              <span className={styles.ImageText_version}>{item?.version}</span>
              <br></br>
              <span className={styles.ImageText_title}>{item?.title}</span>
            </motion.section>
          </motion.div>

          <motion.section className={styles.serverContent}>
            <motion.section className={styles.s_description}>
              <h1 className={styles.left}>Описание</h1>
              <div className={styles.description_wrapper}>
                <p className={styles.text}>{item?.description}</p>
              </div>
            </motion.section>
            <section className={styles.right}>
              <h1>Моды</h1>
              <motion.section className={styles.mods}>
                {item?.mods.map((elem) => (
                  <motion.section key={item?.id} className={styles.mods_item}>
                    {elem}
                  </motion.section>
                ))}
              </motion.section>
            </section>
          </motion.section>
        </motion.section>
      </motion.section>
    </>
  )
}
