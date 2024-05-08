"use client"

import * as React from "react";
import { useRouter } from "next/navigation"
import Axios from "axios";

export default function createNewList(){
  const router = useRouter();

  const [listName, setListName] = React.useState("")
  const [shopID, setShopID] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

    // Sending a Post request to add new list to DB

    const createNewList = (e) => {
      e.preventDefault();
      setIsLoading(true)
      Axios.post("http://localhost:3002/createNewList", {
        listName: listName,
        shopID: shopID,
      }).then((response) => {
        if(response.data.message) {
          console.log(response.data.message)
          router.refresh()
          router.push('/viewLists')
        } else {
          console.log(response.data.email) 
        }
      }
      )
    }

  

  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
    router.push("/home");
  };

  return (
    <form onSubmit={createNewList} className="flex flex-col items-center">
      <h1>CREATE NEW LIST</h1>
      <label htmlFor="listName" className="sr-only">
        List Name
      </label>
      <input
        type="text"
        id="listName"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
        required
      />
      <label htmlFor="shop" className="sr-only">
        Shop ID
      </label>
      <input
        required
        type="text"
        id="shopID"
        placeholder="ShopID"
        value={shopID}
        onChange={(e) => setShopID(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <div className="flex justify-between w-4/5">
        <button
          onClick={handleCancel}
          className="w-[48%] h-10 cursor-pointer bg-gray-300 text-black border-none"
        >
          Cancel
        </button>
        <button
          className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white"
          disabled={isLoading}
        >
          {isLoading && <span>Creating list...</span>}
          {!isLoading && <span>Create New List </span>}
        </button>
      </div>
    </form>
  )
}
