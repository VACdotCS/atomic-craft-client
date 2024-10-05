"use client"
import * as React from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import { Context } from "@/components/GlobalContextProvider"
import { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import styles from "@/styles/Nav/Reg.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import ReCAPTCHA from "react-google-recaptcha"

interface MyFormValues {
  nickname: string
  passwd: string
  verify: string
  email: string
  toggle: boolean
  captcha: boolean
}

const SignUpScheme = Yup.object().shape({
  nickname: Yup.string().max(16, "Ник не может быть длиной больше 16 символов"),
  passwd: Yup.string()
    .min(8, "Длина пароля должна быть не меньше 8 символов")
    .required("Не забудьте пароль")
    .matches(/[a-zA-Z]/, "Пароль должен состоять из латинских символов"),
  verify: Yup.string().oneOf(
    [Yup.ref("passwd"), undefined],
    "Пароли должны совпадать",
  ),
  email: Yup.string().required("Забыли email").email("Email введён неверно"),
  toggle: Yup.bool().oneOf([true], "Необходимо согласиться с правилами"),
})

export const Registration: React.FC<{}> = () => {
  const { store } = useContext(Context)
  const [Confirmed, setConfirmed] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(0)

  // @ts-ignoredq
  const key: string = process.env.CAPTCHA_KEY

  const initialValues: MyFormValues = {
    nickname: "",
    passwd: "",
    verify: "",
    toggle: false,
    email: "",
    captcha: false,
  }

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (!Confirmed) {
            actions.setFieldError("captcha", "Подтвердите капчу!")
          } else {
            actions.setSubmitting(true)
            setLoader(true)
            await store
              .registration(values.nickname, values.passwd, values.email)
              .then((res) => {
                if (res) {
                  if (res?.data?.message.includes("Почта")) {
                    actions.setFieldError("email", res?.data?.message)
                  }
                  if (res?.data?.message.includes("ник")) {
                    actions.setFieldError("nickname", res?.data?.message)
                  }
                  actions.setSubmitting(false)
                  setLoader(false)
                } else {
                  setLoader(false)
                  setSubmitted(true)
                  setTimeout(() => {
                    location.replace("/")
                  }, 2000)
                }
                setLoader(false)
              })
          }
        }}
        validationSchema={SignUpScheme}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1>Atomic Craft</h1>
            <Field
              id="nickname"
              name="nickname"
              placeholder="Ваш ник"
              className={styles.field}
            />
            {errors.nickname && touched.nickname ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.nickname}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <Field
              id="passwd"
              name="passwd"
              placeholder="Пароль"
              className={styles.field}
            />
            {errors.passwd && touched.passwd ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.passwd}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <Field
              id="verify"
              name="verify"
              placeholder="Подтвердите пароль"
              className={styles.field}
            />
            {errors.verify && touched.verify ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.verify}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <Field
              id="email"
              name="email"
              placeholder="Почтовый адрес"
              className={styles.field}
            />
            {errors.email && touched.email ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.email}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <label className={styles.checkbox}>
              <Field type="checkbox" name="toggle" />Я согласен с&nbsp;
              <a href={"/rules"} target="_blank">
                правилами
              </a>
              &nbsp;сервера
            </label>
            {errors.toggle && touched.toggle ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.toggle}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <ReCAPTCHA
              sitekey={key}
              size="normal"
              onChange={() => setConfirmed(true)}
              onErrored={() => setConfirmed(false)}
              style={{
                scale: `${screenWidth / 1920}`,
              }}
              className={styles.captcha}
              theme={"light"}
            />
            {errors.captcha ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{
                    height: 0,
                    marginBottom: "10px",
                  }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <li>{errors.captcha}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <button type="submit" className={styles.submit}>
              Создать аккаунт
            </button>
            <AnimatePresence>
              {loader && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "15%",
                  }}
                  className={styles.loader}
                ></motion.span>
              )}
              {submitted && (
                <motion.p
                  initial={{
                    scaleX: "0%",
                    scaleY: "0%",
                    scaleZ: "0%",
                  }}
                  animate={{
                    scaleX: "100%",
                    scaleY: "100%",
                    scaleZ: "100%",
                  }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className={styles.passwordChanged}
                >
                  Вы успешно зарегистрировались!
                </motion.p>
              )}
            </AnimatePresence>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default observer(Registration)
