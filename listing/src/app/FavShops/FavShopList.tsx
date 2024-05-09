import React, { useEffect, useState } from 'react'
import Axios from "axios";

// Define the Shop interface
interface FavShop {
    ShopName: string;
    ShopID: string;
  }
export default function ShopList() {

    const [favshops, setShops] = useState<FavShop[]>([]);

    //grabs shop list from API
    useEffect(() => {
        const getFavShopList = async () => {
          try{
            console.log("Frontend sending get request to API endpoint");
            const response = await Axios.get<FavShop[]>("http://localhost:3002/getFavShopList");
            console.log("Response from backend:", response.data);
            setShops(response.data);
          }catch (error) {
            console.error('Error fetching data', error);
          }
        };
    
        getFavShopList();
        }, []);


  return (
    <>
    <div className="grid grid-cols-3 gap-4">
    {favshops.map((shop) => (
        <div key={shop.ShopID} className="bg-blue-100 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2 text-black">Shop ID: {shop.ShopID}</h3>
            <h3 className="text-lg font-semibold mb-2 text-black">Shop Name: {shop.ShopName}</h3>
            
        </div>
        ))}
    </div>

    </>
       
    )
}
