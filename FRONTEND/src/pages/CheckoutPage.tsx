import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building2, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QRPaymentModal } from '@/components/checkout/QRPaymentModal';
import { useCart } from '@/context/CartContext';
import { sampleAddresses } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(sampleAddresses[0].id);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    clearCart();
    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    });
    navigate('/profile/orders');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Shipping Address
              </h2>

              <RadioGroup
                value={selectedAddress}
                onValueChange={setSelectedAddress}
                className="space-y-4"
              >
                {sampleAddresses.map((address) => (
                  <label
                    key={address.id}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      selectedAddress === address.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20"
                    )}
                  >
                    <RadioGroupItem value={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {address.type === 'home' ? (
                          <Home className="h-4 w-4 text-primary" />
                        ) : (
                          <Building2 className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-medium text-foreground capitalize">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-foreground">{address.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.phone}
                      </p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              {/* Add New Address */}
              {!showNewAddress ? (
                <Button
                  variant="outline"
                  onClick={() => setShowNewAddress(true)}
                  className="w-full mt-4 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Address
                </Button>
              ) : (
                <div className="mt-6 p-6 rounded-xl border border-border animate-fade-in">
                  <h3 className="font-medium text-foreground mb-4">
                    New Address
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input id="street" placeholder="123, Street Name, Area" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="560001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Address Type</Label>
                      <select
                        id="type"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Save Address</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowNewAddress(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Payment Method
              </h2>

              <div className="p-4 rounded-xl border-2 border-primary bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center">
                    <svg className="w-8 h-8 text-background" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">QR Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Pay using any UPI app by scanning QR code
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                * Only QR payment is available at the moment
              </p>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 mb-6">
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
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-xl text-foreground">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowPaymentModal(true)}
                className="w-full"
                size="lg"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <QRPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        amount={total}
      />
    </main>
  );
}
