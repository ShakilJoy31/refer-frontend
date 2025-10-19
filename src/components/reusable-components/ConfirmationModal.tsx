import { motion, AnimatePresence } from "framer-motion";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { IConfirmationModalProps } from "@/types/product/productCardTypes";

export const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Heading className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </Heading>
              <Paragraph className="text-gray-600 dark:text-gray-300 mb-6">{message}</Paragraph>
              
              <div className="flex justify-end gap-3">
                <Button
                  onClick={onClose}
                  className="px-4 py-2 hover:cursor-pointer border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  className="px-4 py-2 hover:cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};