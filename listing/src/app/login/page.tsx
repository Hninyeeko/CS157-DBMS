"use client";
import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router";
import { setSyntheticLeadingComments } from "typescript";


export default  function Home() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus, setLoginStatus] = React.useState("");

  const register = (e) => {
   e.preventDefault();
    Axios.post("http://localhost:3002/login", {
      username: username,
      password: password,
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(response.data.message)
        console.log(response.data.message)
      } else {
        setLoginStatus(response.data.email)
        console.log(response.data.email) 
      }
    }
    )
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/some-page")
      .then((response) => {
        // Handle the response data
        setLoginStatus(response.data.email)
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loginStatus ? (
        <h1>{JSON.stringify(loginStatus)}</h1>
      ) : (
        <form>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300"
            type="textInput"
            placeholder="Username"
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300"
            type="textInput"
            placeholder="Password"
          />

          <button
            onClick={register}
            type="submit"
            className="box-border relative shrink-0 px-8 py-5 mx-auto mt-7 text-xl text-center text-black bg-white rounded appearance-none max-md:mt-7 max-sm:px-6 max-sm:py-4 max-sm:mt-5 max-sm:text-base"
          >
            Login
          </button>
        </form>
      )}
    </main>
  );
}