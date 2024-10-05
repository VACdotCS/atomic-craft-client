"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Habs/Page.module.scss";
import { Item } from "@/app/servers/Item";
import ServerCard from "@/components/ServerCard";
import ServerModal from "@/components/ServerModal";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { Context } from "@/components/GlobalContextProvider";
import { ServerInfo } from "@/app/servers/types";

const Servers = () => {
  const [sumOnline, setSumOnline] = useState<number>(0);
  const [Servers, setServers] = useState<Array<ServerInfo>>([]);
  const [CachedServers, setCachedServers] = useState<Array<ServerInfo>>([]);
  const [Versions, setVersions] = useState<Array<string>>([]);
  const [mods, setMods] = useState<Array<string>>([]);
  const [choosedMods, setChoosedMods] = useState<Array<string>>([]);
  const [choosedVersion, setChoosedVersion] = useState<string>("");
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [ServerFlagAnim, setServerFlagAnim] = useState<boolean>(false);
  const [ServerFlag, setServerFlag] = useState<boolean>(false);
  const [Id, setId] = useState<string>("");
  const { store } = useContext(Context);

  function clearList() {
    let listUL = window.document.getElementById("list");
    if (listUL) {
      let liS = listUL.getElementsByTagName("li");
      for (let i = 0; i < liS.length; ++i) {
        let item = liS.item(i);
        if (item) {
          if (String(item.style.opacity) === "0") {
            item.style.display = "none";
          }
        }
      }
    }
  }

  function addChoosedMod(elem: string) {
    if (elem !== "") {
      choosedMods.push(elem);
      let newArray: Array<string> = [];
      mods.map((el) => {
        if (elem !== el) {
          newArray.push(el);
        }
      });
      setMods(newArray);
    }
  }

  function deleteChoosedMod(elem: string) {
    let newArray: Array<string> = [];
    choosedMods.map((el) => {
      if (elem !== el) {
        newArray.push(el);
      }
    });
    setChoosedMods(newArray);
    mods.push(elem);
  }

  const fetchServersData = async () => {
    store.getServerInfo().then((el) => {
      const data: Array<ServerInfo> = [];
      store.setLoading(true);
      el["Servers"].map((item: any) => {
        data.push(item);
      });
      let sum = 0;
      let setOfVersions = new Set<string>();
      let setOfMods = new Set<string>();
      data.map((el) => {
        setOfVersions.add(el.version);
        if (el.online !== -1) {
          sum += el.online;
        }
        el.mods.map((mod) => {
          setOfMods.add(mod);
        });
      });
      setVersions(Array.from(setOfVersions));
      setMods(Array.from(setOfMods));
      setServers(data);
      setCachedServers(data);
      setSumOnline(sum);

      store.setLoading(false);
      setIsFetched(true);
    });
  };

  function updateServers() {
    let newArr: Array<ServerInfo> = [];
    CachedServers.map((el) => {
      let flag = true;
      if (choosedVersion !== "" && choosedVersion !== el.version) flag = false;
      if (choosedMods.length != 0) {
        choosedMods.map((mod) => {
          if (!el.mods.includes(mod)) {
            flag = false;
          }
        });
      }
      if (flag) {
        newArr.push(el);
      }
    });
    if (CachedServers.length !== newArr.length) {
      setServers(newArr);
      setTimeout(() => {
        clearList();
      }, 400);
    } else {
      setServers(CachedServers);
    }
  }

  function resetFilter() {
    let divWithMods = window.document.getElementById("listChoosedMods");
    let buttons = divWithMods?.getElementsByTagName("button");

    if (buttons) {
      for (let i = 0; i < buttons.length; ++i) {
        buttons?.item(i)?.click();
      }
    }

    setChoosedMods([]);
    setChoosedVersion("");
  }

  useEffect(() => {
    if (!isFetched) {
      fetchServersData();
    }
    updateServers();
  }, [choosedMods, mods, choosedVersion]);

  return (
    <LayoutGroup>
      <main className={styles.general}>
        <div className={styles.servers_wrapper}>
          <ul className={styles.servers} id={"list"}>
            <AnimatePresence>
              {!isFetched && (
                <div className={styles.loader}>
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              )}
              {Servers.map((elem) => (
                <ServerCard
                  key={elem.id}
                  id={elem.id}
                  title={elem.title}
                  version={elem.version}
                  isOnline={elem.isOnline}
                  onClick={() => {
                    setServerFlag(!ServerFlag);
                    setServerFlagAnim(true);
                    setId(elem.id);
                  }}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {ServerFlag && Servers.length > 0 && (
                <ServerModal
                  isOpen={ServerFlagAnim}
                  handleClose={() => {
                    setServerFlagAnim(!ServerFlagAnim);
                    setTimeout(() => setServerFlag(!ServerFlag), 200);
                  }}
                >
                  <Item id={Id} data={Servers} />
                </ServerModal>
              )}
            </AnimatePresence>
          </ul>
        </div>
        <div className={styles.filters_wrapper}>
          <h1>Версия</h1>
          <select
            id={"version"}
            title={"Версия"}
            className={styles.version}
            onChange={(event) => {
              event.preventDefault();
              setChoosedVersion(event.target.value);
            }}
          >
            {Versions.map((elem) => (
              <option key={Versions.indexOf(elem)}>{elem}</option>
            ))}
          </select>
          <h1>Моды</h1>
          <select
            id={"mods"}
            title={"Mods"}
            content={""}
            className={styles.version}
            onChange={(event) => {
              addChoosedMod(event.target.value);
            }}
          >
            {mods.map((elem) => (
              <option key={mods.indexOf(elem)}>{elem}</option>
            ))}
          </select>
          <AnimatePresence mode={"wait"}>
            {choosedMods.length ? (
              <motion.div
                id={"listChoosedMods"}
                layoutId={`choosed`}
                className={styles.choosedMods_wrapper}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: "10vw",
                }}
                exit={{
                  overflowY: "hidden",
                  height: 0,
                  opacity: 0,
                }}
              >
                <motion.div className={styles.choosedMods}>
                  <AnimatePresence>
                    {choosedMods.map((elem) => (
                      <motion.div
                        key={elem}
                        className={styles.mods_item_2}
                        initial={{
                          width: "85%",
                          height: "1.5vw",
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                          x: -1000,
                        }}
                        transition={{
                          easings: ["easeInOut"],
                        }}
                      >
                        <motion.span
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                          }}
                        >
                          <span>{elem}</span>
                        </motion.span>
                        <button
                          id={"modErase"}
                          onClick={() => {
                            deleteChoosedMod(elem);
                          }}
                          className={styles.button}
                        >
                          X
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {(choosedMods.length || choosedVersion.length) && (
              <motion.button
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={resetFilter}
                className={styles.resetButton}
              >
                Сбросить
              </motion.button>
            )}
          </AnimatePresence>
          <motion.div className={styles.stats}>
            <h1>Общий онлайн</h1>
            <span>{sumOnline}</span>
          </motion.div>
        </div>
      </main>
    </LayoutGroup>
  );
};

export default Servers;
