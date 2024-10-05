"use client";
import React from "react";
import styles from "@/styles/FAQ/main.module.scss";

const Rules = () => {
  return (
    <section className={styles.mainWrapper}>
      <div className={styles.question}>
        <span>Вопрос: </span>
        1. У меня не запускается лаунчер? Что делать?
        <div className={styles.answer}>
          <p>
            <span>Ответ: </span>
            установите последнюю версию{" "}
            <a href={"https://www.java.com/ru/download/"} target="_blank">
              Java
            </a>{" "}
            с официального сайта.
          </p>
        </div>
      </div>
      <div className={styles.question}>
        <span>Вопрос: </span>
        2. Как работает система приватов на серверах?
        <div className={styles.answer}>
          <p>
            <span>Ответ: </span>
            На наших серверах действует особенная система приватов - приват
            блоками. Это система установлена на:
            <ul>
              <li>Hi-Tech Classic 1.12.2</li>
              <li>Hi-Tech New Era 1.16.5</li>
            </ul>
            Для привата Вам необходимо разместить один из типов блоков:
            <table>
              <thead>
                <th>Блок</th>
                <th>Размер привата</th>
              </thead>
              <tr>
                <td>Угольный</td>
                <td>5х5</td>
              </tr>
              <tr>
                <td>Железный</td>
                <td>10х10</td>
              </tr>
              <tr>
                <td>Золотой</td>
                <td>20х20</td>
              </tr>
              <tr>
                <td>Алмазный</td>
                <td>30х30</td>
              </tr>
              <tr>
                <td>Изумрудный</td>
                <td>40х40</td>
              </tr>
              <tr>
                <td>Незеритовый (*)</td>
                <td>50х50</td>
              </tr>
            </table>
            Все приваты защищают территорию от 0 до 255 высоты.
          </p>
          <p>
            Команды для управления приватами:
            <table>
              <thead>
                <th>Команда</th>
                <th>Действие</th>
              </thead>
              <tr>
                <td>/ps info</td>
                <td>просмотр дополнительных сведений об области</td>
              </tr>
              <tr>
                <td>/ps add|remove (ник)</td>
                <td>добавление или удаление игрока из привата</td>
              </tr>
              <tr>
                <td>/ps addowner|removeowner (ник)</td>
                <td>добавление или удаление владельца привата</td>
              </tr>
              <tr>
                <td>/ps flag (флаг)</td>
                <td>установка флага в регионе</td>
              </tr>
              <tr>
                <td>/ps toggle</td>
                <td>
                  включение или выключение блоков привата, чтобы просто ставить
                  один из блоков
                </td>
              </tr>
              <tr>
                <td>/ps view</td>
                <td>просмотр границ защищенного региона</td>
              </tr>
              <tr>
                <td>/ps list|remove</td>
                <td>показ информации или удаление региона</td>
              </tr>
            </table>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rules;
