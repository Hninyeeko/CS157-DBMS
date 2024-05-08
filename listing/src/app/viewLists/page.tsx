"use client"

import * as React from "react";
import { useRouter } from "next/navigation"

interface ListItemProps {
  name: string;
  shop: string;
  notes: string;
}

function ListItem({ name, shop, notes }: ListItemProps) {

  const router = useRouter();

  const handleView = () => {
    console.log("Open List");
    // Handle View logic here
    router.push("/listTemplate");
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
  const lists = [
    {
      name: "List Name 1",
      shop: "Shop Name 1",
      notes: "List Notes 1",
    },
    {
      name: "List Name 2",
      shop: "Shop Name 2",
      notes: "List Notes 2",
    },
    {
      name: "List Name 3",
      shop: "Shop Name 3",
      notes: "List Notes 3",
    },
  ];

  return (
    <div>
      <h2>VIEW YOUR LISTS</h2>
      {lists.map((list, index) => (
        <ListItem
          key={index}
          name={list.name}
          shop={list.shop}
          notes={list.notes}
        />
      ))}
    </div>
  );
}

export default MyComponent;