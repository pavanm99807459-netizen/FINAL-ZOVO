import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Minus,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageGallery } from '@/components/products/ImageGallery';
import { VariantSelector } from '@/components/products/VariantSelector';
import { ProductCard } from '@/components/products/ProductCard';
import { products, reviews } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, selectedStorage, quantity);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="animate-fade-in">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="animate-fade-in stagger-2">
            {/* Title & Rating */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'fill-warning text-warning'
                          : 'text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Variants */}
            <div className="space-y-6 mb-8">
              {product.colors.length > 0 && (
                <VariantSelector
                  label="Color"
                  options={product.colors}
                  selected={selectedColor}
                  onChange={setSelectedColor}
                  type="color"
                />
              )}

              {product.sizes.length > 0 && (
                <VariantSelector
                  label="Size"
                  options={product.sizes}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                  type="size"
                />
              )}

              {product.storage && product.storage.length > 0 && (
                <VariantSelector
                  label="Storage"
                  options={product.storage}
                  selected={selectedStorage}
                  onChange={setSelectedStorage}
                />
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium text-foreground">Quantity</span>
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleWishlist(product)}
                className={cn(inWishlist && 'border-primary text-primary')}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="p-6 rounded-2xl bg-surface space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Free Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery: 3-5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-success/10">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">
                    100% secure payment
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-warning/10">
                  <RotateCcw className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    7-day hassle-free returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-2xl bg-surface border border-border"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {review.userName}
                            {review.verified && (
                              <span className="ml-2 text-xs text-success">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < review.rating
                                ? 'fill-warning text-warning'
                                : 'text-muted'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
