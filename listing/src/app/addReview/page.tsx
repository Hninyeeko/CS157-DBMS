"use client"

import * as React from "react";
import { useRouter } from "next/navigation"
import Axios from "axios";

export default function addReview(){
  const router = useRouter();

  const [shopID, setShopID] = React.useState("") //dropdown
  const [comment, setComment] = React.useState("")
  const [stars, setStars] = React.useState("") //dropdown
  const [isLoading, setIsLoading] = React.useState(false)

    // Sending a Post request to add new review to DB
    const addReview = (e) => {
      e.preventDefault();
      setIsLoading(true)
      Axios.post("http://localhost:3002/addReview", {
        comment: comment,
        stars: stars,
        shopID: shopID,
      }).then((response) => {
        if(response.data.message) {
          console.log(response.data.message)
          router.refresh()
          router.push('/viewShops')
        } else {
          console.log(response.data.email) 
        }
      }
      )
    }

  
  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
    router.push("/viewShops");
  };

  return (
    <form onSubmit={addReview} className="flex flex-col items-center">
      <h1>Add Review</h1>
      <label htmlFor="notes" className="sr-only">
        Shop ID
      </label>
      <textarea
        required
        id="shopID"
        placeholder="Shop ID"
        value={shopID}
        onChange={(e) => setShopID(e.target.value)}
        className="p-2.5 mb-5 w-4/5 border border-t border-r border-b border-l border-solid border-stone-300 h-[100px]"
      />
      <label htmlFor="comment" className="sr-only">
       Comment
      </label>
      <input
        type="text"
        id="comment"
        placeholder="Start review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <label htmlFor="stars" className="sr-only">
        Stars
      </label>
      <input
        required
        type="text"
        id="stars"
        placeholder="1-5 stars"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <div className="flex justify-between w-4/5">
        <button
          onClick={handleCancel}
          className="box-border relative grow shrink-0 p-6 m-auto w-auto text-center rounded border-2 border-solid appearance-none cursor-pointer bg-black bg-opacity-40 border-[black] text-[white]"
        >
          Cancel
        </button>
        <button
          className="box-border relative grow shrink-0 p-6 m-auto w-auto text-center rounded border-2 border-solid appearance-none cursor-pointer bg-black bg-opacity-40 border-[black] text-[white]"
          disabled={isLoading}
        >
          {isLoading && <span>Saving Review...</span>}
          {!isLoading && <span>Submit </span>}
        </button>
      </div>
    </form>
  )
}
