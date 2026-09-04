import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

function Delivery({
  name,
  setName,
  phone,
  setPhone,
  location,
  setLocation,
  orderNote,
  setOrderNote,
  error,
  onContinue,
  submitting,
}) {
  const [editing, setEditing] = useState(false);

  const handleSaveDetails = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("farmartUser") || "null"
    );

    if (!name.trim() || !phone.trim() || !location.trim()) {
      return;
    }

    if (savedUser) {
      localStorage.setItem(
        "farmartUser",
        JSON.stringify({
          ...savedUser,
          phone,
          location,
        })
      );
    }

    setEditing(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="font-semibold text-xl text-gray-700 mb-5 text-center">
          Delivery Information
        </h2>

        {/* Delivery Summary */}
        {!editing && (
          <div className="w-full border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="flex flex-col items-start">
              <div className="w-full">
                <h3 className="font-bold text-xl text-gray-700">
                  Delivery Details
                </h3>

                <div className="mt-3 space-y-1">
                  <p className="text-gray-700 font-medium">
                    {name || "No name saved"}
                  </p>

                  <p className="text-gray-500">
                    {phone || "No phone number saved"}
                  </p>

                  <p className="text-gray-500">
                    {location || "No location saved"}
                  </p>
                </div>

                {/* Optional Order Note */}
                {orderNote && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Order Note:
                      </span>{" "}
                      {orderNote}
                    </p>
                  </div>
                )}
              </div>

              {/* Change Button */}
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-green-600 font-semibold hover:text-green-700
                  flex items-center gap-1 mt-5
                  transition-all duration-200
                  hover:-translate-y-0.5"
              >
                <CiEdit size={22} />
                Change
              </button>
            </div>
          </div>
        )}

        {/* Edit Delivery Details */}
        {editing && (
          <div className="w-full border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            {/* Full Name */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                    outline-none transition
                    focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </label>
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                    outline-none transition
                    focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </label>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Location

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your Location"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1
                    outline-none transition
                    focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-3">
                {error}
              </p>
            )}

            {/* Order Note */}
            <div className="mt-2">
              <label className="block font-semibold text-gray-700 text-sm">
                Order Note (Optional)

                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder="Leave a note for the farmer..."
                  className="border border-gray-300 rounded-lg p-2 w-full mt-1
                    outline-none transition
                    focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </label>

              <p className="text-sm text-gray-400">
                {orderNote.length}/300
              </p>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveDetails}
              className="mt-5 bg-green-600 text-white font-semibold
                rounded-xl px-5 py-2.5
                transition-all duration-200
                hover:bg-green-700
                hover:-translate-y-0.5
                hover:shadow-lg
                active:translate-y-0"
            >
              Save Delivery Details
            </button>
          </div>
        )}

        {/* Continue to Payment */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={onContinue}
            disabled={submitting || editing}
            className="bg-green-600 text-white font-semibold
              px-6 py-3 rounded-xl
              shadow-sm
              transition-all duration-200
              hover:bg-green-700
              hover:-translate-y-1
              hover:shadow-lg
              active:translate-y-0
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:translate-y-0
              disabled:hover:shadow-sm"
          >
            {submitting ? "Saving..." : "Continue to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
