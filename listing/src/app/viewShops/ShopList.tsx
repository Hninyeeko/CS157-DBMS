import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { useRouter } from "next/navigation"

// Define the Shop interface
interface Shop {
    ShopName: string;
    ShopID: string;
  }
function ShopList() {

    const router = useRouter();

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

        const handleView = () => {
          console.log("Open List");
          // Handle View logic here
          //router.push(`/listTemplate?listId=${ListID}`);
          router.push(`/listTemplate?listId=${ListID}`);
      
        };


  return (
    <>
    <div className="grid grid-cols-3 gap-4">
    {shops.map((shop) => (
        <div key={shop.ShopID} className="bg-blue-100 rounded-lg shadow-md p-4" 
        onClick ={() => router.push(`insideShop?shopId=${shop.ShopID}`)}>
            <h3 className="text-lg font-semibold mb-2 text-black">Shop ID: {shop.ShopID}</h3>
            <h3 className="text-lg font-semibold mb-2 text-black">Shop Name: {shop.ShopName}</h3>
        </div>
        ))}
    </div>

    </>
       
    )
}

export default ShopList;
