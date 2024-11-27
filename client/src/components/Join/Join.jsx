/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import style from "./Join.module.css";
import { Input, Button } from "@mui/material";

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect(
      "https://josebrenon-reactrealtimechat.netlify.app/:1"
    );
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };
  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={style["join-container"]}>
      <h2>Chat em tempo real</h2>
      <Input
        inputRef={usernameRef}
        placeholder="Nome de usuário"
        onKeyDown={(e) => getEnterKey(e)}
      />
      <Button sx={{ mt: 2 }} onClick={() => handleSubmit()} variant="contained">
        Entrar
      </Button>
    </div>
  );
}
