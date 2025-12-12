"use client";

import React, { useState } from "react";
import axios from "axios";

export default function CategoryModal({ onClose, onSuccess }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://food-delivery-back-1-cev0.onrender.com/food-menu",
      {
        categoryName,
      }
    );
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
