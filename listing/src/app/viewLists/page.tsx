// This component displays a list of shopping lists retrieved from the server.
// It fetches the lists and their corresponding shop names from the server using Axios.
// Each list item is displayed with its name, shop name, and notes.
// Clicking on a list item redirects the user to the list template page with the list ID and name as query parameters.
// It also provides a cancel button to return to the home page.

"use client"

import * as React from "react";
import { useRouter } from "next/navigation"
import Axios from "axios";
import { useEffect, useState } from 'react';

interface ListItemProps {
  ListID: number;
  name: string;
  shop: string;
  notes: string;
}

function ListItem({ ListID, name, shop, notes }: ListItemProps) {

  const router = useRouter();

  const handleView = () => {
    console.log("Open List");
    // Handle View logic here
    //router.push(`/listTemplate?listId=${ListID}`);
    router.push(`/listTemplate?listId=${ListID}&listName=${name}`);

  };



  return (
       <div onClick={handleView} className="p-5 m-2.5 rounded-md border border-t border-r border-b border-l border-solid border-b-neutral-200 border-b-neutral-200 border-l-neutral-200 border-l-neutral-200 border-neutral-200 border-r-neutral-200 border-r-neutral-200 border-t-neutral-200 border-t-neutral-200 w-[300px] bg-yellow-500">
        <h2>{name}</h2>
        <p>Shop: {shop}</p>
        <p>Notes: {notes}</p>
      </div>
  );
}

function MyComponent() {
  const router = useRouter();
  const [lists, setLists] = React.useState([]);  
  const [shop, setShop] = React.useState("");
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await Axios.get('http://localhost:3002/viewLists'); // replace with your API endpoint
        setLists(response.data);
        console.log('check');
        console.log('check the lists:', lists);
      } catch (error) {
        console.log('fail');
        console.error('Failed to fetch shops', error);
      }
    };

    fetchShops();
  }, []);

  const [shopNames, setShopNames] = useState({});

useEffect(() => {
  const fetchShopNames = async () => {
    const newShopNames = {};
    for (const list of lists) {
      const response = await Axios.get(`http://localhost:3002/shopName/${list.ShopID}`);
      newShopNames[list.ShopID] = response.data[0].ShopName;
    }
    setShopNames(newShopNames);
  };

  fetchShopNames();
}, [lists]);


const handleCancel = () => {
  router.push("/home");

};

  


  return (
    <div>
      <h2>VIEW YOUR LISTS</h2>
      {lists.length > 0 && lists.map((list, index) => {
        return (
          <ListItem
            key={index}
            ListID={list.ListID}
            name={list.ListName}
            shop={shopNames[list.ShopID]} // Use the result of the function here
            notes={list.Notes}
          />
        );
      })}
      <button onClick={handleCancel} className="px-6 py-3 mt-4 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Cancel
      </button>
    </div>
  );
}

export default MyComponent;
