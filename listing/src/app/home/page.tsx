"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  openLinkInNewTab?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  openLinkInNewTab,
  onClick,
  type = 'button',
}) => (
  <button
    type={type}
    className={className}
    onClick={onClick}
    {...(openLinkInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
  >
    {children}
  </button>
);

const MyComponent: React.FC = () => {
  const router = useRouter();
  const handleCreateNewList = () => { router.push('/createNewList'); }
  const handleViewLists = () => { router.push('/viewLists'); }
  const handleViewShops = () => { router.push('/viewShops'); }
  const [searchTerm, setSearchTerm] = React.useState('');

 // Navigation functions
 const handleHomeNav = () => { router.push('/home'); }
 const handleAddItemNav = () => { router.push('/addItem'); }
 const handleAddReviewNav = () => { router.push('/addReview'); }
 const handleCreateNewListNav = () => { router.push('/createNewList'); }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="box-border flex relative flex-col shrink-0 self-stretch px-5 h-screen bg-[#ADD8E6] bg-center bg-no-repeat bg-cover grow-0 max-md:h-screen max-md:grow-0">
      <style jsx>{`
        .vertical-nav .nav-link {
          display: block;
          width: 100%;
        }
      `}</style>
      <Navbar expand="lg" className="bg-light">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column vertical-nav">
              <Nav.Link onClick={handleHomeNav}>Home</Nav.Link>
              <Nav.Link onClick={handleAddItemNav}>Add Item</Nav.Link>
              <Nav.Link onClick={handleAddReviewNav}>Add Review</Nav.Link>
              <Nav.Link onClick={handleCreateNewListNav}>Create New List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="box-border flex relative flex-col grow shrink-0 self-stretch px-5 mx-auto w-full h-screen bg-[#ADD8E6] bg-center bg-no-repeat bg-cover max-w-[1440px] max-md:h-screen max-md:grow-0">
        <div className="flex flex-col justify-start px-3 mx-auto mt-auto mb-16 w-full grow-0 z-[999] max-md:flex max-md:flex-col max-md:items-center max-md:m-auto max-md:h-auto max-md:grow-0 max-sm:flex max-sm:flex-col max-sm:mx-auto max-sm:mt-auto">
          <h1 className="text-xl font-bold text-center text-white leading-[120%]">Hello!</h1>
          <p className="mt-2 text-2xl font-light text-center text-white">
            You can create a new shopping list or search for existing lists you have created.
          </p>
          <div className="flex flex-row gap-4 mx-auto mt-9">
            <Button className="p-6 text-black bg-white rounded border border-white cursor-pointer" onClick={handleCreateNewList}>
              Create New List
            </Button>
            <Button className="p-6 rounded border-2 cursor-pointer bg-black bg-opacity-40 border-black text-white" onClick={handleViewLists}>
              View Lists
            </Button>
            <Button className="p-6 rounded border-2 cursor-pointer bg-black bg-opacity-40 border-black text-white" onClick={handleViewShops}>
              View Shops
            </Button>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex flex-row gap-2 mx-auto mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="flex-grow px-4 py-2 text-white bg-black bg-opacity-40 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button type="submit" className="px-4 py-2 text-white bg-black bg-opacity-60 rounded border border-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white">
              Search
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default MyComponent;
