"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function FoodModal({
  categories,
  selectedCategory, // 💥 ШИНЭ — тухайн category автоматаар сонгох
  onClose,
  onSuccess,
  editProduct = null,
}) {
  const [name, setName] = useState(editProduct?.name || "");
  const [description, setDescription] = useState(
    editProduct?.description || ""
  );
  const [price, setPrice] = useState(editProduct?.price || "");
  const [category, setCategory] = useState(
    editProduct?.category || selectedCategory || categories[0]?._id || ""
  );
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editProduct && selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory, editProduct]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-delivery");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbymx05ln/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Upload failed");

      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed: " + err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editProduct?.image || "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        category,
        image: imageUrl,
      };

      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, productData);
      } else {
        await api.post("/products", productData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-96 relative">
        <h2 className="text-2xl font-bold mb-6">
          {editProduct ? "Edit Product" : "Add New Product"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Saving..." : editProduct ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
