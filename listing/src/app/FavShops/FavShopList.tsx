import React, { useEffect, useState } from 'react';
import Axios from "axios";

// Define the Shop interface
interface FavShop {
    ShopName: string;
    ShopID: string;
}

/**
 * Component to display a list of favorite shops.
 * Retrieves the list of favorite shops from the backend API and renders them.
 */
export default function ShopList() {
    // State variable to store the list of favorite shops
    const [favshops, setShops] = useState<FavShop[]>([]);

    // Effect hook to fetch the list of favorite shops from the API when the component mounts
    useEffect(() => {
        const getFavShopList = async () => {
            try {
                console.log("Frontend sending get request to API endpoint");
                const response = await Axios.get<FavShop[]>("http://localhost:3002/getFavShopList");
                console.log("Response from backend:", response.data);
                setShops(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        getFavShopList();
    }, []);

    return (
        <>
            {/* Render a grid layout to display each favorite shop */}
            <div className="grid grid-cols-3 gap-4">
                {/* Map over the list of favorite shops and render each shop */}
                {favshops.map((shop) => (
                    <div key={shop.ShopID} className="bg-blue-100 rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2 text-black">Shop ID: {shop.ShopID}</h3>
                        <h3 className="text-lg font-semibold mb-2 text-black">Shop Name: {shop.ShopName}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}
