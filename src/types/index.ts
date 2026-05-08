export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
}
