"use client";

import React, { useState } from "react";
import InputField from "../ui/input";
import Button from "../reusable-components/Button";
import { useCart } from "@/hooks/CartContext";
import { MdLocalShipping, MdDone } from "react-icons/md";

export default function CheckoutForm() {
  const { items } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const orderTotal = subtotal; // Add shipping/tax if needed

  const onCheckout = () => {
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      // Reset after 5 seconds
      setTimeout(() => {
        setIsComplete(false);
      }, 3000);
    }, 2000); // Processing animation duration
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto p-6 mt-12 ">
      {/* Billing Section */}
      <div className="border border-cyan-500 rounded-md">
        <h2 className="text-xl font-bold mb-4 text-center shadow shadow-cyan-500 rounded-tr-md rounded-tl-md py-2 bg-cyan-50">Billing To</h2>

        <div className="space-y-3 px-6 pb-6">
          <InputField
            label="Name *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            placeholder="Shakil joy"
          />

          <InputField
            label="Address *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            placeholder="Street address"
          />

          <InputField
            label="Town / City *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            placeholder="Town / City"
          />

          <InputField
            label="Postcode / Zip *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            placeholder="Postcode / Zip"
          />

          <InputField
            label="Email Address *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            type="email"
            placeholder="shakil@gmail.com"
          />

          <InputField
            label="Phone *"
            className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
            type="tel"
            placeholder="01766556565"
          />
        </div>
      </div>

      {/* Order Section */}
      <div className="border border-cyan-500 rounded-md">
        <h2 className="text-xl font-bold mb-4 text-center shadow shadow-cyan-500 rounded-tr-md rounded-tl-md py-2 bg-cyan-50">Your order</h2>

        <div className="px-6 pb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium">Product</span>
              <span className="font-medium">Total</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mb-2 text-sm">
            <span>Cart Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Order Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <h3 className="text-sm font-semibold mb-2">Payment With Card</h3>
          <div className="border border-gray-300 rounded-md px-4 py-3 mb-6">
            <InputField onChange={(e) => setCardNumber(e.target.value)}
              label="Card Number *"
              className="border border-cyan-500 rounded px-3 py-1.5 w-full focus:outline-none"
              type="text"
              placeholder="Card Number"
            />
          </div>

          <Button
            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-2 rounded-md transition-colors font-medium flex items-center justify-center ${isProcessing || isComplete || cardNumber.length !== 16 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={onCheckout}
            disabled={isProcessing || isComplete || cardNumber.length !== 16}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center w-full">
                <MdLocalShipping size={25} className="animate-moveRight mr-2" />
                <span>Processing...</span>
              </div>
            ) : isComplete ? (
              <div className="flex items-center justify-center w-full">
                <MdDone size={25} className="text-green-300 mr-2" />
                <span>Order Complete!</span>
              </div>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>


      </div>
    </div>
  );
}