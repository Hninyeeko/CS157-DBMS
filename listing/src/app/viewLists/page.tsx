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
    router.push(`/listTemplate?listId=${ListID}`);

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


  


  return (
    <div>
      <h2>VIEW YOUR LISTS</h2>
      {lists.map((list, index) => {
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
    </div>
  );
}

export default MyComponent;