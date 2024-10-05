"use client"
import styles from "../styles/Nav/Links.module.scss"
import React, { useContext, useEffect, useState } from "react"
import Modal from "./Modal"
import Login from "./Login"
import Registration from "./Registration"
import { observer } from "mobx-react-lite"
import { Context } from "@/components/GlobalContextProvider"
import UserProfileSelector from "@/components/UserProfileSelector"
import Loading from "@/components/Loading"
import Kitty from "@/images/kitty.jpg"
import Ship from "@/images/ship.gif"
import Image from "next/image"
//import Snowfall from "react-snowfall";

interface NavLinks extends Record<string, boolean> {
  rules: boolean
  servers: boolean
  donate: boolean
  about: boolean
  faq: boolean
}

const Nav = () => {
  const { store } = useContext(Context)
  const [underscoreNavLink, setUnderscoreNavLink] = useState<NavLinks>({
    rules: false,
    servers: false,
    donate: false,
    about: false,
    faq: false,
  })
  const [RegistrationModalFlag, setRegistrationModalFlag] =
    useState<boolean>(false)
  const [LoginModalFlag, setLoginModalFlag] = useState<boolean>(false)

  const [RegistrationModalFlagAnim, setRegistrationModalFlagAnim] =
    useState<boolean>(false)
  const [LoginModalFlagAnim, setLoginModalFlagAnim] = useState<boolean>(false)

  const [Load, setLoading] = useState<boolean>(true)

  const checkDestination = () => {
    const page = window.location.href
    const path = page.split("/").pop() as string
    underscoreNavLink[path] = true
    for (const key of Object.keys(underscoreNavLink)) {
      if (key !== path) {
        underscoreNavLink[key] = false
      }
    }
    setUnderscoreNavLink(underscoreNavLink)
  }

  useEffect(() => {
    checkDestination()
    if (localStorage.getItem("token")) {
      store.checkAuth().then(() => {
        setTimeout(() => setLoading(false), 600)
      })
    }
  }, [store])

  {
    /*
        Loading && (
          <div className={styles.loading}>
              <h1>Загрузка...</h1>
          </div>
        )
    */
  }

  if (!store.isAuth) {
    return (
      <div id={"nav"}>
        {Load && <Loading isVisible={true} />}
        <div className={styles.telephone}>
          <h1>
            Программисту было лень писать стили для телефона.
            <br />
          </h1>
          <Image src={Kitty} alt={""} width={300} height={200} />
          <h1>Лучше зайдите с компьютера :)</h1>
          <h1>С уважением, команда проекта Atomic Craft.</h1>
          <Image
            src={Ship}
            alt={""}
            width={300}
            height={300}
            style={{
              position: "absolute",
              bottom: "0",
            }}
          />
        </div>
        <nav className={styles.navbar} id="navbar">
          {/*<Snowfall
                      color={'white'}
                      style={{
                          height: '100vh',
                          marginTop: '8vh',
                      }}
                  />*/}
          <div className={styles.container}>
            <section>
              <a href="/">Atomic Craft</a>
            </section>
            <div className={styles.navbar_wrap}>
              <ul className={styles.navbar_menu}>
                <li>
                  <a
                    href="/rules"
                    style={
                      underscoreNavLink.rules
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Правила
                  </a>
                </li>

                <li>
                  <a
                    href="/servers"
                    style={
                      underscoreNavLink.servers
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Список хабов
                  </a>
                </li>

                <li>
                  <a
                    href="/donate"
                    style={
                      underscoreNavLink.donate
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Донат
                  </a>
                </li>

                <li>
                  <a
                    href="/faq"
                    style={
                      underscoreNavLink.faq
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    F.A.Q.
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    style={
                      underscoreNavLink.about
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    О нас
                  </a>
                </li>

                {/*

                                  <Link
                                    href="/blockchain"
                                    className={styles.header_link}
                                    >
                                      <p className={styles.current}>Блокчейн</p>
                                  </Link>
                              */}
              </ul>
            </div>
            <div className={styles.btns}>
              <button className={styles._btn}>
                <h1
                  onClick={() => {
                    setRegistrationModalFlag(!RegistrationModalFlag)
                    setRegistrationModalFlagAnim(true)
                  }}
                >
                  Регистрация
                </h1>
              </button>

              <button className={styles._btn}>
                <h1
                  onClick={() => {
                    setLoginModalFlag(!LoginModalFlag)
                    setLoginModalFlagAnim(true)
                  }}
                >
                  Войти
                </h1>
              </button>
            </div>
          </div>

          {RegistrationModalFlag && (
            <Modal
              isOpen={RegistrationModalFlagAnim}
              handleClose={() => {
                setRegistrationModalFlagAnim(!RegistrationModalFlagAnim)
                setTimeout(
                  () => setRegistrationModalFlag(!RegistrationModalFlag),
                  200,
                )
              }}
            >
              <Registration />
            </Modal>
          )}

          {LoginModalFlag && (
            <Modal
              isOpen={LoginModalFlagAnim}
              handleClose={() => {
                setLoginModalFlagAnim(!LoginModalFlagAnim)
                setTimeout(() => setLoginModalFlag(!LoginModalFlag), 200)
              }}
            >
              <Login />
            </Modal>
          )}
        </nav>
      </div>
    )
  } else {
    return (
      <div>
        {Load && <Loading isVisible={true} />}
        <nav className={styles.navbar}>
          {/*<Snowfall
                      color={'white'}
                      style={{
                          height: '100vh',
                          marginTop: '8vh',
                      }}
                  />*/}
          <div className={styles.container}>
            <section>
              <a href="/">Atomic Craft</a>
            </section>
            <div className={styles.navbar_wrap}>
              <ul className={styles.navbar_menu}>
                <li>
                  <a
                    href="/rules"
                    style={
                      underscoreNavLink.rules
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Правила
                  </a>
                </li>

                <li>
                  <a
                    href="/servers"
                    style={
                      underscoreNavLink.servers
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Список хабов
                  </a>
                </li>

                <li>
                  <a
                    href="/donate"
                    style={
                      underscoreNavLink.donate
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    Донат
                  </a>
                </li>

                <li>
                  <a
                    href="/faq"
                    style={
                      underscoreNavLink.faq
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    F.A.Q.
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    style={
                      underscoreNavLink.about
                        ? {
                            borderBottom: "solid",
                            borderBottomColor: "green",
                          }
                        : {}
                    }
                  >
                    О нас
                  </a>
                </li>

                {/*

                              <Link
                                href="/blockchain"
                                className={styles.header_link}
                                >
                                  <p className={styles.current}>Блокчейн</p>
                              </Link>

                              */}
              </ul>
            </div>
            <UserProfileSelector />
          </div>
        </nav>
      </div>
    )
  }
}
export default observer(Nav)
