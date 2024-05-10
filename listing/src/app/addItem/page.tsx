"use client"

import * as React from "react";
import Image from "next/image";
import {useState, useEffect} from "react";
import Axios from "axios";
import { useRouter } from "next/navigation"

interface ListFormProps {
  onSubmit: (itemName: string, quantity: string) => void;
  onCancel: () => void;
}

/**
 * Form component for adding a new item to a shopping list.
 * Provides input fields for item name, product specification, quantity, and description.
 * Sends a POST request to the backend to add the new item to the database.
 */
const ListForm: React.FC<ListFormProps> = ({ onSubmit, onCancel }) => {
  const router = useRouter();
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const[productNames, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState("")
  var listID = 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(itemName, quantity);
    setItemName("");
    setQuantity("");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const listIdreal = urlParams.get("listId");
    console.log(listIdreal);
    if (listIdreal !== null) {
      listID = (Number(listIdreal));
      console.log(listID);

    }
  }, []);

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const response = await Axios.get('http://localhost:3002/productNames'); // replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch shops', error);
      }
    };

    fetchProds();
  }, []);

  const addItem = (e) => {
    console.log('add item started')
    const urlParams = new URLSearchParams(window.location.search);
    const listIdreal = urlParams.get("listId");
    e.preventDefault();
    Axios.post("http://localhost:3002/addItem", {
      itemName: itemName,
      product: product,
      quantity: quantity,
      notes: description,
      listid: listIdreal

    }).then((response) => {
      if(response.data.message) {
        console.log(response.data.message)
        router.push('/viewLists')
        
      } else {
        console.log(response.data.email) 
        router.push('/viewLists')
      }
    }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1>Add New Item</h1>
      <label htmlFor="itemName" className="sr-only">
        Item Name
      </label>
      <input
        required
        type="text"
        id="itemName"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <label htmlFor="shop" className="sr-only">
        Shop
      </label>
      <select
        required
        id="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      >
        <option value="">Select a Product Specification</option>
        {productNames.map((shop) => (
          <option  value={shop}>
            {shop}
          </option>
        ))}
      </select>
      <label htmlFor="quantity" className="sr-only">
        Quantity
      </label>
      <textarea
        id="quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <label htmlFor="itemName" className="sr-only">
        Description
      </label>
      <input
        required
        type="text"
        id="description"
        placeholder="Decription"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      
      <div className="flex justify-between w-4/5">
        <button
          type="button"
          onClick={onCancel}
          className="w-[48%] h-10 cursor-pointer bg-gray-300 text-black border-none"
        >
          Cancel
        </button>
        <button
        onClick = {addItem}
          type="submit"
          className="w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white"
        >
          Add Item
        </button>
      </div>
    </form>
  );
};

/**
 * Main component that renders the ListForm.
 * Handles form submission and cancellation logic.
 */
export default function App() {
  const handleSubmit = (itemName: string, quantity: string) => {
    console.log("Item Name:", itemName);
    console.log("Quantity:", quantity);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
  };

  return (
    <main>
      <ListForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </main>
  );
}
