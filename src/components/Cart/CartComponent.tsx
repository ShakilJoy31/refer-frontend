"use client";

import { useCart } from "@/hooks/CartContext";
import Image from "next/image";
import React, { useState } from "react";
import productImage from "../../../public/home-banner (3).jpg";
import Button from "../reusable-components/Button";
import { IoTrashBin } from "react-icons/io5";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Table from "../ui/table";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/product/productCardTypes";
import { ConfirmationModal } from "../reusable-components/ConfirmationModal";

// ---------- Reusable Cart Table ----------
interface CartTableProps {
  onClear: () => void;
  onCheckout: () => void;
}

const CartTable: React.FC<CartTableProps> = ({ onClear, onCheckout }) => {
  const router = useRouter()
  const { items, totalPrice, increment, decrement, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const handleClearClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    onClear();
    setIsModalOpen(false);
  };

  const handleRemoveClick = (id: string) => {
    setItemToRemove(id);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
    setItemToRemove(null);
    setIsModalOpen(false);
  };

  const handleRowSelect = (item: CartItem) => {
    if (selectedItems.some(selected => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        items.filter((item): item is CartItem => typeof item.id === "string")
      );
    }
  };

  const getModalConfig = () => {
    if (itemToRemove) {
      const item = items.find(i => i.id === itemToRemove);
      return {
        title: "Remove Item",
        message: `Are you sure you want to remove "${item?.name}" from your cart?`,
        onConfirm: handleConfirmRemove
      };
    } else {
      return {
        title: "Clear Cart",
        message: "Are you sure you want to clear your entire cart? This action cannot be undone.",
        onConfirm: handleConfirmClear
      };
    }
  };

  const modalConfig = getModalConfig();

  // Define table headers
  const headers = ["Product", "Price", "Quantity", "Total", "Action"];

  // Render function for table rows
  const renderRow = (item: CartItem) => (
    <>
      <td onClick={() => router.push(`/books/book-details/${item.slug}`)} className="px-6 py-4 whitespace-nowrap hover:cursor-pointer ">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={item.image || productImage.src}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
        ${item.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center border rounded-md w-28 justify-between bg-white dark:bg-gray-700">
          <Button
            className="px-3 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => decrement(item.id)}
            aria-label="Decrease quantity"
          >
            –
          </Button>
          <span className="px-2 font-medium text-gray-900 dark:text-white">{item.quantity}</span>
          <Button
            className="px-3 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => increment(item.id)}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button
          className="text-red-500 hover:cursor-pointer hover:text-red-700 dark:hover:text-red-400 text-xl mx-auto flex items-center justify-center p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          onClick={() => handleRemoveClick(item.id)}
          aria-label="Remove item"
        >
          <IoTrashBin size={20} />
        </Button>
      </td>
    </>
  );

  return (
    <>
      <div className="w-full max-w-7xl mt-8 mx-auto px-4">
        {/* Use the reusable Table component */}
        {items.length === 0 ? (
          <div className="overflow-x-auto border rounded-lg shadow-sm bg-white dark:bg-gray-800 p-8 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <IoTrashBin size={48} className="text-gray-300 mb-4" />
              <Paragraph className="text-lg font-medium mb-2">Your cart is empty</Paragraph>
              <Paragraph className="text-gray-500">Start shopping to add items to your cart</Paragraph>
            </div>
          </div>
        ) : (
          <Table
            headers={headers}
            data={items}
            renderRow={renderRow}
            selectedRows={selectedItems}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
          />
        )}

        {/* Cart Totals */}
        {items.length > 0 && (
          <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <Button
              className="border hover:cursor-pointer border-red-500 text-red-600 dark:text-red-400 px-6 py-3 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors self-start md:self-auto"
              onClick={handleClearClick}
            >
              Clear cart
            </Button>

            <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm w-full md:max-w-md">
              <Heading className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Cart Totals</Heading>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax (5%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(totalPrice * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${(totalPrice * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white py-3 rounded-md transition-colors font-medium"
                onClick={onCheckout}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setItemToRemove(null);
        }}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </>
  );
};

// ---------- Cart Page Component ----------
export default function CartComponent() {
  const { clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center py-12 bg-gray-50 dark:bg-gray-900">
      <CartTable onClear={clearCart} onCheckout={handleCheckout} />
    </section>
  );
}