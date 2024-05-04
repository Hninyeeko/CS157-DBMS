"use client"

import * as React from "react";

function MyComponent() {
  const [listName, setListName] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`List Name: ${listName}`);
    console.log(`Notes: ${notes}`);
    setListName("");
    setNotes("");
  };

  const handleCancel = () => {
    setListName("");
    setNotes("");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">CREATE NEW LIST</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <input
          type="text"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300 text-black"
          required
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-2.5 mb-5 w-4/5 border border-t border-r border-b border-l border-solid border-stone-300 h-[100px] text-black"
        />
        <div className="flex justify-between w-4/5">
          <button
            type="button"
            onClick={handleCancel}
            className="w-[48%] h-10 cursor-pointer bg-gray-300 border-[none] border-black border-opacity-0 text-black max-md:border-[initial] hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[48%] h-10 cursor-pointer bg-zinc-800 border-[none] border-black border-opacity-0 text-[white] max-md:border-[initial] hover:bg-zinc-700 transition-colors duration-200"
          >
            Create List
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyComponent;