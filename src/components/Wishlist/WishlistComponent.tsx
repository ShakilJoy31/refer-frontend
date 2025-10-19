"use client";

import { useWishlist } from "@/hooks/WishlistContext";
import Image from "next/image";
import React, { useState } from "react";
import productImage from "../../../public/Product1.jpg";
import Button from "../reusable-components/Button";
import { IoTrashBin, IoHeart } from "react-icons/io5";

import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import Table from "../ui/table";
import { useCart } from "@/hooks/CartContext";
import { ConfirmationModal } from "../reusable-components/ConfirmationModal";
import { useRouter } from "next/navigation";

// ---------- Product Interface ----------
interface Product {
  id: string | number;
  name: string;
  slug?: string;
  price: number;
  image?: string;
}



// ---------- Reusable Wishlist Table ----------
interface WishlistTableProps {
  onClear: () => void;
}

const WishlistTable: React.FC<WishlistTableProps> = ({ onClear }) => {
  const { items, removeFromWishlist } = useWishlist();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const handleClearClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    onClear();
    setIsModalOpen(false);
  };

  const handleRemoveClick = (id: string | number) => {
    setItemToRemove(id);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromWishlist(itemToRemove);
    }
    setItemToRemove(null);
    setIsModalOpen(false);
  };

  const handleRowSelect = (item: Product) => {
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
      setSelectedItems([...items]);
    }
  };

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    // Optional: Show success message or toast
  };

  const getModalConfig = () => {
    if (itemToRemove) {
      const item = items.find(i => i.id === itemToRemove);
      return {
        title: "Remove Item",
        message: `Are you sure you want to remove "${item?.name}" from your wishlist?`,
        onConfirm: handleConfirmRemove
      };
    } else {
      return {
        title: "Clear Wishlist",
        message: "Are you sure you want to clear your entire wishlist? This action cannot be undone.",
        onConfirm: handleConfirmClear
      };
    }
  };

  const modalConfig = getModalConfig();

  // Define table headers
  const headers = ["Product", "Price", "Action", "Remove"];

  // Render function for table rows
  const renderRow = (item: Product) => (
    <>
      <td onClick={() => router.push(`/products/product-details/${item?.slug}`)} className="px-6 py-4 whitespace-nowrap hover:cursor-pointer ">
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
        <Button
          onClick={() => handleAddToCart(item)}
          className="bg-gradient-to-r hover:cursor-pointer from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-cyan-500 hover:to-blue-600 transition-colors"
        >
          Add to Cart
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button
          className="text-red-500 hover:text-red-700 hover:cursor-pointer dark:hover:text-red-400 text-xl mx-auto flex items-center justify-center p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
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
      <div className="w-full max-w-[1280px] mt-8 mx-auto px-4">
        {/* Use the reusable Table component */}
        {items.length === 0 ? (
          <div className="overflow-x-auto border rounded-lg shadow-sm bg-white dark:bg-gray-800 p-8 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <IoHeart size={48} className="text-gray-300 mb-4" />
              <Paragraph className="text-lg font-medium mb-2">Your wishlist is empty</Paragraph>
              <Paragraph className="text-gray-500">Start shopping to add items to your wishlist</Paragraph>
            </div>
          </div>
        ) : (
          <Table<Product>
            headers={headers}
            data={items}
            renderRow={renderRow}
            selectedRows={selectedItems}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
          />
        )}

        {/* Wishlist Actions */}
        {items.length > 0 && (
          <div className="mt-8 flex justify-start">
            <Button
              className="border hover:cursor-pointer border-red-500 text-red-600 dark:text-red-400 px-6 py-3 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              onClick={handleClearClick}
            >
              Clear Wishlist
            </Button>
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

// ---------- Wishlist Page Component ----------
export default function WishlistComponent() {
  const { clearWishlist, items } = useWishlist();

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center my-8">
          <Heading className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Wishlist
          </Heading>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {items.length} items saved for later
          </Paragraph>
        </div>
        <WishlistTable onClear={clearWishlist} />
      </div>
    </section>
  );
}