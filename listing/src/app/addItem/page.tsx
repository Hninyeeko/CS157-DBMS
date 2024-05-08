"use client"

import * as React from "react";
import Image from "next/image";

interface ListFormProps {
  onSubmit: (itemName: string, quantity: string) => void;
  onCancel: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, onCancel }) => {
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(itemName, quantity);
    setItemName("");
    setQuantity("");
  };

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
      
      <div className="flex justify-between w-4/5">
        <button
          type="button"
          onClick={onCancel}
          className="w-[48%] h-10 cursor-pointer bg-gray-300 text-black border-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-[48%] h-10 cursor-pointer bg-zinc-800 border-none text-white"
        >
          Add Item
        </button>
      </div>
    </form>
  );
};

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