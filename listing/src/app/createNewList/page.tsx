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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="pl-2.5 mb-5 w-4/5 h-10 border border-t border-r border-b border-l border-solid border-stone-300"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2.5 mb-5 w-4/5 border border-t border-r border-b border-l border-solid border-stone-300 h-[100px]"
      />
      <button
        type="submit"
        className="w-4/5 h-10 cursor-pointer bg-zinc-800 border-[none] border-black border-opacity-0 text-[white] max-md:border-[initial]"
      >
        Create List
      </button>
    </form>
  );
}

export default MyComponent;