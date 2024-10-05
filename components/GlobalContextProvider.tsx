"use client";
import Store from "@/components/store/store";
import { createContext } from "react";
import React from "react";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Context.Provider value={{ store }}>{children}</Context.Provider>;
}
