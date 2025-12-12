"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FoodModal from "@/components/FoodModal";
import CategoryModal from "@/components/CategoryModal";
import { Pencil, Trash } from "lucide-react";
import RedAddIcon from "../_icons/redAddIcon";

export default function FoodMenu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categoryRefs = useRef({});

  const fetchCategories = () => {
    axios
      .get("http://localhost:999/food-menu")
      .then((res) => setCategories(res.data))
      .catch(console.log);
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:999/products")
      .then((res) => setProducts(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const grouped = categories.map((cat) => ({
    ...cat,
    products: products.filter((p) => p.category === cat._id),
  }));

  const scrollToCategory = (id) => {
    categoryRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = (id) => setDeleteConfirm(id);

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:999/products/${deleteConfirm}`)
      .then(() => {
        fetchProducts();
        setDeleteConfirm(null);
      })
      .catch(console.log);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-10">
      <div className="mx-auto max-w-[1600px]">
        {/* CATEGORY TOOLBAR */}
        <div className="bg-white p-8 rounded-xl shadow mb-10">
          <h1 className="text-2xl font-semibold mb-6">Dishes Categories</h1>

          <div className="flex flex-wrap items-center gap-4">
            {grouped.map((cat) => (
              <button
                key={cat._id}
                onClick={() => scrollToCategory(cat._id)}
                className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-300 rounded-full hover:border-gray-500 transition text-base"
              >
                {cat.categoryName}
                <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  {cat.products.length}
                </span>
              </button>
            ))}

            <RedAddIcon
              className="w-11 h-11 cursor-pointer"
              onClick={() => setShowCategoryModal(true)}
            />
          </div>
        </div>

        {/* CATEGORY SECTIONS */}
        {grouped.map((cat) => (
          <div
            key={cat._id}
            ref={(el) => (categoryRefs.current[cat._id] = el)}
            className="bg-white p-8 rounded-xl shadow mb-14"
          >
            <h2 className="text-2xl font-semibold mb-8">
              {cat.categoryName} ({cat.products.length})
            </h2>

            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {/* Add Product */}
              <div
                className="flex flex-col justify-center items-center p-10 border-2 border-dashed border-red-400 rounded-xl cursor-pointer hover:bg-red-50 transition"
                onClick={() => {
                  setEditProduct(null);
                  setShowProductModal(true);
                }}
              >
                <RedAddIcon className="w-12 h-12" />
                <p className="text-base text-gray-600 mt-3 text-center">
                  Add new dish to <br /> {cat.categoryName}
                </p>
              </div>

              {/* Product Cards */}
              {cat.products.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl border bg-white shadow hover:shadow-xl transition relative"
                >
                  <img
                    src={product.image || "/food_placeholder.png"}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
                      onClick={() => {
                        setEditProduct(product);
                        setShowProductModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4 text-red-500" />
                    </button>

                    <button
                      className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <span className="font-semibold text-lg">
                        ${product.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {showProductModal && (
        <FoodModal
          categories={categories}
          onClose={() => setShowProductModal(false)}
          onSuccess={fetchProducts}
          editProduct={editProduct}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSuccess={fetchCategories}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96 text-center">
            <h3 className="font-bold text-xl">Delete Product?</h3>
            <p className="text-gray-600 mt-4">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-md"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="px-6 py-2 bg-gray-300 rounded-md"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
