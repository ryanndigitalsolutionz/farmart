import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import CheckoutSteps from "./CheckoutSteps";
import Delivery from "../delivery/Delivery";

const API_BASE = "http://localhost:5000";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [deliverMethod, setDeliveryMethod] = useState("standard");
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBuyerProfile = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/profile/me`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Unable to load your profile."
          );
        }

        const savedName = [
          data.user?.first_name,
          data.user?.last_name,
        ]
          .filter(Boolean)
          .join(" ");

        setName(savedName);
        setPhone(data.profile?.phone || "");
        setLocation(data.profile?.location || "");
      } catch (requestError) {
        setError(
          requestError.message ||
            "Unable to load your profile information."
        );
      }
    };

    loadBuyerProfile();
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        Number(item.quantityInCart || 1),
    0
  );

  const createOrderPayload = () => {
    return {
      items: cart.map((item) => {
        const quantity = Number(item.quantityInCart || 1);

        if (item.product_id) {
          return {
            product_id: Number(item.product_id),
            quantity,
          };
        }

        if (item.livestock_id) {
          return {
            livestock_id: Number(item.livestock_id),
            quantity,
          };
        }

        throw new Error(
          `Unable to identify ${item.name || "one of the cart items"}. Please remove it and add it again from the marketplace.`
        );
      }),
    };
  };

  const handlePlaceOrder = async () => {
    if (submitting) return;

    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!name.trim() || !phone.trim() || !location.trim()) {
      setError("Please fill all buyer information.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = createOrderPayload();

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to place your order."
        );
      }

      const orderId =
        data.order_id ||
        data.order?.id;

      if (!orderId) {
        throw new Error(
          "The server created the order but did not return an order ID."
        );
      }

      clearCart();

      navigate(`/buyer/payments/${orderId}`, {
        state: {
          name,
          phone,
          location,
          deliveryMethod: deliverMethod,
          orderNote,
        },
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to place your order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 mt-3 border border-[var(--farm-green-border)] rounded-[17px] max-w-3xl mx-auto shadow-2xl m-3 items-center justify-center flex flex-col gap-4">
        <h1 className="font-bold text-2xl text-center tracking-wide text-[var(--farm-green-dark)]">
          Checkout
        </h1>

        <CheckoutSteps currentStep={1} />

        <div className="flex flex-col items-center justify-center text-center py-10">
          <h2 className="font-bold text-xl text-gray-700">
            Your cart is empty
          </h2>

          <p className="text-gray-400 mt-2">
            Add livestock or farm products before checking out.
          </p>

          <Link
            to="/buyer/marketplace"
            className="mt-5 px-5 py-3 rounded-xl bg-[var(--farm-green)] text-white font-semibold hover:bg-[var(--farm-green-dark)] transition"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-3 border border-[var(--farm-green-border)] rounded-[17px] max-w-3xl mx-auto shadow-2xl m-3 items-center justify-center flex flex-col gap-4">

      <div>
        <h1 className="font-bold text-2xl text-center tracking-wide text-[var(--farm-green-dark)]">
          Checkout
        </h1>

        <CheckoutSteps currentStep={currentStep} />
      </div>

      <div className="flex flex-col justify-center items-center mt-5 w-full">

        {currentStep === 1 && (
          <div className="w-full max-w-2xl">

            <h2 className="font-bold mb-5 tracking-wide text-xl text-gray-700 text-center p-2">
              Order Summary
            </h2>

            <div className="border rounded-2xl p-5 space-y-4">

              {cart.map((item) => {
                const quantity =
                  Number(item.quantityInCart || 1);

                const isProduct =
                  item.category === "product" ||
                  item.product_id;

                return (
                  <div
                    key={
                      item.cartKey ||
                      `${item.category}-${item.id}`
                    }
                    className="flex gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || item.type}
                        className="w-28 h-28 object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-xl">
                        {item.name || item.type}
                      </p>

                      <p className="text-gray-400">
                        {isProduct
                          ? `${item.type} · ${item.unit || "unit"}`
                          : `${item.breed || item.type} · ${item.age} years`}
                      </p>

                      {!isProduct && item.weight && (
                        <p className="text-gray-400">
                          {item.weight} {item.weight_unit || "kg"}
                        </p>
                      )}

                      <p className="text-gray-400">
                        {item.location}
                      </p>

                      <p className="text-gray-500">
                        Quantity: {quantity}
                      </p>

                      <p className="font-semibold">
                        Price: KSh{" "}
                        {(
                          Number(item.price || 0) *
                          quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3">
                <h2 className="font-bold text-xl text-green-700">
                  Total: KSh {total.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="mt-6 mb-7">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setCurrentStep(2);
                }}
                className="w-full p-3 border border-[var(--farm-green)] rounded-[11px] bg-[var(--farm-green)] text-white font-[var(--farm-body-font)] text-[13px] font-semibold cursor-pointer transition-[background,transform] duration-[160ms] ease-[ease] hover:bg-[var(--farm-green-dark)] hover:translate-y-[-1px]"
              >
                Continue to delivery
              </button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Link
                to="/buyer/marketplace"
                className="group relative mt-3 text-gray-400 hover:text-[var(--farm-green-dark)]"
              >
                Back to Marketplace

                <span className="absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 scale-x-0 rounded-full bg-[var(--farm-green-dark)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </div>

          </div>
        )}

        {currentStep === 2 && (
          <Delivery
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            location={location}
            setLocation={setLocation}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
            deliverMethod={deliverMethod}
            setDeliveryMethod={setDeliveryMethod}
            error={error}
            submitting={submitting}
            onContinue={handlePlaceOrder}
            onBack={() => {
              setError("");
              setCurrentStep(1);
            }}
          />
        )}

      </div>
    </div>
  );
}

export default Checkout;
