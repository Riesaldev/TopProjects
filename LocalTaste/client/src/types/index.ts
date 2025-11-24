export enum UserRole {
  CONSUMER = 'consumer',
  PRODUCER = 'producer',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum ProductCategory {
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  DAIRY = 'dairy',
  MEAT = 'meat',
  BAKERY = 'bakery',
  BEVERAGES = 'beverages',
  HERBS = 'herbs',
  OTHERS = 'others',
}

export interface Product {
  id: string;
  producer_id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: ProductCategory;
  unit?: string;
  images?: string[];
  is_available: boolean;
  average_rating: number;
  total_reviews: number;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
  producer?: User;
}

export enum SubscriptionFrequency {
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELED = 'canceled',
}

export interface Subscription {
  id: string;
  user_id: string;
  products: { product_id: string; quantity: number }[];
  frequency: SubscriptionFrequency;
  status: SubscriptionStatus;
  total_price: number;
  next_delivery_date?: Date;
  stripe_subscription_id?: string;
  delivery_notes?: string;
  created_at: Date;
  updated_at: Date;
  user?: User;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  stripe_payment_intent_id?: string;
  delivery_address?: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  delivery_notes?: string;
  delivered_at?: Date;
  created_at: Date;
  updated_at: Date;
  user?: User;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  is_verified_purchase: boolean;
  is_visible: boolean;
  created_at: Date;
  user?: User;
  product?: Product;
}