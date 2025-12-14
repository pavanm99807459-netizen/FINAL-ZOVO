import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize, selectedStorage } = item;

  return (
    <div className="flex gap-4 py-6 border-b border-border animate-fade-in">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              to={`/product/${product.id}`}
              className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {[selectedColor, selectedSize, selectedStorage]
                .filter(Boolean)
                .join(' • ')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product.id)}
            className="text-muted-foreground hover:text-destructive flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-end justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              ₹{(product.price * quantity).toLocaleString()}
            </span>
            {quantity > 1 && (
              <span className="text-sm text-muted-foreground">
                (₹{product.price.toLocaleString()} each)
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
