import React, { useEffect, useState } from 'react'
import Axios from "axios";

// Define the Shop interface
interface Shop {
    ShopName: string;
    ShopID: string;
  }
export default function ShopList() {

    const [shops, setShops] = useState<Shop[]>([]);

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


  return (
    <>
    {shops.map((shop) => (
        <div key={shop.ShopID} className="card my-5">
            <h3>Shop ID: {shop.ShopID}</h3>
            <h3>Shop Name: {shop.ShopName}</h3>
        </div>
        ))}

    </>
        
    )
}
