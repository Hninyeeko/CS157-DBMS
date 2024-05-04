"use client"

import * as React from "react";

interface Item {
  name: string;
  quantity: number;
  shop: string;
  notes: string;
}

interface TableRowProps {
  item: Item;
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
  return (
    <tr>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {item.name}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {item.quantity}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {item.shop}
      </td>
      <td className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
        {item.notes}
      </td>
    </tr>
  );
};

const MyComponent: React.FC = () => {
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
              Shop
            </th>
            <th className="p-2 text-center border border-t border-r border-b border-l border-solid border-neutral-200">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow key={index} item={item} />
          ))}
        </tbody>
      </table>
      <button className="px-6 py-3 mt-8 text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
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