export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string; // Emoji or URL
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  cartId: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  customPhoto?: string; // base64 or url
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string; // base64 or url
  date: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerPincode: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
}