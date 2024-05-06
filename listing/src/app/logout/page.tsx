"use client";
import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import Image from "next/image";
import {useRouter} from "next/router";
import { setSyntheticLeadingComments } from "typescript";


export default  function Home() {

  const [user, setUser] = React.useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/some-page")
      .then((response) => {
        // Handle the response data
        setUser(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:3001/logout", {
    }).then((response) => {
      if(response.data.message) {
        setUser(response.data.message)
        console.log(response.data.message)
      } else {
        setUser(response.data.email)
        console.log(response.data.email) 
      }
    }
    )
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
        <h1>{JSON.stringify(user)}</h1>
        <button
            onClick = {logout}
            type="submit"
            className="box-border relative shrink-0 px-8 py-5 mx-auto mt-7 text-xl text-center text-black bg-white rounded appearance-none max-md:mt-7 max-sm:px-6 max-sm:py-4 max-sm:mt-5 max-sm:text-base"
          >
            Logout
          </button>
        </div>
      ) : (
        <h1>need to login</h1>
      )}
    </main>
  );
}