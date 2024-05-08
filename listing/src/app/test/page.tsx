"use client";
import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router";
import { setSyntheticLeadingComments } from "typescript";


export default  function Home() {

  const [loginStatus, setLoginStatus] = React.useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/some-page")
      .then((response) => {
        // Handle the response data
        setLoginStatus(response.data.email)
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        setLoginStatus("error")
        console.error(error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>{JSON.stringify(loginStatus)}</h1>
    </main>
  );
}