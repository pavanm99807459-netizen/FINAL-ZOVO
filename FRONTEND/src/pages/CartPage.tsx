import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-16">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6">
              {items.map((item) => (
                <CartItem key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-foreground">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Button asChild className="w-full gap-2" size="lg">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
