"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../_icons/logo";
import CartModal from "@/components/CardModal";
import {
  ArrowRight,
  LogOut,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  clearAuthSession,
  getCurrentUserFromStorage,
  getStoredRole,
} from "@/lib/auth";

const stats = [
  { label: "Restaurants", value: "25+" },
  { label: "Avg. delivery", value: "28 min" },
  { label: "Signature dishes", value: "120+" },
];

export default function Header({ cart, setCart }) {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setUser(getCurrentUserFromStorage());
      setRole(getStoredRole());
      setDeliveryLocation(localStorage.getItem("nomnom-delivery-location") || "");

      try {
        const storedLocations = JSON.parse(
          localStorage.getItem("nomnom-saved-locations") || "[]"
        );
        setSavedLocations(
          Array.isArray(storedLocations) ? storedLocations.slice(0, 5) : []
        );
      } catch (_error) {
        setSavedLocations([]);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    localStorage.setItem("nomnom-delivery-location", deliveryLocation);
  }, [deliveryLocation]);

  useEffect(() => {
    localStorage.setItem(
      "nomnom-saved-locations",
      JSON.stringify(savedLocations.slice(0, 5))
    );
  }, [savedLocations]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const saveLocation = (location) => {
    const normalizedLocation = location.trim();

    if (!normalizedLocation) {
      return;
    }

    setDeliveryLocation(normalizedLocation);
    setSavedLocations((prev) => [
      normalizedLocation,
      ...prev.filter((item) => item !== normalizedLocation),
    ]);
  };

  const confirmOrder = async (location) => {
    if (!user?.id) {
      alert("Please log in before checking out.");
      router.push("/login");
      return;
    }

    if (!location) {
      alert("Please enter a delivery address.");
      return;
    }

    try {
      const normalizedLocation = location.trim();
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await api.post("/order-foods", {
        user: {
          id: user.id,
          email: user.email,
        },
        foodItems: cart.map((i) => ({
          foodId: i._id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
        })),
        totalPrice,
        deliveryLocation: normalizedLocation,
      });

      saveLocation(normalizedLocation);
      alert("Order saved successfully.");
      setCart([]);
      setShowCart(false);
    } catch (err) {
      console.error("Order Save Error:", err);
      alert("Failed to save order");
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  const handlePrimaryAction = () => {
    if (!user) {
      router.push("/signup");
      return;
    }

    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#20150f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.28),transparent_28%),radial-gradient(circle_at_right,rgba(239,68,68,0.24),transparent_26%)]" />
      <div className="absolute left-[-8rem] top-8 h-56 w-56 rounded-full bg-[#fb923c]/20 blur-3xl" />
      <div className="absolute right-[-5rem] top-32 h-60 w-60 rounded-full bg-[#ef4444]/18 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col px-4 pb-[4.5rem] pt-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <p className="text-lg font-semibold">NomNom</p>
              <p className="text-xs uppercase tracking-[0.32em] text-white/60">
                Swift delivery
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <button
              type="button"
              onClick={() => setShowCart(true)}
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/16"
            >
              <MapPin className="h-4 w-4 text-[#fb923c]" />
              <span>{deliveryLocation || "Add your delivery address"}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                className="relative inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/16"
                onClick={() => setShowCart(true)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-3 rounded-full bg-[#ef4444] px-2 py-0.5 text-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {role === "admin" && (
                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#fda36a]/40 bg-[#f97316]/18 px-4 text-sm font-semibold text-white hover:bg-[#f97316]/24"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </button>
              )}

              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#20150f] hover:-translate-y-0.5"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#20150f] hover:-translate-y-0.5"
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  Log in
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_520px]">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#ffd2b0]">
              Fast, warm, reliable
            </div>

            <div className="space-y-5">
              <h1 className="max-w-[12ch] text-5xl leading-none text-[#fff7f0] [font-family:var(--font-fraunces)] sm:text-6xl xl:text-7xl">
                Delivered hot. Styled with intent.
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                Discover signature meals, keep your favorites close, and move
                from menu to checkout without friction.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePrimaryAction}
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#ef4444] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(239,68,68,0.28)] hover:-translate-y-0.5"
              >
                Start ordering
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowCart(true)}
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 text-sm font-semibold text-white hover:bg-white/14"
              >
                View cart
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[26px] border border-white/10 bg-white/8 px-5 py-5 backdrop-blur"
                >
                  <p className="text-3xl [font-family:var(--font-fraunces)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-white/65">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/8 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
            <div
              className="min-h-[560px] rounded-[28px] bg-cover bg-center"
              style={{ backgroundImage: "url('/mainPageHeaderImage.png')" }}
            />
            <div className="absolute inset-x-8 bottom-8 rounded-[28px] border border-white/10 bg-[#21150f]/78 p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffd2b0]">
                    Ready to checkout
                  </p>
                  <p className="mt-2 text-3xl [font-family:var(--font-fraunces)]">
                    ${cartTotal.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/70">
                  {cartCount} items
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Add dishes to your cart and complete the delivery flow with your
                saved account.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CartModal
        open={showCart}
        onOpenChange={setShowCart}
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={confirmOrder}
        user={user}
        deliveryLocation={deliveryLocation}
        setDeliveryLocation={setDeliveryLocation}
        savedLocations={savedLocations}
        onSaveLocation={saveLocation}
      />
    </div>
  );
}
