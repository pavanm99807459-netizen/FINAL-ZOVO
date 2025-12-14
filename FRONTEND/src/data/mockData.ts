// Mock data for ZOVO ecommerce

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  storage?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  trending: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedStorage?: string;
}

export interface Address {
  id: string;
  type: 'home' | 'office';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  messages: {
    id: string;
    sender: 'user' | 'support';
    message: string;
    timestamp: string;
  }[];
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', productCount: 156 },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', productCount: 324 },
  { id: '3', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400', productCount: 89 },
  { id: '4', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', productCount: 210 },
  { id: '5', name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934- voices-bd86b01d7ced0?w=400', productCount: 78 },
  { id: '6', name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', productCount: 432 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 12999,
    originalPrice: 18999,
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600',
    ],
    colors: ['Midnight Black', 'Pearl White', 'Rose Gold'],
    sizes: [],
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    featured: true,
    newArrival: false,
    trending: true,
  },
  {
    id: '2',
    name: 'Minimalist Leather Watch',
    price: 8499,
    originalPrice: 12999,
    description: 'Elegant minimalist watch with genuine Italian leather strap. Swiss movement, sapphire crystal glass, and water-resistant up to 50 meters.',
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600',
    ],
    colors: ['Brown', 'Black', 'Tan'],
    sizes: [],
    rating: 4.9,
    reviews: 856,
    inStock: true,
    featured: true,
    newArrival: true,
    trending: true,
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker Pro',
    price: 6999,
    originalPrice: 9999,
    description: 'Track your fitness journey with precision. Heart rate monitoring, GPS, sleep tracking, and 7-day battery life in a sleek, water-resistant design.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600',
    ],
    colors: ['Black', 'Navy', 'Coral'],
    sizes: ['S', 'M', 'L'],
    rating: 4.6,
    reviews: 1523,
    inStock: true,
    featured: false,
    newArrival: true,
    trending: true,
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 1499,
    originalPrice: 2299,
    description: 'Premium organic cotton t-shirt with a relaxed fit. Sustainable fashion that feels as good as it looks. Pre-shrunk and fade-resistant.',
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
    ],
    colors: ['White', 'Black', 'Heather Grey', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 3421,
    inStock: true,
    featured: false,
    newArrival: false,
    trending: false,
  },
  {
    id: '5',
    name: 'Ceramic Pour-Over Coffee Set',
    price: 3999,
    description: 'Artisanal ceramic pour-over coffee maker with matching cups. Hand-crafted for the perfect brew every time.',
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600',
    ],
    colors: ['Matte White', 'Charcoal', 'Sage Green'],
    sizes: [],
    rating: 4.9,
    reviews: 287,
    inStock: true,
    featured: true,
    newArrival: true,
    trending: false,
  },
  {
    id: '6',
    name: 'Wireless Earbuds Elite',
    price: 7999,
    originalPrice: 11999,
    description: 'True wireless earbuds with studio-quality sound. Active noise cancellation, transparency mode, and wireless charging case.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
    ],
    colors: ['Space Grey', 'White', 'Midnight Blue'],
    sizes: [],
    rating: 4.7,
    reviews: 4521,
    inStock: true,
    featured: true,
    newArrival: false,
    trending: true,
  },
  {
    id: '7',
    name: 'Luxury Skincare Set',
    price: 4999,
    originalPrice: 7499,
    description: 'Complete skincare routine in one elegant set. Cleanser, toner, serum, and moisturizer with natural ingredients.',
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600',
    ],
    colors: [],
    sizes: ['30ml', '50ml', '100ml'],
    rating: 4.8,
    reviews: 1876,
    inStock: true,
    featured: false,
    newArrival: true,
    trending: true,
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    price: 5999,
    originalPrice: 8999,
    description: 'Premium polarized sunglasses with UV400 protection. Lightweight titanium frame with anti-scratch lenses.',
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    ],
    colors: ['Black', 'Tortoise', 'Gold'],
    sizes: [],
    rating: 4.6,
    reviews: 923,
    inStock: true,
    featured: true,
    newArrival: false,
    trending: false,
  },
  {
    id: '9',
    name: 'Smartphone Pro Max',
    price: 89999,
    originalPrice: 99999,
    description: 'Flagship smartphone with advanced camera system, A17 chip, and all-day battery life. Available in multiple storage options.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600',
    ],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    sizes: [],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    rating: 4.9,
    reviews: 8723,
    inStock: true,
    featured: true,
    newArrival: true,
    trending: true,
  },
  {
    id: '10',
    name: 'Yoga Mat Premium',
    price: 2999,
    description: 'Extra-thick eco-friendly yoga mat with superior grip. Perfect for yoga, pilates, and home workouts.',
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    ],
    colors: ['Sage', 'Lavender', 'Charcoal', 'Coral'],
    sizes: [],
    rating: 4.7,
    reviews: 1234,
    inStock: true,
    featured: false,
    newArrival: false,
    trending: true,
  },
  {
    id: '11',
    name: 'Leather Crossbody Bag',
    price: 6499,
    originalPrice: 8999,
    description: 'Handcrafted genuine leather crossbody bag with adjustable strap. Multiple compartments for organization.',
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
    ],
    colors: ['Cognac', 'Black', 'Olive'],
    sizes: [],
    rating: 4.8,
    reviews: 567,
    inStock: true,
    featured: true,
    newArrival: true,
    trending: false,
  },
  {
    id: '12',
    name: 'Scented Candle Collection',
    price: 1999,
    description: 'Set of 3 hand-poured soy candles with natural essential oils. Long-lasting fragrance for any room.',
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600',
    ],
    colors: [],
    sizes: ['Small', 'Medium', 'Large'],
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    featured: false,
    newArrival: true,
    trending: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    userName: 'Priya S.',
    rating: 5,
    comment: 'Absolutely love this product! The quality exceeded my expectations. Fast shipping and great packaging.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    userName: 'Rahul M.',
    rating: 4,
    comment: 'Good product overall. Minor issues with the size but customer service was very helpful.',
    date: '2024-01-12',
    verified: true,
  },
  {
    id: '3',
    userName: 'Ananya K.',
    rating: 5,
    comment: 'Best purchase I\'ve made this year. Highly recommend to everyone!',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '4',
    userName: 'Vikram P.',
    rating: 4,
    comment: 'Great value for money. The product is exactly as described.',
    date: '2024-01-08',
    verified: false,
  },
  {
    id: '5',
    userName: 'Sneha R.',
    rating: 5,
    comment: 'Premium quality and elegant design. Will definitely buy more from ZOVO.',
    date: '2024-01-05',
    verified: true,
  },
];

export const sampleAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'John Doe',
    phone: '+91 98765 43210',
    street: '123, Palm Heights, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: true,
  },
  {
    id: '2',
    type: 'office',
    name: 'John Doe',
    phone: '+91 98765 43210',
    street: 'Tech Park, Block B, 4th Floor',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066',
    isDefault: false,
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'delivered',
    items: [
      {
        product: products[0],
        quantity: 1,
        selectedColor: 'Midnight Black',
        selectedSize: '',
      },
    ],
    total: 12999,
    address: sampleAddresses[0],
    paymentMethod: 'QR Payment',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-25',
    status: 'shipped',
    items: [
      {
        product: products[1],
        quantity: 1,
        selectedColor: 'Brown',
        selectedSize: '',
      },
      {
        product: products[3],
        quantity: 2,
        selectedColor: 'White',
        selectedSize: 'M',
      },
    ],
    total: 11497,
    address: sampleAddresses[0],
    paymentMethod: 'QR Payment',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-28',
    status: 'out_for_delivery',
    items: [
      {
        product: products[5],
        quantity: 1,
        selectedColor: 'White',
        selectedSize: '',
      },
    ],
    total: 7999,
    address: sampleAddresses[1],
    paymentMethod: 'QR Payment',
  },
];

export const sampleTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Order delivery delayed',
    status: 'resolved',
    createdAt: '2024-01-18',
    messages: [
      {
        id: '1',
        sender: 'user',
        message: 'Hi, my order ORD-2024-001 is delayed. Can you please check?',
        timestamp: '2024-01-18 10:30',
      },
      {
        id: '2',
        sender: 'support',
        message: 'Hello! I apologize for the delay. Let me check the status of your order.',
        timestamp: '2024-01-18 10:45',
      },
      {
        id: '3',
        sender: 'support',
        message: 'Your order is now out for delivery. You should receive it today by 6 PM.',
        timestamp: '2024-01-18 11:00',
      },
      {
        id: '4',
        sender: 'user',
        message: 'Thank you for the quick response!',
        timestamp: '2024-01-18 11:05',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Product return request',
    status: 'in_progress',
    createdAt: '2024-01-22',
    messages: [
      {
        id: '1',
        sender: 'user',
        message: 'I received the wrong size. I would like to return and exchange.',
        timestamp: '2024-01-22 14:00',
      },
      {
        id: '2',
        sender: 'support',
        message: 'We\'re sorry about this! I\'ll initiate a return pickup. Please keep the item ready.',
        timestamp: '2024-01-22 14:30',
      },
    ],
  },
];

export const adminStats = {
  totalOrders: 1247,
  pendingPayments: 23,
  revenue: 2456789,
  totalProducts: 156,
  totalCustomers: 3421,
  pendingOrders: 45,
};

export const coupons = [
  { id: '1', code: 'WELCOME10', discount: 10, type: 'percentage', active: true },
  { id: '2', code: 'FLAT500', discount: 500, type: 'fixed', active: true },
  { id: '3', code: 'SUMMER20', discount: 20, type: 'percentage', active: false },
];
