import React from "react";
import { motion } from "framer-motion";

const DataLoader = ({textToRender} : {textToRender: string}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white text-xl flex items-center space-x-3"
    >
      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      <span>{textToRender}</span>
    </motion.div>
  </div>
  ); 
};

export default DataLoader;
