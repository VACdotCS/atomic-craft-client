import {motion, MotionStyle} from "framer-motion";
import React from "react";
import Image from "next/image";

interface ButtonProps {
  img: any;
  title: string,
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ img, isSelected, title, onClick }) => {
    const style = {
        position: "relative",
        fontFamily: "Minecraft",
        fontSize: "1.6vw",
        transition: "all 0.3s ease-in-out",
        width: "100%",
        height: "10vh",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
    } as MotionStyle;

  return (
    <motion.div
      onClick={onClick}
      style={
        title === "Настройки"
          ? {
              ...style,
              borderTopLeftRadius: "1vw",
            }
          : style
      }
    >
      {isSelected && <BgSelector title={title} />}
      <motion.span
        style={{
          position: "relative",
        }}
      >
          <section style={{
              position: 'relative',
              width: '5.5vw',
              height: '5.5vh',
          }}>
              <Image
                  src={img}
                  alt={'asd'}
                  fill={true}
              />
          </section>
      </motion.span>
    </motion.div>
  );
};

interface BgSelector {
  title: string;
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
              backgroundColor: "orange",
              zIndex: 0,
              borderTopLeftRadius: "1vw",
            }
          : {
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "orange",
              zIndex: 0,
            }
      }
    />
  );
};

export default Button;
