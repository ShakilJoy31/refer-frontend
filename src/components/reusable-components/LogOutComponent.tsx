// ==============================
// Logout Modal Component

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";

// ==============================
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};


const LogoutComponent: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              ref={modalRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 w-full max-w-md overflow-hidden"
              style={{
                background: `
                  linear-gradient(145deg, rgba(255,255,255,0.98), rgba(250,252,251,0.98)),
                  radial-gradient(circle at top left, rgba(220,38,38,0.03), transparent 60%)
                `,
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Floating close button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-3 right-3 z-10"
              >
                <button
                  onClick={onClose}
                  className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <X size={18} />
                </button>
              </motion.div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="relative mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Confirm Logout
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Are you sure you want to logout from your account?
                </p>

                {/* Warning note */}
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    You&apos;ll need to log back in to access your account features.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <button
                      onClick={onClose}
                      className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={onConfirm}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Logout
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};


export default LogoutComponent;