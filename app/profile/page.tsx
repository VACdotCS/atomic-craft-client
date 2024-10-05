"use client";
import React, { useContext } from "react";
import Profile from "@/components/Profile";
import "react-toastify/scss/main.scss";
import { Context } from "@/components/GlobalContextProvider";
import { observer } from "mobx-react-lite";
import Unauthorized from "@/components/Unauthorized";

function ProfilePage() {
  const { store } = useContext(Context);

  if (!store.isAuth) {
    return <Unauthorized />;
  }

  return (
    <>
      {!store.isLoading && (
        <Profile
          registrationDate={store.user.registrationDate}
          skinPath={store.user.skinPath}
          email={store.user.email}
          nick={store.user.nick}
          isActivated={store.user.isActivated}
        />
      )}
    </>
  );
}

export default observer(ProfilePage);
