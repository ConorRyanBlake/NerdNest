import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import "./Add.css";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Shirt");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendURL + "/product/add", formData, {
        headers: { token },
      });
      if (response.data.success) {
        alert("Product added successfully");
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="add-form">
      <div onSubmit={onSubmitHandler}>
        <div className="add-form-image-section">
          <p className="add-form-title">Upload Image</p>

          <div>
            <label htmlFor="image1" className="add-form-image-label">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="upload-icon"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2" className="add-form-image-label">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="upload-icon"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3" className="add-form-image-label">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="upload-icon"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4" className="add-form-image-label">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="upload-icon"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div>
          <p className="add-form-title">Product Name</p>
          <input
            className="add-form-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Type Here"
            required
          />
        </div>

        <div>
          <p className="add-form-title">Product Description</p>
          <textarea 
            className="add-form-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Type Here"
            required
          />
        </div>

        <div className="info">
          <div>
            <p className="add-form-title">Category</p>
            <select className="add-form-select" onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="add-form-title">SubCategory</p>
            <select className="add-form-select" onChange={(e) => setSubCategory(e.target.value)}>
              <option value="Shirt">Shirt</option>
              <option value="Pants">Pants</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>

          <div>
            <p className="add-form-title">Price</p>
            <input
              className="add-form-input"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="Number"
              placeholder="25"
            />
          </div>
        </div>

        <div>
          <p className="add-form-title">Product Sizes</p>
          <div className="add-form-sizes">
        {["S", "M", "L"].map((size) => (
          <div
            key={size}
            className={`add-form-size ${sizes.includes(size) ? "selected" : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size)
                  ? prev.filter((item) => item !== size)
                  : [...prev, size]
              )
            }
          >
            <p>{size}</p>
          </div>
        ))}
      </div>
        </div>

        <div>
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button className="add-form-button" type="submit">ADD</button>
      </div>
    </div>
  );
};

export default Add;
