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
    <div className="app-container">
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f9;
          color: #333;
        }
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
        }
        .navbar {
          background-color: #ffffff70; // Light background with opacity
          padding: 0.5rem 1rem;
        }
        .nav-link {
          color: #083D77;
          font-size: 1.1rem;
          font-weight: bold;
          transition: color 0.3s ease-in-out;
        }
        .nav-link:hover {
          color: #DA4167;
          text-decoration: none;
        }
        .section-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }
        .button {
          padding: 0.8rem 2rem;
          margin: 0.3rem;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          color: white;
          background-color: #083D77;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s, transform 0.2s;
        }
        .button:hover {
          background-color: #DA4167;
          transform: translateY(-2px);
        }
        .search-box {
          display: flex;
          border-radius: 25px;
          overflow: hidden;
        }
        .search-input {
          flex-grow: 1;
          border: 2px solid #ccc;
          padding: 0.8rem;
          font-size: 1rem;
          color: #333;
          outline: none;
        }
        .search-button {
          background-color: #083D77;
          color: white;
          padding: 0.8rem 1.2rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .search-button:hover {
          background-color: #DA4167;
        }
      `}</style>
      <Navbar expand="lg" className="navbar">
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
      <section className="section-content">
        <h1 className="text-xl font-bold text-white leading-[120%]">Hello!</h1>
        <p className="mt-2 text-2xl font-light text-white">
          You can create a new shopping list or search for existing lists you have created.
        </p>
        <div className="flex flex-row gap-4 mx-auto mt-9">
          <Button className="button" onClick={handleCreateNewList}>
            Create New List
          </Button>
          <Button className="button" onClick={handleViewLists}>
            View Lists
          </Button>
          <Button className="button" onClick={handleViewShops}>
            View Shops
          </Button>
        </div>
        <form onSubmit={handleSearchSubmit} className="search-box mt-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
          />
          <Button type="submit" className="search-button">
            Search
          </Button>
        </form>
      </section>
    </div>
  );
};

export default MyComponent;

