"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

const Home = () => {
  const [productForm, setProductForm] = useState({});
  const [stocks, setStocks] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  // Sample stock data
  // const [stockData, setStockData] = useState([
  //   { id: 1, productName: "Product 1", quantity: 10, price: "$46" },
  //   { id: 2, productName: "Product 2", quantity: 15, price: "$46" },
  // ]);

  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch("/api/product");
      response = await response.json();
      setStocks(response.stocks);
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (res) {
        // console.log("Product added successfully");
        setAlert("Your Product is added Successfully");
        setTimeout(() => {
          setAlert("");
        }, 2000);
        setProductForm({});
      } else {
        console.log("Error in adding Product");
      }
    } catch (e) {
      console.error("Error", e);
    }
    //Fetch the product for live update
    let response = await fetch("/api/product");
    response = await response.json();
    setStocks(response.stocks);
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropDown = async (e) => {
    let val = e.target.value;
    setQuery(val);
    if (val > 3) {
      setLoading(true);
      let response = await fetch("/api/search?query=" + query);
      response = await response.json();
      setDropdown(response.stocks);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };

  const buttonFunction = async (action, slug, initial) => {
    // console.log(action, slug);
    // Immediatly change the quantity of the slug
    let index = stocks.findIndex((item) => item.slug == slug);
    let newStocks = JSON.parse(JSON.stringify(stocks));
    if (action == "plus") {
      newStocks[index].quantity = parseInt(initial) + 1;
    } else {
      newStocks[index].quantity = parseInt(initial) - 1;
    }
    setStocks(newStocks);
    setLoadingAction(true);

    //Dropdown quantity update'
    let indexdrop = dropdown.findIndex((item) => item.slug == slug);
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initial) + 1;
    } else {
      newDropdown[indexdrop].quantity = parseInt(initial) - 1;
    }
    setDropdown(newDropdown);

    setLoadingAction(true);
    let res = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initial }),
    });
    // res = res.json();
    // console.log(res);
    setLoadingAction(false);
  };

  return (
    <>
      <div className="text-green-600 text-center">{alert}</div>
      <div className="container mx-auto my-6 w-[90vw]">
        {/* Search Products */}
        <h1 className="text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mt-4">
          <input
            // onBlur={() => {
            //   setDropdown([]);
            // }}
            type="text"
            placeholder="Enter search term"
            onChange={onDropDown}
            className="p-2 border border-gray-300 rounded-l-md w-3/4 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <select className="border border-gray-300 rounded-r-md w-1/4 p-2">
            <option value="">All</option>
            <option value="productName">Product Name</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        {loading && (
          <div className="flex justify-center w-ful items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 40 40"
            >
              <circle cx="10" cy="10" r="6" fill="black">
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="1s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="30" cy="10" r="6" fill="black">
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="1s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50" cy="10" r="6" fill="black">
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0"
                  dur="1s"
                  begin="0.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        )}
        <div className="dropcontainer absolute w-[67vw]  rounded-md  bg-blue-100">
          {dropdown.map((item) => (
            <div
              key={item.slug}
              className="flex justify-between px-1 my-1 border-b"
            >
              <span className="slug">
                {item.slug} ({item.quantity} available for ₹{item.price})
              </span>
              <div className="mx-5">
                <button
                  onClick={() => {
                    buttonFunction("minus", item.slug, item.quantity);
                  }}
                  disabled={loadingAction}
                  className="minus inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md cursor-pointer disabled:bg-blue-300"
                >
                  -
                </button>
                <span className="quantity inline-block w-8 mx-3">
                  {item.quantity}
                </span>
                <button
                  onClick={() => {
                    buttonFunction("plus", item.slug, item.quantity);
                  }}
                  disabled={loadingAction}
                  className="add inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md cursor-pointer disabled:bg-blue-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Products  */}
        <h1 className="text-3xl font-semibold my-6">Add a Product</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Slug
            </label>
            <input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
              type="text"
              id="productName"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              value={productForm?.quantity || ""}
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              value={productForm?.price || ""}
              type="text"
              id="price"
              name="price"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
            onClick={addProduct}
          >
            Add Product
          </button>
        </form>

        {/* Display Products  */}
        <h1 className="text-3xl font-semibold my-6">Current Stocks</h1>
        <table className="table-auto border-collapse w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item, i) => (
              <tr key={item.slug} className="bg-white">
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{item.slug}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-center">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
