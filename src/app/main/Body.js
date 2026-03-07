"use client";
import React, { useEffect, useMemo, useState } from "react";
import AddToCardIcon from "../_icons/AddToCardIcon";
import FoodOrderModal from "@/components/FoodOrderModal";
import { api } from "@/lib/api";

const getCategoryId = (value) =>
  typeof value === "object" ? value?._id : value;

export default function MainPageBody({ cart, setCart }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get("/food-menu"),
          api.get("/products"),
        ]);

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Menu fetch error", error);
        setErrorMessage("Unable to load the menu right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const grouped = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        products: products.filter((p) => getCategoryId(p.category) === cat._id),
      })),
    [categories, products]
  );

  const visibleGroups = useMemo(() => {
    if (activeCategory === "all") {
      return grouped;
    }

    return grouped.filter((item) => item._id === activeCategory);
  }, [activeCategory, grouped]);

  return (
    <div
      id="menu"
      className="w-full px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        <section className="grid gap-4 rounded-[34px] border border-[#f0ddd0] bg-white/88 p-6 shadow-[0_24px_80px_rgba(133,89,58,0.12)] backdrop-blur lg:grid-cols-[1.4fr_0.9fr] lg:p-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#ef4444]">
              Today&apos;s picks
            </p>
            <h2 className="text-4xl leading-tight text-[#20150f] [font-family:var(--font-fraunces)]">
              Curated dishes with a fast checkout flow.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[#7a6252]">
              Browse each category, jump into a dish detail, and build your cart
              without leaving the page.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[24px] bg-[#fff5eb] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#9a6b4f]">
                Categories
              </p>
              <p className="mt-3 text-3xl text-[#20150f] [font-family:var(--font-fraunces)]">
                {categories.length}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#fff1f2] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#a75252]">
                Dishes
              </p>
              <p className="mt-3 text-3xl text-[#20150f] [font-family:var(--font-fraunces)]">
                {products.length}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#f8f5ff] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#6f5cab]">
                In cart
              </p>
              <p className="mt-3 text-3xl text-[#20150f] [font-family:var(--font-fraunces)]">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-3 text-sm font-semibold ${
              activeCategory === "all"
                ? "bg-[#20150f] text-white"
                : "border border-[#ecd9cb] bg-white/90 text-[#5a3622]"
            }`}
          >
            All dishes
          </button>
          {grouped.map((cat) => (
            <button
              key={cat._id}
              type="button"
              onClick={() => setActiveCategory(cat._id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                activeCategory === cat._id
                  ? "bg-[#ef4444] text-white shadow-[0_16px_30px_rgba(239,68,68,0.22)]"
                  : "border border-[#ecd9cb] bg-white/90 text-[#5a3622]"
              }`}
            >
              {cat.categoryName} ({cat.products.length})
            </button>
          ))}
        </div>

        {loading && (
          <div className="rounded-[30px] border border-[#ecd9cb] bg-white/88 p-10 text-center text-[#7a6252]">
            Loading menu...
          </div>
        )}

        {errorMessage && (
          <div className="rounded-[30px] border border-[#fecaca] bg-[#fff1f2] p-6 text-[#b42318]">
            {errorMessage}
          </div>
        )}

        {!loading &&
          !errorMessage &&
          visibleGroups.map((cat) => (
            <section key={cat._id} className="space-y-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-3xl text-[#20150f] [font-family:var(--font-fraunces)]">
                    {cat.categoryName}
                  </h3>
                  <p className="text-sm text-[#7a6252]">
                    {cat.products.length} dishes ready to add to cart.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {cat.products.map((item) => (
                  <article
                    key={item._id}
                    className="group overflow-hidden rounded-[32px] border border-[#f0ddd0] bg-white/94 shadow-[0_18px_45px_rgba(133,89,58,0.12)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image || "/food_placeholder.png"}
                        alt={item.name}
                        className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setShowModal(true);
                        }}
                        className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:-translate-y-0.5"
                      >
                        <AddToCardIcon />
                      </button>
                    </div>

                    <div className="space-y-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ef4444]">
                            Signature pick
                          </p>
                          <h4 className="mt-2 text-2xl text-[#20150f] [font-family:var(--font-fraunces)]">
                            {item.name}
                          </h4>
                        </div>
                        <span className="rounded-full bg-[#fff5eb] px-3 py-2 text-sm font-semibold text-[#9a5d1d]">
                          ${item.price}
                        </span>
                      </div>

                      <p className="text-sm leading-7 text-[#6f5a4b]">
                        {item.description || "Freshly prepared and ready to deliver."}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
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
