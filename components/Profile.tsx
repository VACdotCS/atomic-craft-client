"use client"
import React, { useState } from "react"
import styles from "@/styles/profile.module.scss"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"
import { observer } from "mobx-react-lite"
import Settings from "@/components/Settings"
import Button from "@/components/ProfileButton"
import PlugComingSoon from "@/components/PlugComingSoon"

interface ProfileProps {
  skinPath: string
  nick: string
  registrationDate: string
  isActivated: boolean
  email: string
}

const Profile: React.FC<ProfileProps> = ({
  skinPath,
  nick,
  registrationDate,
  isActivated,
  email,
}) => {
  const [choosedItem, setChoosedItem] = useState<string>("settings")
  const settings = () => setChoosedItem("settings")
  const achievements = () => setChoosedItem("achievements")
  const privileges = () => setChoosedItem("privileges")

  return (
    <LayoutGroup>
      <motion.section className={styles.profile}>
        <motion.div layout className={styles.menu}>
          <Button
            onClick={settings}
            title={"Настройки"}
            isSelected={choosedItem === "settings"}
          />
          <Button
            onClick={achievements}
            title={"Переводы"}
            isSelected={choosedItem === "achievements"}
          />
          <Button
            onClick={privileges}
            title={"Привилегии"}
            isSelected={choosedItem === "privileges"}
          />
        </motion.div>
        <motion.div className={styles.contentWrapper}>
          <AnimatePresence>
            {choosedItem === "settings" && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className={styles.content}
              >
                <Settings
                  nick={nick}
                  email={email}
                  isActivated={isActivated}
                  registrationDate={registrationDate}
                  skinPath={skinPath}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {choosedItem === "achievements" && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                style={{
                  fontFamily: "Minecraft",
                }}
                transition={{
                  duration: 0.7,
                }}
                className={styles.content}
              >
                <PlugComingSoon />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {choosedItem === "privileges" && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className={styles.content}
              >
                <PlugComingSoon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </LayoutGroup>
  )
}

export default observer(Profile)
