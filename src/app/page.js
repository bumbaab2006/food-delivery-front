import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signup");
}
// "use client";
// import { useEffect, useState } from "react";
// import MainPageBody from "./Body";
// import Header from "./Header";

// export default function MainPage() {
//   const [cart, setCart] = useState([]);

//   return (
//     <div className="flex w-full flex-col items-center bg-[#404040]">
//       <Header cart={cart} setCart={setCart} />
//       <MainPageBody cart={cart} setCart={setCart} />
//     </div>
//   );
// }
// import { useState } from "react";
// import Logo from "../_icons/logo";
// import LocationIcon from "../_icons/LocationIcon";
// import ShoppingIcon from "../_icons/ShoppingIcon";
// import UserIcon from "../_icons/UserIcon";
// import AddresRightChevronIcon from "../_icons/AddresRightChevronIcon";
// import CartModal from "@/components/CardModal";
// import axios from "axios";

// export default function Header({ cart, setCart }) {
//   const [showCart, setShowCart] = useState(false);

//   // Increase quantity
//   const increaseQty = (id) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Decrease quantity
//   const decreaseQty = (id) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // Remove item
//   const removeItem = (id) => {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//   };

//   // Confirm Order + Delivery Location → DB
//   const confirmOrder = async (deliveryLocation) => {
//     try {
//       const totalPrice = cart.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       );

//       await axios.post("http://localhost:999/order-foods", {
//         foodItems: cart.map((i) => ({
//           foodId: i._id,
//           name: i.name,
//           quantity: i.quantity,
//           price: i.price,
//         })),
//         totalPrice,
//         deliveryLocation,
//       });

//       alert("Order saved successfully!");
//       setCart([]);
//       setShowCart(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save order");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full">
//       <header className="flex items-center justify-between w-full h-16 px-20 bg-black">
//         <Logo />

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-white">
//             <LocationIcon />
//             <p className="text-red-500 text-xs font-medium leading-4">
//               Delivery address:
//             </p>
//             <p className="text-gray-500 text-xs font-normal leading-4">
//               Add Location
//             </p>
//             <AddresRightChevronIcon />
//           </button>

//           {/* CART BUTTON */}
//           <button
//             className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
//             onClick={() => setShowCart(true)}
//           >
//             <ShoppingIcon className="w-5 h-5" />
//           </button>

//           {/* USER BUTTON */}
//           <button className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition">
//             <UserIcon className="w-5 h-5 text-white" />
//           </button>
//         </div>
//       </header>

//       <div
//         className="w-full h-[900px] bg-cover bg-center"
//         style={{ backgroundImage: "url('/mainPageHeaderImage.png')" }}
//       ></div>

//       <CartModal
//         open={showCart}
//         onOpenChange={setShowCart}
//         cart={cart}
//         onIncrease={increaseQty}
//         onDecrease={decreaseQty}
//         onRemove={removeItem}
//         onCheckout={confirmOrder}
//       />
//     </div>
//   );
// }
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddToCardIcon from "../_icons/AddToCardIcon";
// import FoodOrderModal from "@/components/FoodOrderModal";

// export default function MainPageBody({ cart, setCart }) {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchCategories = () => {
//     axios.get("http://localhost:999/food-menu").then((res) => {
//       setCategories(res.data);
//     });
//   };

//   const fetchProducts = () => {
//     axios.get("http://localhost:999/products").then((res) => {
//       setProducts(res.data);
//     });
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const grouped = categories.map((cat) => ({
//     ...cat,
//     products: products.filter((p) => p.category === cat._id),
//   }));

//   return (
//     <div className="min-h-screen w-full bg-[#3C3C3C] p-12">
//       <div className="max-w-[1600px] mx-auto space-y-20">
//         {grouped.map((cat) => (
//           <div key={cat._id} className="space-y-8">
//             <h2 className="text-white text-3xl font-semibold tracking-wide">
//               {cat.categoryName}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
//               {cat.products.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex flex-col p-6 gap-3 bg-white rounded-3xl border border-gray-200 shadow-lg relative"
//                 >
//                   <div className="relative w-full">
//                     <img
//                       src={item.image || "/food_placeholder.png"}
//                       alt={item.name}
//                       className="w-full h-[220px] object-cover rounded-t-3xl"
//                     />
//                     <button
//                       onClick={() => {
//                         setSelectedProduct(item);
//                         setShowModal(true);
//                       }}
//                       className="absolute bottom-5 right-5 w-[33px] h-[33px] bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
//                     >
//                       <AddToCardIcon />
//                     </button>
//                   </div>

//                   <div className="flex flex-col gap-1 px-2">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-red-500 text-[26px] font-bold">
//                         {item.name}
//                       </h3>
//                       <span className="text-[22px] font-semibold text-gray-900">
//                         ${item.price}
//                       </span>
//                     </div>
//                     <p className="text-gray-700 text-lg leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && selectedProduct && (
//         <FoodOrderModal
//           product={selectedProduct}
//           onClose={() => setShowModal(false)}
//           cart={cart}
//           setCart={setCart}
//         />
//       )}
//     </div>
//   );
// }
