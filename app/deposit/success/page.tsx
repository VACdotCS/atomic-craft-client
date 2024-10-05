"use client"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import styles from "@/styles/Deposit/global.module.scss"
import { Context } from "@/components/GlobalContextProvider"

function DepositPage() {
  const store = useContext(Context)

  return <div className={styles.main}>Успех</div>
}

export default observer(DepositPage)
