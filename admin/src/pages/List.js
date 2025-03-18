import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../App";
import "./List.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + "/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendURL + "/product/remove", {
        headers: { token },
        data: { id },
      });
      if (response.data.success) {
        alert(response.data.message);
        await fetchList();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <div className="list-container">
        <p>All product List</p>
        <div className="table">
          {/* List Table Title */}

          <div className="table-title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {/* Product List */}

          {list.map((product) => (
            <div className="product-row" key={product._id}>
              <img src={product.images[0]} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>R{product.price}</p>
              <button onClick={() => removeProduct(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
