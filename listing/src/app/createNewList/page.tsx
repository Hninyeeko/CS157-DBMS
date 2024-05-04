"use client"

import * as React from "react";
import { useRouter} from "next/navigation"

interface ListFormProps {
  onSubmit: (listName: string, shop: string, notes: string) => void;
  onCancel: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, onCancel }) => {
  const [listName, setListName] = React.useState("");
  const [shop, setShop] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(listName, shop, notes);
    setListName("");
    setShop("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1>CREATE NEW LIST</h1>
      <label htmlFor="listName" className="sr-only">
        List Name
      </label>
      <input
        type="text"
        id="listName"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
        required
      />
      <label htmlFor="shop" className="sr-only">
        Shop
      </label>
      <input
        required
        type="text"
        id="shop"
        placeholder="Shop"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <label htmlFor="notes" className="sr-only">
        Notes
      </label>
      <textarea
        id="notes"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2.5 mb-5 w-4/5 border border-t border-r border-b border-l border-solid border-stone-300 h-[100px]"
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
          Create List
        </button>
      </div>
    </form>
  );
};

export default function App() {
  const router = useRouter();
  const handleSubmit = (listName: string, shop: string, notes: string) => {
    console.log("List Name:", listName);
    console.log("Shop:", shop);
    console.log("Notes:", notes);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    // Handle cancel logic here
    router.push("/home");
    
  };

  return (
    <main>
      <ListForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </main>
  );
}