"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import Axios from "axios";


export default function page() {

    const router = useRouter();
    const handleCancel = () => { router.push("/home")};
    const handleReview = () => {
        console.log("Navigate to addReview page");
        // Handle cancel logic here
        router.push("/addReview");
      };


  return (
    <div>
        <h2>Display list of shops here.</h2>
        <button onClick={handleReview} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Add Review
        </button>
        <button onClick={handleCancel} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Cancel
        </button>
    </div>
  )
}
