"use client"

import * as React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { NumberLiteralType } from "typescript";

interface Item {
  name: string;
  quantity: number;
  shop: string;
  notes: string;
}

interface TableRowProps {
  name: String;
  quantity: number;
  notes: string;
}


//Still need to work on the listTemplate to print the data from MySQL
const TableRow: React.FC<TableRowProps> = ({ name, quantity, notes }) => {
  return (
    <tr>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {name}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {quantity}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {notes}
      </td>
    </tr>
  );
};

const MyComponent: React.FC = () => {
  var listID = 0;
  const router = useRouter();
  const [itemsReal, setItems] = React.useState([]); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const listIdreal = urlParams.get("listId");
    console.log(listIdreal);
    if (listIdreal !== null) {
      listID = (Number(listIdreal));
      console.log(listID);

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
        const response = await Axios.get(`http://localhost:3002/getItems/${listID}`); // replace with your API endpoint
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


  const handleCancel = () => {
    router.push("/viewLists");

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

  const items: Item[] = [
    {
      name: "Item 1",
      quantity: 2,
      shop: "Store A",
      notes: "Some notes",
    },
    {
      name: "Item 2",
      quantity: 1,
      shop: "Store B",
      notes: "More notes",
    },
  ];

  return (
    <main
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
    >
      <h1 className="text-4xl font-bold mb-8 text-white">Your List</h1>
      <table className="w-full border-collapse bg-white bg-opacity-75">
        <thead>
          <tr>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Item Name
            </th>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Quantity
            </th>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Notes
            </th>
          
          </tr>
        </thead>
        <tbody>
        {Array.isArray(itemsReal) && itemsReal.map((item, index) => (
  <TableRow key={index} name={item.ItemName} quantity={item.Quantity} notes={item.Description} />
))}
        </tbody>
      </table>
      <button onClick={handleView} className="px-6 py-3 mt-8 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Add Item
      </button>
      <button className="px-6 py-3 mt-4 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Edit Item
      </button>
      <button className="px-6 py-3 mt-4 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Cancel
      </button>
    </main>
  );
};

export default MyComponent;