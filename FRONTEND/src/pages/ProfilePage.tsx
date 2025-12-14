import { Link } from 'react-router-dom';
import { User, MapPin, Package, Heart, Headphones, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { sampleOrders } from '@/data/mockData';
import { OrderStepper } from '@/components/orders/OrderStepper';

const menuItems = [
  { icon: User, label: 'Profile Details', href: '/profile' },
  { icon: MapPin, label: 'Saved Addresses', href: '/profile/addresses' },
  { icon: Package, label: 'My Orders', href: '/profile/orders' },
  { icon: Heart, label: 'Wishlist', href: '/profile/wishlist' },
  { icon: Headphones, label: 'Support Tickets', href: '/support' },
];

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Please sign in</h1>
          <p className="text-muted-foreground mb-6">Sign in to view your profile and orders.</p>
          <Button asChild><Link to="/login">Sign In</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{user?.name?.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link key={item.href} to={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                ))}
                <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Recent Orders</h2>
              <div className="space-y-6">
                {sampleOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-surface border border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-lg font-semibold text-foreground">₹{order.total.toLocaleString()}</span>
                    </div>
                    <OrderStepper status={order.status} />
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/profile/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
