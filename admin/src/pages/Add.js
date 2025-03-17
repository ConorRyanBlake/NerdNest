import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { backendURL } from "../App";
import "./Add.css";

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Shirt",
    price: "",
    bestseller: false,
    sizes: [],
    images: [null, null, null, null],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Categories and subcategories mapping wrapped in useMemo
  const categoryOptions = useMemo(
    () => ({
      Men: ["Shirt", "Pants", "Hoodie", "Jacket", "Shoes", "Accessories"],
      Women: ["Shirt", "Pants", "Dress", "Skirt", "Shoes", "Accessories"],
      Kids: ["Shirt", "Pants", "Onesie", "Shoes", "Toys"],
      Games: ["Board Games", "Video Games", "Card Games", "Outdoor Games"],
    }),
    []
  );

  // Update subcategories when category changes
  useEffect(() => {
    if (categoryOptions[formData.category]) {
      setFormData((prev) => ({
        ...prev,
        subCategory: categoryOptions[formData.category][0],
      }));
    }
  }, [formData.category, categoryOptions]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, file) => {
    const newImages = [...formData.images];
    newImages[index] = file;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) 
      newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (formData.sizes.length === 0)
      newErrors.sizes = "At least one size must be selected";
    if (!formData.images[0]) newErrors.images = "Primary image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("subCategory", formData.subCategory);
      submitData.append("price", formData.price);
      submitData.append("bestseller", formData.bestseller);
      submitData.append("sizes", JSON.stringify(formData.sizes));

      // Append images with their original names
      formData.images.forEach((image, index) => {
        if (image) submitData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(
        backendURL + "/product/add",
        submitData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: "",
          description: "",
          category: "Men",
          subCategory: "Shirt",
          price: "",
          bestseller: false,
          sizes: [],
          images: [null, null, null, null],
        });

        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setErrors({ submit: response.data.message });
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: error.message || "Failed to add product" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeholderImage = "https://placehold.co/600x400?text=Add Image";

  return (
    <div className="add-form-container">
      <h1 className="add-form-header">Add New Product</h1>

      {submitSuccess && (
        <div className="add-form-success-message">
          Product added successfully!
        </div>
      )}

      {errors.submit && (
        <div className="add-form-error-message">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit} className="add-form">
        <div className="add-form-section">
          <h2 className="add-form-section-title">Product Images</h2>
          <p className="add-form-helper-text">
            Upload up to 4 images (first image will be the main product image)
          </p>

          <div className="add-form-image-grid">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className={`add-form-image-container ${
                  index === 0 ? "primary" : ""
                }`}
              >
                <label
                  htmlFor={`image${index}`}
                  className="add-form-image-label"
                >
                  <img
                    src={!image ? placeholderImage : URL.createObjectURL(image)}
                    alt={`Product img ${index + 1}`}
                    className="add-form-image-preview"
                  />
                  <div className="add-form-image-overlay">
                    {index === 0 && (
                      <span className="add-form-primary-badge">Primary</span>
                    )}
                    <span className="add-form-image-text">
                      {!image ? "Upload Image" : "Change Image"}
                    </span>
                  </div>
                  <input
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                    type="file"
                    id={`image${index}`}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            ))}
          </div>
          {errors.images && <p className="add-form-error">{errors.images}</p>}
        </div>

        <div className="add-form-section">
          <h2 className="add-form-section-title">Product Details</h2>

          <div className="add-form-field">
            <label htmlFor="name" className="add-form-label">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              className={`add-form-input ${errors.name ? "error" : ""}`}
              onChange={handleInputChange}
              value={formData.name}
              type="text"
              placeholder="Enter product name"
            />
            {errors.name && <p className="add-form-error">{errors.name}</p>}
          </div>

          <div className="add-form-field">
            <label htmlFor="description" className="add-form-label">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              className={`add-form-textarea ${
                errors.description ? "error" : ""
              }`}
              onChange={handleInputChange}
              value={formData.description}
              placeholder="Describe your product"
              rows="5"
            />
            {errors.description && (
              <p className="add-form-error">{errors.description}</p>
            )}
          </div>

          <div className="add-form-row">
            <div className="add-form-field">
              <label htmlFor="category" className="add-form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="add-form-select"
                onChange={handleInputChange}
                value={formData.category}
              >
                {Object.keys(categoryOptions).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-form-field">
              <label htmlFor="subCategory" className="add-form-label">
                Sub-Category
              </label>
              <select
                id="subCategory"
                name="subCategory"
                className="add-form-select"
                onChange={handleInputChange}
                value={formData.subCategory}
              >
                {categoryOptions[formData.category]?.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-form-field">
              <label htmlFor="price" className="add-form-label">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                className={`add-form-input ${errors.price ? "error" : ""}`}
                onChange={handleInputChange}
                value={formData.price}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
              />
              {errors.price && <p className="add-form-error">{errors.price}</p>}
            </div>
          </div>
        </div>

        <div className="add-form-section">
          <h2 className="add-form-section-title">Product Options</h2>

          <div className="add-form-field">
            <label className="add-form-label">Available Sizes</label>
            <div className="add-form-sizes">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`add-form-size ${
                    formData.sizes.includes(size) ? "selected" : ""
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  <p>{size}</p>
                </div>
              ))}
            </div>
            {errors.sizes && <p className="add-form-error">{errors.sizes}</p>}
          </div>

          <div className="add-form-field">
            <div className="add-form-checkbox">
              <input
                id="bestseller"
                name="bestseller"
                type="checkbox"
                checked={formData.bestseller}
                onChange={handleInputChange}
              />
              <label htmlFor="bestseller" className="add-form-checkbox-label">
                Feature as bestseller product
              </label>
            </div>
          </div>
        </div>

        <div className="add-form-actions">
          <button
            className="add-form-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
