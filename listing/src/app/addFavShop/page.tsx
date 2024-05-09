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

export default function addFavShop(){
    const router = useRouter();
  
    const [isLoading, setIsLoading] = React.useState(false)
  
    const [selectedShop, setSelectedShop] = useState('');
    const [shops, setShops] = useState<Shop[]>([]);
  
    //for dropdown list
    const handleSelectChange = (event) => {
      setSelectedShop(event.target.value);
      console.log("selectedshop value is : ", selectedShop);
    };
  
      // Sending a Post request to add Fav Shop to DB
      const addFavShop = (e) => {
        e.preventDefault();
        setIsLoading(true)
        console.log('Selected Shop ID:', selectedShop);
        Axios.post("http://localhost:3002/addFavShop", {
          selectedShop: selectedShop,
        }).then((response) => {
            router.refresh()
            router.push('/FavShops')
          
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
      <form onSubmit={addFavShop} className="flex flex-col items-center">
        <h1>Add a Shop to Your Favorites </h1>
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
            {isLoading && <span>Adding to Favorites...</span>}
            {!isLoading && <span>Add to Favorites </span>}
          </button>
        </div>
      </form>
    )
  }