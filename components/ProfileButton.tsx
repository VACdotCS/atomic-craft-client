import { motion } from "framer-motion"
import React from "react"

interface ButtonProps {
  title: string
  isSelected: boolean
  onClick: React.MouseEventHandler
}

const Button: React.FC<ButtonProps> = ({ title, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      style={
        title === "Настройки"
          ? {
              position: "relative",
              fontFamily: "Minecraft",
              fontSize: "1.8vw",
              transition: "all 0.3s ease-in-out",
              width: "100%",
              height: "10vh",
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              borderTopLeftRadius: "1vw",
            }
          : {
              position: "relative",
              fontFamily: "Minecraft",
              fontSize: "1.8vw",
              transition: "all 0.3s ease-in-out",
              width: "100%",
              height: "10vh",
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
            }
      }
    >
      {isSelected && <BgSelector title={title} />}
      <motion.span
        style={{
          position: "relative",
        }}
      >
        {title}
      </motion.span>
    </motion.div>
  )
}

interface BgSelector {
  title: string
}

const BgSelector: React.FC<BgSelector> = ({ title }) => {
  return (
    <motion.div
      layoutId="activeMenuItem"
      style={
        title === "Настройки"
          ? {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "lightgrey",
              zIndex: 0,
              borderTopLeftRadius: "1vw",
            }
          : {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "lightgrey",
              zIndex: 0,
            }
      }
    />
  )
}

export default Button
