"use client";
import Image from "next/image";
import {connect} from "./database/page";
import {selectAllStudents} from "./database/page";
import { executeSqlFile } from './database/page';

import React, {useState, useEffect} from "react";
import Axios from "axios";


interface FormTextAreaProps {
  placeholder: string;
  name: string;
  className?: string;
  required?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  placeholder,
  name,
  className,
  required = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
      />
    </div>
  );
};

const MyComponent: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [registerStatus, setRegisterStatus] = React.useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3001/api/execute-sql')
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.message) {
        setRegisterStatus(response.data.message)
      }else {
        setRegisterStatus("User Registered")
      }
    }
    )
  }

 

  return (
    <div
      className="box-border flex relative flex-col shrink-0 p-5 min-h-[100px]"
      style={{ maxWidth: 1200 }}
    >
      <section className="box-border flex relative flex-col grow shrink-0 self-stretch p-5 mx-auto w-full max-w-[1200px] min-h-[100px]">
        <div className="box-border flex relative flex-col shrink-0 px-5 py-36 bg-center bg-no-repeat bg-cover bg-[url(https://cdn.builder.io/api/v1/image/assets%2F25fd6ed351994175ac507a1dcdcba146%2Fa7306110877a4aa68cec057df890e56a)] max-md:py-28 max-sm:py-20">
          <div className="box-border flex relative flex-col shrink-0 py-4 m-auto max-w-[700px] max-md:pb-12">
          <header className="relative shrink-0 -mt-0.5 h-auto text-6xl text-center text-black max-md:mt-px max-md:text-6xl max-md:text-center max-sm:text-3xl">
  <h1>Welcome to</h1>
  <br />
  <h1>Cartier</h1>
</header>

            <p className="relative shrink-0 mt-8 h-auto text-xl text-center text-neutral-600 max-md:mt-9 max-md:text-center max-sm:mt-6 max-sm:text-base">
              Your virtual&nbsp;shopping cart for all your needs.
            </p>
            <form>
              <input onChange={(e) => {setUsername(e.target.value) }}  className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300" type="textInput" placeholder="Username" />
              
              <input onChange={(e) => {setEmail(e.target.value) }} className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300" type="textInput" placeholder="Email" />

              <input onChange={(e) => {setPassword(e.target.value) }} className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300" type="textInput" placeholder="Password" />

              <button
                onClick={register}
                type="submit"
                className="box-border relative shrink-0 px-8 py-5 mx-auto mt-7 text-xl text-center text-black bg-white rounded appearance-none max-md:mt-7 max-sm:px-6 max-sm:py-4 max-sm:mt-5 max-sm:text-base"
              >
                Sign Up
              </button>
              {user ? <h1>{JSON.stringify(user)}</h1> : null}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyComponent;
