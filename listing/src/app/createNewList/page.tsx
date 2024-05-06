"use client"

import * as React from "react";
import { useRouter } from "next/navigation"

export default function createNewList(){
  const router = useRouter();

  const [listName, setListName] = React.useState("")
  const [shop, setShop] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    // Handle form submission logic here
    e.preventDefault()
    setIsLoading(true)

    const list = {
      listName, shop, notes
    }

    // Sending a Post request to add new list to DB
    const res = await fetch('endpoints for the API to connect to mySQL here', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(list)
    })

    //if resource is added, redirect user to viewLists page
    if (res.status === 201){
      router.refresh()
      router.push('/viewLists')
    }

  }

  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
    router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
        Shop
      </label>
      <input
        required
        type="text"
        id="shop"
        placeholder="Shop"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <label htmlFor="notes" className="sr-only">
        Notes
      </label>
      <textarea
        id="notes"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2.5 mb-5 w-4/5 border border-t border-r border-b border-l border-solid border-stone-300 h-[100px]"
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
