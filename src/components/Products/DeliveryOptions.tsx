// components/product/DeliveryOptions.tsx
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, CheckCircle } from "lucide-react";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

export default function DeliveryOptions() {
  const deliveryOptions = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery for orders above $50",
      time: "2-5 business days",
    },
    {
      icon: Clock,
      title: "Express Delivery",
      description: "Additional $10 fee",
      time: "1-2 business days",
    },
    {
      icon: MapPin,
      title: "Store Pickup",
      description: "Pick up from nearest store",
      time: "Ready in 2 hours",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border border-cyan-300 rounded-lg p-4 dark:border-gray-700"
    >
      <Heading className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Delivery Options
      </Heading>
      <div className="space-y-3">
        {deliveryOptions.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-2 hover:cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <option.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <Heading className="font-medium text-gray-900 dark:text-white text-lg">
                    {option.title}
                  </Heading>
                  <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </Paragraph>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {option.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
        <CheckCircle className="w-4 h-4 mr-1" />
        <span>In stock - Ready to ship</span>
      </div>
    </motion.div>
  );
}