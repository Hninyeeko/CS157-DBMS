"use client"
import {useState, useEffect} from "react";
import * as React from "react";
import { useRouter } from "next/navigation"
import Axios from "axios";

// Define the Shop interface
interface Shop {
  ShopName: string;
  ShopID: string;
}

export default function addReview(){
  const router = useRouter();

  const [comment, setComment] = React.useState('')
  const [rating, setRating] = React.useState('N/A') //dropdown
  const [isLoading, setIsLoading] = React.useState(false)

  const [date, setDate] = React.useState('')

  const [selectedShop, setSelectedShop] = useState('');
  const [shops, setShops] = useState<Shop[]>([]);

  //for dropdown list
  const handleSelectChange = (event) => {
    setSelectedShop(event.target.value);
    console.log("selectedshop value is : ", selectedShop);
  };

    // Sending a Post request to add new review to DB
    const addReview = (e) => {
      e.preventDefault();
      setIsLoading(true)
      console.log('Selected Shop ID:', selectedShop);
      Axios.post("http://localhost:3002/addReview", {
        //UserID: UserID,
        comment: comment,
        rating: rating,
        selectedShop: selectedShop,
        date: date,
      }).then((response) => {
          router.refresh()
          router.push('/viewShops')
        
      }
      )
    }

    //grabs shop list from API
    useEffect(() => {
    const getShopList = async () => {
      try{
        console.log("Frontend sending get request to API endpoint");
        const response = await Axios.get<Shop[]>("http://localhost:3002/getShopList");
        console.log("Response from backend:", response.data);
        setShops(response.data);
      }catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getShopList();
    }, []);

    

  
  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
    router.push("/viewShops");
  };

  return (
    <form onSubmit={addReview} className="flex flex-col items-center">
      <h1>Add Review</h1>
      <label>
        <span>Shop</span>
        <select
        required
        value={selectedShop} 
        onChange={handleSelectChange}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a shop.</option>
          {shops.map((shop) => (
            <option key={shop.ShopID} value={shop.ShopID}>
              {shop.ShopName}
           </option>
          ))}
        </select>
      </label>
      <label> 
        <span>Comment</span>
        <input
        required
        type="text"
        placeholder="Start Review"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      </label>
      
      <label>
        <span>Stars</span>
        <select
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
        >
          <option value="N/A">N/A</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </label>
      <label> 
        <span>Date</span>
        <input
        required
        type="text"
        placeholder="YYYY-MM-DD"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      </label>

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
