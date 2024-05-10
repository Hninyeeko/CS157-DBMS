"use client"


import { useRouter } from "next/navigation"
import Axios from "axios";
import React, { useEffect, useState } from 'react';



/**
 * Component for creating a new list.
 * Allows users to input list name, select a shop, and add notes.
 * Sends a POST request to the backend to add the new list to the database.
 */
export default function createNewList(){
  const router = useRouter();

  const [listName, setListName] = React.useState("")
  const [shop, setShop] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const[shops, setShops]= React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

    // Sending a Post request to add new list to DB

    const createNewList = (e) => {
      e.preventDefault();
      setIsLoading(true)
      Axios.post("http://localhost:3002/createNewList", {
        listName: listName,
        shop: shop,
        notes: notes,
      }).then((response) => {
        if(response.data.message) {
          console.log(response.data.message)
          router.refresh()
          router.push('/viewLists')
        } else {
          console.log(response.data.email) 
          router.refresh()
          router.push('/viewLists')
        }
      }
      )
    }

    useEffect(() => {
      const fetchShops = async () => {
        try {
          const response = await Axios.get('http://localhost:3002/shops'); // replace with your API endpoint
          setShops(response.data);
        } catch (error) {
          console.error('Failed to fetch shops', error);
        }
      };
  
      fetchShops();
    }, []);
  

  

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
      <select
        required
        id="shop"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      >
        <option value="">Select a shop</option>
        {shops.map((shop) => (
          <option  value={shop}>
            {shop}
          </option>
        ))}
      </select>
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
