"use client";

import { CardItemProps } from "@/types/product/productCardTypes";
import React from "react";



export const CardItem: React.FC<CardItemProps> = ({
  children,
  className,
  as: Component = "div",
  onClick,
  href,
  target,
  ...props
}) => {
  

  if (Component === "a") {
    return (
      <a
        href={href}
        target={target}
        className={className}
        
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (Component === "button") {
    return (
      <button
        className={className}
        
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (Component === "p") {
    return (
      <p className={className} {...props}>
        {children}
      </p>
    );
  }

  return (
    <div className={className} onClick={onClick} {...props}>
      {children}
    </div>
  );
};