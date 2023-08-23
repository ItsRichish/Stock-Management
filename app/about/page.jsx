import React from "react";

const About = () => {
  return (
    <div className="container mx-auto my-6 w-[90vw]">
      <h1 className="text-3xl font-semibold mb-6">Stock Management System</h1>
      <p className="text-gray-700 w-[80vw] mb-6">
        Welcome to the Stock Management System! This project is designed to help
        businesses efficiently manage their inventory and stock levels, ensuring
        smooth operations and better control over their products.
      </p>
      <h1 className="text-xl font-semibold mb-2">About the Project</h1>
      <p className="text-gray-700 w-[80vw] mb-6">
        Managing inventory is a critical aspect of any business, and this
        open-source Stock Management System aims to simplify the process.
        Whether you run a small retail store, a warehouse, or a larger
        enterprise, this system provides essential tools to keep track of your
        products, monitor stock levels, and make informed decisions.
      </p>
      <h1 className="text-xl font-semibold  mb-2">Key Features</h1>
      <ul className="text-gray-700 w-[80vw] mb-6 list-disc">
        <li>
          <strong>Inventory Management:</strong> Easily add, update, and remove
          products from your inventory.
        </li>
        <li>
          <strong>Stock Tracking: </strong> Keep real-time records of stock
          levels for each product.
        </li>
        <li>
          <strong>Sales Management:</strong> Record and manage sales
          transactions.
        </li>
        <li typeof>
          <strong>User-Friendly Interface: </strong> An intuitive and responsive
          web-based interface for easy navigation.
        </li>
      </ul>
      <h1 className="text-xl font-semibold  mb-2">Getting Started</h1>
      To get started with the Stock Management System, follow these steps:
      <ul className="text-gray-700 w-[80vw] mb-6 list-decimal">
        <li>
          <strong>Clone the Repository: </strong> Clone this repository to your
          local environment.
        </li>
        <li>
          <strong>Set Up the Database: </strong> Configure and set up your
          database to store product and sales data.
        </li>
        <li>
          <strong>Install Dependencies: </strong> Install the required
          dependencies by following the installation instructions in the
          project's README.
        </li>
        <li>
          <strong>Run the Application: </strong> Start the application locally
          and begin managing your inventory.
        </li>
      </ul>
    </div>
  );
};

export default About;
