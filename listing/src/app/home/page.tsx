"use client"

import * as React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  openLinkInNewTab?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  openLinkInNewTab,
  onClick,
  type = "button",
}) => (
  <button
    type={type}
    className={className}
    onClick={onClick}
    {...(openLinkInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
  >
    {children}
  </button>
);

const MyComponent: React.FC = () => {
  const router = useRouter();
  const handleCreateNewList = () => {router.push("/createNewList");}
  const handleViewLists = () => {router.push("/viewLists");}
  const handleViewShops = () => {router.push("/viewShops");}
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="box-border flex relative flex-col shrink-0 self-stretch px-5 h-screen bg-[#ADD8E6] bg-center bg-no-repeat bg-cover grow-0 max-md:h-screen max-md:grow-0">
      <section className="box-border flex relative flex-col grow shrink-0 self-stretch px-5 mx-auto w-full h-screen bg-[#ADD8E6] bg-center bg-no-repeat bg-cover max-w-[1440px] max-md:h-screen max-md:grow-0">
        <div className="flex flex-col justify-start px-3 mx-auto mt-auto mb-16 w-full grow-0 z-[999] max-md:flex max-md:flex-col max-md:items-center max-md:m-auto max-md:h-auto max-md:grow-0 max-sm:flex max-sm:flex-col max-sm:mx-auto max-sm:mt-auto">
          <div className="flex flex-col justify-start items-start self-stretch w-full max-w-full">
            <h1 className="self-stretch mx-auto w-auto max-w-full text-xl font-bold tracking-normal text-center text-white leading-[120%] max-md:self-stretch max-md:w-auto max-md:text-6xl max-md:text-center max-sm:text-6xl max-sm:leading-[100%]">
              Hello!
            </h1>
            <p className="self-stretch mt-2 w-full max-w-full text-2xl font-light tracking-normal text-center text-white max-md:text-center max-sm:text-base max-sm:tracking-wider">
              You can create a new shopping list or search for exisiting lists you have created.
            </p>
          </div>
          <div className="flex flex-row gap-4 self-center mx-auto mt-9 w-full max-w-[444px] max-md:justify-center max-md:items-center max-md:self-stretch max-md:mx-auto max-md:w-full">
            <Button className="box-border relative grow shrink-0 p-6 my-auto w-auto text-center text-black bg-white rounded border border-white border-solid appearance-none cursor-pointer"
              onClick={handleCreateNewList}>
              Create New List
            </Button>
            <Button className="box-border relative grow shrink-0 p-6 m-auto w-auto text-center rounded border-2 border-solid appearance-none cursor-pointer bg-black bg-opacity-40 border-[black] text-[white]"
              onClick={handleViewLists}>
              View Lists
            </Button>
            <Button className="box-border relative grow shrink-0 p-6 m-auto w-auto text-center rounded border-2 border-solid appearance-none cursor-pointer bg-black bg-opacity-40 border-[black] text-[white]"
              onClick={handleViewShops}>
              View Shops
            </Button>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default MyComponent;