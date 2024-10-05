"use client"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import styles from "@/styles/Deposit/global.module.scss"
import { Context } from "@/components/GlobalContextProvider"
import { useRouter } from "next/navigation"
import * as Yup from "yup"
import { Field, Form, Formik } from "formik"
import { AnimatePresence, motion } from "framer-motion"
import UMoneyLogo from "@/images/iomoney.png"
import Image from "next/image"
import Unauthorized from "@/components/Unauthorized"

interface UmoneyForm {
  sum: number
  toggle: boolean
}

const UmoneyScheme = Yup.object().shape({
  sum: Yup.number()
    .required("Пустое поле")
    .min(2, "Минимум 2 рубля")
    .integer("Число должно быть целым"),
  toggle: Yup.bool().oneOf([true], "Необходимо согласиться с правилами"),
})

function DepositPage() {
  const { store } = useContext(Context)
  const router = useRouter()
  const [loader, setLoader] = useState<boolean>(false)

  const initialValues: UmoneyForm = {
    sum: 2,
    toggle: false,
  }

  if (!store.isAuth) {
    return <Unauthorized />
  } else {
    if (!store.user.isActivated) {
      return (
        <div className={styles.main}>
          Подтвердите адрес электронной почты для совершения платежей
        </div>
      )
    } else {
      return (
        <>
          <div className={styles.main}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                setLoader(true)
                if (values.toggle) {
                  store.umoney_request_payment(values.sum).then((res) => {
                    router.push(res.redirect)
                  })
                }
                setLoader(false)
              }}
              validationSchema={UmoneyScheme}
            >
              {({ errors, touched }) => (
                <Form className={styles.form}>
                  <h1>
                    Atomic Craft <br /> Donation
                  </h1>
                  <Field
                    id="sum"
                    name="sum"
                    placeholder="Сколько пополняем?"
                    className={styles.field}
                  />
                  {errors.sum && touched.sum ? (
                    <AnimatePresence>
                      <motion.div
                        className={styles.error}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{
                          duration: 0.5,
                        }}
                      >
                        <li>{errors.sum}</li>
                      </motion.div>
                    </AnimatePresence>
                  ) : null}
                  <label className={styles.checkbox}>
                    <Field
                      type="checkbox"
                      name="toggle"
                      className={styles.checkbox_field}
                    />
                    Я согласен с&nbsp;
                    <a href={"/rules"} target="_blank" rel="noreferrer">
                      условиями
                    </a>
                    &nbsp; <br />
                    проведения платежа
                  </label>
                  {errors.toggle && touched.toggle ? (
                    <AnimatePresence>
                      <motion.div
                        className={styles.error}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                        }}
                      >
                        <li>{errors.toggle}</li>
                      </motion.div>
                    </AnimatePresence>
                  ) : null}
                  <button type="submit" className={styles.submit}>
                    Отправить
                  </button>
                  <AnimatePresence>
                    {loader && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: "5%",
                        }}
                        className={styles.loader}
                      ></motion.span>
                    )}
                  </AnimatePresence>
                </Form>
              )}
            </Formik>
            <div className={styles.logo}>
              <Image src={UMoneyLogo} alt={""} fill={true} />
            </div>
          </div>
        </>
      )
    }
  }
}

export default observer(DepositPage)
