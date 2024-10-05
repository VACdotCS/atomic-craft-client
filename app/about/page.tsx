import React from "react";
import styles from "@/styles/About/about.module.scss";
import Teammate from "@/components/Teammate";
import VK from "@/images/vk.png";
import DS from "@/images/discord.png";
import TG from "@/images/TG.png";
import Image from "next/image";
import Link from "next/link";

const team = [
  {
    Ник: "MRTntrey",
    Должность: "SEO и главный инвестор",
    Любит: "Человек, неравнодушный к майнкрафту",
  },
  {
    Ник: "InkyCrane",
    Должность: "Главный программист",
    Любит: "Любит котиков и иногда кодит, обожает созидать",
  },
  {
    Ник: "ypal",
    Должность: "Сборщик",
    Любит: "Работает с кучей компов в одном учреждении",
  },
  {
    Ник: "VivaXiz",
    Должность: "Главный строитель",
    Любит: "Очень любит всех мам, скайблок и ещё AE2",
  },
  {
    Ник: "Enlax",
    Должность: "Помощник строителя",
    Любит: "Люблю музыку, кушать, спать, мод Mekanism и немного спорт",
  },
];

const About = () => {
  return (
    <section className={styles.main}>
      <div className={styles.team_wrapper}>
        <h1>Команда проекта</h1>
        <div className={styles.team}>
          {team.map((el) => (
            <Teammate
              key={el.Ник}
              love={el.Любит}
              position={el.Должность}
              nickname={el.Ник}
            />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.about}>
          <h1>О нас</h1>
          <div className={styles.text} style={{ textAlign: "justify" }}>
            Мы молодой проект серверов в игровой вселенной Minecraft. Нашей
            целью является создание самого лучшего проекта серверов на просторах
            СНГ. Чем больше людей будет работать над этим проектом, тем быстрее
            каждый из нас сможет реализовать свои задумки и сможет позволить
            игрокам со всей России и даже мира узреть их. Если ты заряженный
            парень/девушка и хочешь создать нечто великое, то мы готовы принять
            тебя в наши ряды.
          </div>
          <h2>Ждём тебя в команде!</h2>
        </div>
        <div className={styles.social}>
          <h1>Социальные сети</h1>
          <div className={styles.links}>
            <Link
              href="https://vk.com/club223709583"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.images}>
                <Image
                  src={VK}
                  alt={""}
                  fill={true}
                  quality={100}
                  title={"Новости, объявления, розыгрыши"}
                />
              </div>
            </Link>
            <Link
              href="https://discord.gg/KXQd8WYTmH"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.images}>
                <Image
                  src={DS}
                  quality={100}
                  alt={""}
                  fill={true}
                  title={"Форум, общение"}
                />
              </div>
            </Link>
            <Link
              href="https://t.me/atomic_craft"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.images}>
                <Image
                  src={TG}
                  alt={""}
                  quality={100}
                  fill={true}
                  title={"Новости, объявления, розыгрыши"}
                />
              </div>
            </Link>
            <Link
              href="https://topcraft.club/servers/12185/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.topcraft}>
                <Image
                  src="https://topcraft.club/media/projects/12185/tops.png"
                  alt={"Награда 100 AC"}
                  fill={true}
                  fetchPriority={"high"}
                  quality={100}
                  title={"Награда 100 AC"}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
