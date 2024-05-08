"use client"

import { useRouter } from "next/navigation"
import FavShopList from "./FavShopList";



export default async function FavShops() {

    const router = useRouter();
    const handleCancel = () => { router.push("/viewShops")};
    const handleAddFav = () => { router.push("/addFavShop")};


    return (
        <main>
            <nav>
                <div>
                    <h3>Your Favorite Shops</h3>
                </div>
            </nav>

            <FavShopList/>

            <div className="flex justify-between w-4/5"></div>
            <button onClick={handleCancel} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Return
            </button>
            <button onClick={handleAddFav} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Add to Favorites
            </button>
        </main>
    )
}
    
  

