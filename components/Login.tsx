"use client";
import * as React from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Context } from "@/components/GlobalContextProvider";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "@/styles/Nav/Reg.module.scss";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import { bool } from "yup";

interface MyFormValues {
  nickname: string;
  passwd: string;
}

interface MyFormValuesForget {
  email: string;
  password: string;
  verify: string;
  hash: "";
}

const SignInScheme = Yup.object().shape({
  nickname: Yup.string()
    .max(16, "Ник не может быть длиной больше 16 символов")
    .required("Ник не может быть пустым"),
  passwd: Yup.string().required("Не забудьте пароль"),
});

const changePasswordScheme1 = Yup.object().shape({
  email: Yup.string()
    .required("Введите email")
    .email("Введите корректный email"),
});

const changePasswordScheme2 = Yup.object().shape({
  email: Yup.string()
    .required("Введите email")
    .email("Введите корректный email"),
  password: Yup.string()
    .min(8, "Длина пароля должна быть не меньше 8 символов")
    .required("Не забудьте пароль")
    .matches(/[a-zA-Z]/, "Пароль должен состоять из латинских символов"),
  verify: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Пароли должны совпадать",
  ),
  hash: Yup.string().required("Введите код с почты"),
});

export const Login: React.FC<{}> = () => {
  const { store } = useContext(Context);
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [rememberPage, setRememberPage] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const handleClickForget = () => {
    setLoginPage(false);
    setTimeout(() => {
      setRememberPage(true);
    }, 500);
  };

  const handleClickBack = () => {
    setRememberPage(false);
    setTimeout(() => {
      // @ts-ignore
      window.document.getElementById("backbtn").style.display = "none";
    }, 125);
    setTimeout(() => {
      setLoginPage(true);
    }, 500);
    setEmailSent(false);
    setSubmitted(false);
  };

  const initialValues: MyFormValues = {
    nickname: "",
    passwd: "",
  };

  const initialValuesForget: MyFormValuesForget = {
    email: "",
    password: "",
    verify: "",
    hash: "",
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <section
      style={{
        overflow: "hidden",
        display: "flex",
        flexFlow: "row nowrap",
        height: "100%",
      }}
    >
      <LayoutGroup>
        <AnimatePresence>
          {loginPage && (
            <motion.section
              initial={{
                x: (-500 * screenWidth) / 1920,
                width: "100%",
              }}
              animate={{
                x: 0,
                width: "100%",
              }}
              exit={{
                x: (-500 * screenWidth) / 1920,
                width: "100%",
              }}
              style={{
                width: "100%",
              }}
            >
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                  setLoader(true);
                  const res = await store.login(values.nickname, values.passwd);
                  if (res) {
                    actions.setFieldError("passwd", res?.data?.message);
                  } else {
                    location.reload();
                  }
                  setLoader(false);
                }}
                validationSchema={SignInScheme}
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
                      type={"password"}
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
                    <p
                      className={styles.forgetSign}
                      onClick={handleClickForget}
                    >
                      Забыли пароль?
                    </p>
                    <button
                      type="submit"
                      onClick={() => {
                        setLoader(true);
                      }}
                      className={styles.submit_login}
                    >
                      Войти
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
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </motion.section>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {rememberPage && (
            <motion.section
              initial={{
                x: (500 * screenWidth) / 1920,
                width: "100%",
              }}
              animate={{
                x: 0,
                width: "100%",
              }}
              exit={{
                x: (500 * screenWidth) / 1920,
                width: "100%",
              }}
              style={{
                width: "100%",
              }}
            >
              <div id={"backbtn"} className={styles.imageWrapp}>
                <Image
                  src={`${process.env.IMAGES_URL}/Back.png`}
                  alt={""}
                  fill={true}
                  onClick={handleClickBack}
                  className={styles.backButton}
                  objectFit={"contain"}
                />
              </div>
              <Formik
                initialValues={initialValuesForget}
                onSubmit={async (values, actions) => {
                  setLoader(true);
                  if (!emailSent) {
                    await store
                      .sendChangePasswordEmail(values.email)
                      .then((res) => {
                        if (res?.status === 200) {
                          setEmailSent(true);
                        } else {
                          actions.setFieldError("email", res);
                        }
                      });
                  } else {
                    await store
                      .changeEmailWithHash(
                        values.email,
                        values.hash,
                        values.password,
                      )
                      .then((res) => {
                        if (res?.status === 200) {
                          setEmailSent(false);
                          setSubmitted(true);
                          setTimeout(() => {
                            location.replace("/");
                          }, 3000);
                        } else {
                          actions.setFieldError("hash", res);
                        }
                      });
                  }
                  setLoader(false);
                }}
                validationSchema={
                  emailSent ? changePasswordScheme2 : changePasswordScheme1
                }
              >
                {({ errors, touched }) => (
                  <Form className={styles.form}>
                    <h1>Atomic Craft</h1>
                    <Field
                      id="email"
                      name="email"
                      placeholder="Ваша почта"
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
                    <AnimatePresence>
                      {emailSent && (
                        <>
                          <Field
                            id="password"
                            name="password"
                            placeholder="Ваш новый пароль"
                            className={styles.field}
                          />
                          {errors.password && touched.password ? (
                            <AnimatePresence>
                              <motion.div
                                className={styles.error}
                                initial={{
                                  height: 0,
                                }}
                                animate={{
                                  height: "auto",
                                }}
                                exit={{
                                  height: 0,
                                }}
                              >
                                <li>{errors.password}</li>
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
                                initial={{
                                  height: 0,
                                }}
                                animate={{
                                  height: "auto",
                                }}
                                exit={{
                                  height: 0,
                                }}
                              >
                                <li>{errors.verify}</li>
                              </motion.div>
                            </AnimatePresence>
                          ) : null}
                          <Field
                            id="hash"
                            name="hash"
                            placeholder="Код с почты"
                            autocomplete="off"
                            className={styles.field}
                          />
                          {errors.hash && touched.hash ? (
                            <AnimatePresence>
                              <motion.div
                                className={styles.error}
                                initial={{
                                  height: 0,
                                }}
                                animate={{
                                  height: "auto",
                                }}
                                exit={{
                                  height: 0,
                                }}
                              >
                                <li>{errors.hash}</li>
                              </motion.div>
                            </AnimatePresence>
                          ) : null}
                        </>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {!emailSent && (
                        <button type="submit" className={styles.submit_login}>
                          Отправить код
                        </button>
                      )}
                      {emailSent && (
                        <button type="submit" className={styles.submit_login}>
                          Сменить пароль
                        </button>
                      )}
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
                      {emailSent && (
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
                          Код отправлен на почту
                        </motion.p>
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
                          Пароль успешно изменён
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </motion.section>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
};

export default observer(Login);
