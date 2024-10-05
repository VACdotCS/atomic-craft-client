"use client"
import * as React from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import { Context } from "@/components/GlobalContextProvider"
import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import styles from "@/styles/Nav/Reg.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { action, values } from "mobx"

interface MyFormValues {
  prev_password: string
  passwd: string
  verify: string
}

const SignInScheme = Yup.object().shape({
  passwd: Yup.string()
    .min(8, "Длина пароля должна быть не меньше 8 символов")
    .required("Пустое поле")
    .matches(/[a-zA-Z]/, "Пароль должен состоять из латинских символов"),
  verify: Yup.string().oneOf(
    [Yup.ref("passwd"), undefined],
    "Пароли должны совпадать",
  ),
})

export const PasswordChangeForm: React.FC<{}> = () => {
  const { store } = useContext(Context)
  const [loader, setLoader] = useState<boolean>(false)

  const initialValues: MyFormValues = {
    prev_password: "",
    passwd: "",
    verify: "",
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          setLoader(true)
          if (values.prev_password === values.passwd) {
            actions.setFieldError("passwd", "Пароль совпадает с предыдущим")
          } else {
            const res = await store.changePasswordAuthed(
              store.user.nick,
              values.prev_password,
              values.passwd,
            )
            if (res?.status === 200) {
              toast(
                "Пароль успешно изменён, вы бедете перенаправлены на главную страницу. Пожалуйста, войдите ещё раз",
              )
              setTimeout(async () => {
                await store.logout().then(() => {
                  setLoader(false)
                  location.replace("/")
                })
              }, 4200)
            } else {
              actions.setFieldError("prev_password", res)
            }
          }
        }}
        validationSchema={SignInScheme}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h1>Atomic Craft</h1>
            <Field
              id="prev_password"
              name="prev_password"
              placeholder="Предыдущий пароль"
              className={styles.field}
            />
            {errors.prev_password && touched.prev_password ? (
              <AnimatePresence>
                <motion.div
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                >
                  <li>{errors.prev_password}</li>
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
                >
                  <li>{errors.verify}</li>
                </motion.div>
              </AnimatePresence>
            ) : null}
            <button type="submit" className={styles.submit_login}>
              Изменить пароль
            </button>
            <AnimatePresence>
              {loader && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "30%",
                  }}
                  className={styles.loader}
                ></motion.span>
              )}
            </AnimatePresence>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default observer(PasswordChangeForm)
