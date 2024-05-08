"use client"


import { useRouter } from "next/navigation"
import ShopList from "./ShopList";


export default async function Shops() {

    const router = useRouter();
    const handleCancel = () => { router.push("/home")};
    const handleFav = () => { router.push("/addFavShop")};
    const handleReview = () => {
        console.log("Navigate to addReview page");
        // Handle cancel logic here
        router.push("/addReview");
      };

    return (
        <main>
            <nav>
                <div>
                    <h3>Shops In Your Area</h3>
                </div>
            </nav>

            <ShopList/>

            <div className="flex justify-between w-4/5"></div>
            <button onClick={handleReview} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Add Review
            </button>
            <button onClick={handleCancel} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Cancel
            </button>
            <button onClick={handleFav} className="btn-primary w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white">
            Add Favorite Shops
            </button>
        </main>
    )
}
    
  

