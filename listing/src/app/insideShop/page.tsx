"use client"

import * as React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { NoSubstitutionTemplateLiteral, NumberLiteralType } from "typescript";

interface Review {
  rating: number;
  comment: string;
}

interface TableRowProps {
  rating: number;
  comment: string;
}


//Still need to work on the listTemplate to print the data from MySQL
const TableRow: React.FC<TableRowProps> = ({ rating, comment }) => {
  return (
    <tr>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {rating}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {comment}
      </td>
    </tr>
  );
};

interface TableRowProps2 {
    name: string;
    
  }

const TableRow2: React.FC<TableRowProps2> = ({ name }) => {
    return (
      <tr>
        <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
          {name}
        </td>
      </tr>
    );
  };



const MyComponent: React.FC = () => {
  var shopID = 0;
  const router = useRouter();
  const [itemsReal, setItems] = React.useState([]); 
  const [brands, setBrands] = React.useState([]); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shopIdreal = urlParams.get("shopId");
    console.log(shopIdreal);
    if (shopIdreal !== null) {
      shopID = (Number(shopIdreal));
      console.log(shopID);

    }
  }, []);
  let handleView = () => {
    console.log("Open List");
    const urlParams = new URLSearchParams(window.location.search);
    const listIdreal = urlParams.get("listId");
    console.log(listIdreal);
    // Handle View logic here
    //router.push(`/listTemplate?listId=${ListID}`);
    router.push(`/addItem?listId=${listIdreal}`);
  };
 

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await Axios.get(`http://localhost:3002/getReviews/${shopID}`); // replace with your API endpoint
        setItems(response.data);
        console.log(response.data);
        console.log('check');
        console.log('check the lists:', itemsReal);
      } catch (error) {
        console.log('fail');
        console.error('Failed to fetch shops', error);
      }
    };

    fetchShops();
  }, [])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await Axios.get(`http://localhost:3002/getBrands/${shopID}`); // replace with your API endpoint
        setBrands(response.data);
        console.log(response.data);
        console.log('check');
        console.log('check the lists:', brands);
      } catch (error) {
        console.log('fail');
        console.error('Failed to fetch shops', error);
      }
    };

    fetchBrands();
  }, [])


  const handleCancel = () => {
    router.push("/viewShops");

  };

  //Still need to call these functions inside the template below
  const [itemName, setItemName] = React.useState("")
  const [quantity, setQuantity] = React.useState("")
  const [purchased, setPurchased] = React.useState(false) //checkbox

// Sending a Post request to add new item to DB, still needs work
const addItem = (e) => {
  e.preventDefault();
  Axios.post("http://localhost:3002/addItem", {
    itemName: itemName,
    quanity: quantity,
    purchased: purchased,
  }).then((response) => {
    if(response.data.message) {
      console.log(response.data.message)
      router.refresh()
      router.push(`/addItem?listId=${listID}`);
    } else {
      console.log(response.data.email) 
    }
  }
  )
}


  return (
    <main
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
    >
    <h1 className="text-4xl font-bold mb-8 text-black">Brands</h1>
      <table className="w-full border-collapse bg-white bg-opacity-75">
        <thead>
          <tr>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Brand Names
            </th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(brands) && brands.map((brand, index) => (
  <TableRow2 key={index} name={brand.BrandName}  />
))}
        </tbody>
      </table>
      <h1 className="text-4xl font-bold mb-8 text-black">Ratings</h1>
      <table className="w-full border-collapse bg-white bg-opacity-75">
        <thead>
          <tr>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Rating Stars
            </th>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(itemsReal) && itemsReal.map((item, index) => (
  <TableRow key={index} rating={item.Rating} comment={item.Comment}  />
))}
        </tbody>
      </table>
      
      <button onClick={handleCancel} className="px-6 py-3 mt-4 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Cancel
      </button>
    </main>
  );
};

export default MyComponent;