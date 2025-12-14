import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.colors[0] || '',
      product.sizes[0] || '',
      product.storage?.[0]
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="px-2 py-1 text-xs font-medium bg-foreground text-background rounded-full">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            inWishlist
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-3">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{
                  backgroundColor:
                    color.toLowerCase().includes('black') ? '#1a1a1a' :
                    color.toLowerCase().includes('white') ? '#ffffff' :
                    color.toLowerCase().includes('brown') || color.toLowerCase().includes('cognac') || color.toLowerCase().includes('tan') ? '#8B4513' :
                    color.toLowerCase().includes('grey') || color.toLowerCase().includes('gray') ? '#808080' :
                    color.toLowerCase().includes('navy') ? '#000080' :
                    color.toLowerCase().includes('rose') || color.toLowerCase().includes('coral') ? '#E8967A' :
                    color.toLowerCase().includes('gold') ? '#FFD700' :
                    color.toLowerCase().includes('blue') ? '#4169E1' :
                    color.toLowerCase().includes('green') || color.toLowerCase().includes('sage') || color.toLowerCase().includes('olive') ? '#6B8E23' :
                    color.toLowerCase().includes('lavender') ? '#E6E6FA' :
                    '#ddd'
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
