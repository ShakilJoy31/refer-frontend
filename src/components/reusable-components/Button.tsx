"use client";

import React from 'react';
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
  [key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  // Default handler that does nothing when onClick is not provided
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 6px 20px rgba(255,255,255,0.25)",
      }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
      className={`
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;