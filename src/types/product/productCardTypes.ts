export interface CardItemProps {
  children: React.ReactNode;
  className?: string;

  as?: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
}



export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  specification: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  tags?: string[];
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  imageHeight?: string;
  showCategory?: boolean;
  showRating?: boolean;
  showActions?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}





// Product for card component and wishlist component..........................................

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}




// Interface for confirmation modal......................................
export interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}