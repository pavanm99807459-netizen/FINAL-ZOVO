import { Link } from 'react-router-dom';
import { sampleOrders } from '@/data/mockData';
import { OrderStepper } from '@/components/orders/OrderStepper';
import { ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">My Orders</h1>
        <div className="space-y-6">
          {sampleOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-semibold text-foreground text-lg">{order.id}</p>
                  <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                </div>
              </div>
              <OrderStepper status={order.status} className="mb-6" />
              <div className="flex gap-4 overflow-x-auto pb-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <Link to={`/profile/orders/${order.id}`} className="flex items-center gap-2 text-primary text-sm font-medium mt-4 hover:underline">
                View Details <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
