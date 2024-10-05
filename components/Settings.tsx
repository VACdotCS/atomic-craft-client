import React, { useContext, useLayoutEffect, useState } from "react"
import ReactSkinview3d from "react-skinview3d"
import styles from "@/styles/Profile/Settings.module.scss"
import { Context } from "@/components/GlobalContextProvider"
import { useRouter } from "next/navigation"
import { WalkingAnimation } from "skinview3d"
import { toast } from "react-toastify"
import { observer } from "mobx-react-lite"
import Modal from "@/components/Modal"
import { PasswordChangeForm } from "@/components/PasswordChangeForm"

interface SettingsProps {
  skinPath: string
  nick: string
  registrationDate: string
  isActivated: boolean
  email: string
}

const Settings: React.FC<SettingsProps> = ({
  skinPath,
  nick,
  registrationDate,
  isActivated,
  email,
}) => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const [changePasswordModalFlag, setChangePasswordModalFlag] =
    useState<boolean>(false)
  const [ModalAnim, setModalAnim] = useState<boolean>(false)
  const [haveCape, setHaveCape] = useState<boolean>(false)
  const [screenHeight, setScreenHeight] = useState<number>(0)
  const [screenWidth, setScreenWidth] = useState<number>(0)
  const { store } = useContext(Context)

  useLayoutEffect(() => {
    fetch(`${process.env.DOMAIN_URL_IMAGES}/user_skins/${nick}_cape.png`).then(
      (el) => {
        if (el?.ok) {
          setHaveCape(true)
        }
      },
    )
    setScreenHeight(window.innerHeight)
    setScreenWidth(window.innerWidth)
    setIsDataLoaded(true)
  }, [])

  if (!isDataLoaded) {
    return (
      <div
        style={{
          position: "absolute",
        }}
      >
        Загрузка
      </div>
    )
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.skin}>
        <div className={styles.skinWrapper}>
          <ReactSkinview3d
            skinUrl={
              skinPath !== "default"
                ? `${process.env.DOMAIN_URL_IMAGES}/user_skins/${nick}.png`
                : `${process.env.DOMAIN_URL_IMAGES}/user_skins/default.png`
            }
            capeUrl={
              haveCape
                ? `${process.env.DOMAIN_URL_IMAGES}/user_skins/${nick}_cape.png`
                : ""
            }
            height={(500 * screenHeight) / 1080}
            width={(300 * screenWidth) / 1920}
            options={{
              background: "#ECECEC",
            }}
            onReady={({ viewer }) => {
              viewer.animation = new WalkingAnimation()
              viewer.animation.speed = 0.4
              // Enabled auto rotate
              viewer.autoRotate = false
              viewer.camera.fov = 55
            }}
          />
        </div>
        <label className={styles.upload_button}>
          <input
            type="file"
            accept="image/*.png"
            onChange={async (event) => {
              const files = event.target.files
              if (!files?.item(0)?.type.includes("png")) {
                toast("Можно загрузить картинку только в формате .png")
              } else {
                const data = new FormData()
                // @ts-ignore
                data.append("file", files.item(0), `${nick}.png`)
                data.append("nick", nick)
                await store.uploadSkin(data).then((msg) => {
                  if (msg?.status === 200) {
                    toast(
                      "Скин успешно загружен и будет отображён на странице после перезагрузки",
                    )
                  } else {
                    toast(msg + " Загрузите другой файл ещё раз.")
                  }
                })
              }
            }}
          />
          Обновить скин
        </label>
        <label className={styles.upload_button_cape}>
          <input
            type="file"
            accept="image/*.png"
            onChange={async (event) => {
              const files = event.target.files
              if (!files?.item(0)?.type.includes("png")) {
                toast("Можно загрузить картинку только в формате .png")
              } else {
                const data = new FormData()
                // @ts-ignore
                data.append("file", files.item(0), `${nick}_cape.png`)
                data.append("nick", nick)
                await store.uploadCape(data).then((msg) => {
                  if (msg !== "OK") {
                    toast(msg + " Загрузите другой файл ещё раз.")
                  } else {
                    toast(
                      "Плащ успешно загружен и будет отображён на странице после перезагрузки",
                    )
                  }
                })
              }
            }}
          />
          Обновить плащ
        </label>
      </div>
      <div className={styles.stripe}></div>
      <div className={styles.userInfo}>
        <table>
          <tbody className={styles.table}>
            <tr>
              <td>
                <h1>Ник: </h1>
              </td>
              <td>
                <span className={styles.nick}>{nick}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Почтовый адрес:</h1>
              </td>
              <td>
                <span>{email}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Активирован:</h1>
              </td>
              <td>
                <span
                  style={{
                    color: isActivated ? "green" : "red",
                  }}
                >
                  {isActivated ? "Активирован" : "Не активирован"}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Пароль:</h1>
              </td>
              <td>
                <button
                  className={styles.passwd}
                  onClick={() => {
                    setChangePasswordModalFlag(true)
                    setModalAnim(true)
                  }}
                >
                  Изменить
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <h1>Дата регистрации:</h1>
              </td>
              <td>
                <span>
                  {registrationDate
                    ?.split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-") + " "}
                  {registrationDate?.split("T")[1].split(".")[0]}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {changePasswordModalFlag && (
        <Modal
          isOpen={ModalAnim}
          handleClose={() => {
            setModalAnim(!ModalAnim)
            setTimeout(
              () => setChangePasswordModalFlag(!changePasswordModalFlag),
              200,
            )
          }}
        >
          <PasswordChangeForm />
        </Modal>
      )}
    </div>
  )
}

export default observer(Settings)
