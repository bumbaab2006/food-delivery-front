"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToCardIcon from "../_icons/AddToCardIcon";
import FoodOrderModal from "@/components/FoodOrderModal";

export default function MainPageBody({ cart, setCart }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchCategories = () => {
    axios
      .get("https://food-delivery-back-1-cev0.onrender.com/food-menu")
      .then((res) => {
        setCategories(res.data);
      });
  };

  const fetchProducts = () => {
    axios
      .get("https://food-delivery-back-1-cev0.onrender.com/products")
      .then((res) => {
        setProducts(res.data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const grouped = categories.map((cat) => ({
    ...cat,
    products: products.filter((p) => p.category === cat._id),
  }));

  return (
    <div className="min-h-screen w-full bg-[#3C3C3C] p-12">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {grouped.map((cat) => (
          <div key={cat._id} className="space-y-8">
            <h2 className="text-white text-3xl font-semibold tracking-wide">
              {cat.categoryName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
              {cat.products.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col p-6 gap-3 bg-white rounded-3xl border border-gray-200 shadow-lg relative"
                >
                  <div className="relative w-full">
                    <img
                      src={item.image || "/food_placeholder.png"}
                      alt={item.name}
                      className="w-full h-[220px] object-cover rounded-t-3xl"
                    />
                    <button
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowModal(true);
                      }}
                      className="absolute bottom-5 right-5 w-[33px] h-[33px] bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
                    >
                      <AddToCardIcon />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-red-500 text-[26px] font-bold">
                        {item.name}
                      </h3>
                      <span className="text-[22px] font-semibold text-gray-900">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <FoodOrderModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
}
