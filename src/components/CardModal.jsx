"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Clock3, MapPin, PackageCheck } from "lucide-react";
import { api } from "@/lib/api";

export default function CartModal({
  open,
  onOpenChange,
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  user,
  deliveryLocation,
  setDeliveryLocation,
  savedLocations = [],
  onSaveLocation,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  const itemsTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0.99;
  const total = itemsTotal + shipping;

  useEffect(() => {
    if (!open || activeTab !== "orders" || !user?.id) {
      return;
    }

    let cancelled = false;

    const loadOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError("");

        const response = await api.get("/order-foods", {
          params: { userId: user.id },
        });

        if (!cancelled) {
          setOrders(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          setOrdersError("Захиалгын түүхийг ачаалж чадсангүй.");
        }
      } finally {
        if (!cancelled) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [activeTab, open, user]);

  const currentOrders = useMemo(
    () => orders.filter((item) => item.orderStatus === "pending"),
    [orders]
  );

  const previousOrders = useMemo(
    () =>
      orders.filter((item) =>
        ["delivered", "cancelled", "canceled"].includes(item.orderStatus)
      ),
    [orders]
  );

  const formatStatus = (status) => {
    if (status === "pending") return "Явж байна";
    if (status === "delivered") return "Хүргэгдсэн";
    return "Цуцлагдсан";
  };

  const formatDate = (value) =>
    new Intl.DateTimeFormat("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[420px] overflow-y-auto border-l border-[#3b2920] bg-[#20150f] p-6 text-white"
      >
        <SheetHeader className="flex flex-row justify-between items-center mb-4">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            Order detail
          </SheetTitle>
        </SheetHeader>

        <div className="mb-6 flex rounded-full bg-white/8 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`w-1/2 rounded-full py-2 text-center text-sm font-medium ${
              activeTab === "cart"
                ? "bg-[#ef4444] text-white"
                : "text-white/62"
            }`}
          >
            Cart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`w-1/2 rounded-full py-2 text-center text-sm font-medium ${
              activeTab === "orders"
                ? "bg-[#ef4444] text-white"
                : "text-white/62"
            }`}
          >
            Order
          </button>
        </div>

        {activeTab === "cart" ? (
          <>
            <h3 className="mb-3 text-lg font-semibold">My cart</h3>

            {cart.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/12 bg-white/4 p-6 text-center text-white/62">
                Сагс хоосон байна. Хоол сонгоод буцаад орж ирээрэй.
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 rounded-[24px] border border-white/8 bg-white/6 p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-[#ffd2b0]">
                        {item.name}
                      </p>
                      <p className="text-sm text-white/62">
                        {item.description}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => onDecrease(item._id)}
                          className="rounded-full bg-white/8 px-2 py-1"
                        >
                          –
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onIncrease(item._id)}
                          className="rounded-full bg-white/8 px-2 py-1"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(item._id)}
                          className="ml-auto text-xs text-[#fda4af]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#fb923c]" />
                <h3 className="font-semibold">Delivery location</h3>
              </div>

              <input
                type="text"
                placeholder="Жишээ: ХУД, 15-р хороо, Japan Town, 3-р байр"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/36"
              />

              <p className="text-xs leading-5 text-white/55">
                Дэлгэрэнгүй хаяг оруулбал хүргэлт илүү хурдан, зөв очно.
              </p>

              {savedLocations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    Saved locations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {savedLocations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => setDeliveryLocation(location)}
                        className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-left text-xs text-white/82 hover:bg-white/14"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => onSaveLocation(deliveryLocation)}
                className="rounded-full border border-[#fb923c]/35 bg-[#fb923c]/10 px-4 py-2 text-sm font-medium text-[#ffd2b0]"
              >
                Энэ хаягийг хадгалах
              </button>
            </div>

            <div className="mt-8 rounded-[28px] bg-white/8 p-4 text-sm">
              <h3 className="mb-4 text-lg font-semibold">Payment info</h3>

              <div className="mb-2 flex justify-between">
                <span>Items</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>

              <div className="mb-2 flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr className="my-3 border-gray-700" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  if (!deliveryLocation) {
                    alert("Please enter a delivery location.");
                    return;
                  }
                  onCheckout(deliveryLocation);
                }}
                disabled={cart.length === 0}
                className="mt-4 w-full rounded-2xl bg-[#ef4444] py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-white/15"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/8 bg-white/6 p-4">
              <p className="text-sm text-white/62">
                Энэ хэсэгт тухайн хэрэглэгчийн одоо явж байгаа болон өмнөх
                захиалгууд харагдана.
              </p>
            </div>

            {!user ? (
              <div className="rounded-[24px] border border-dashed border-white/12 bg-white/4 p-6 text-center">
                <p className="text-sm text-white/68">
                  Захиалгын түүх харахын тулд эхлээд нэвтэрнэ үү.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    router.push("/login");
                  }}
                  className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#20150f]"
                >
                  Log in
                </button>
              </div>
            ) : ordersLoading ? (
              <div className="rounded-[24px] border border-white/8 bg-white/4 p-6 text-sm text-white/62">
                Захиалгын түүх ачаалж байна...
              </div>
            ) : ordersError ? (
              <div className="rounded-[24px] border border-[#7f1d1d] bg-[#3b0f12] p-4 text-sm text-[#fecaca]">
                {ordersError}
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/12 bg-white/4 p-6 text-center text-white/62">
                Одоогоор захиалгын түүх алга байна.
              </div>
            ) : (
              <>
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#fb923c]" />
                    <h3 className="font-semibold">Одоо явж буй захиалга</h3>
                  </div>

                  {currentOrders.length === 0 ? (
                    <div className="rounded-[24px] bg-white/4 p-4 text-sm text-white/55">
                      Одоогоор pending захиалга алга.
                    </div>
                  ) : (
                    currentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-[24px] border border-white/8 bg-white/6 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#ffd2b0]">
                              {formatDate(order.orderedAt)}
                            </p>
                            <p className="mt-2 text-lg font-semibold">
                              ${order.totalPrice.toFixed(2)}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#fb923c]/18 px-3 py-1 text-xs font-semibold text-[#ffd2b0]">
                            {formatStatus(order.orderStatus)}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-sm text-white/72">
                          {order.foodItems.map((item) => (
                            <p key={`${order._id}-${item.foodId}`}>
                              {item.name} x {item.quantity}
                            </p>
                          ))}
                        </div>

                        <div className="mt-4 flex items-start gap-2 text-xs text-white/55">
                          <MapPin className="mt-0.5 h-3.5 w-3.5" />
                          <span>{order.deliveryLocation}</span>
                        </div>
                      </div>
                    ))
                  )}
                </section>

                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="h-4 w-4 text-[#86efac]" />
                    <h3 className="font-semibold">Өмнөх захиалгууд</h3>
                  </div>

                  {previousOrders.length === 0 ? (
                    <div className="rounded-[24px] bg-white/4 p-4 text-sm text-white/55">
                      Өмнөх completed/cancelled захиалга алга.
                    </div>
                  ) : (
                    previousOrders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-[24px] border border-white/8 bg-white/6 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                              {formatDate(order.orderedAt)}
                            </p>
                            <p className="mt-2 text-base font-semibold">
                              ${order.totalPrice.toFixed(2)}
                            </p>
                          </div>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
                            {formatStatus(order.orderStatus)}
                          </span>
                        </div>

                        <p className="mt-3 text-sm text-white/68">
                          {order.foodItems
                            .map((item) => `${item.name} x ${item.quantity}`)
                            .join(", ")}
                        </p>
                      </div>
                    ))
                  )}
                </section>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
