import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products, categories } from '@/data/mockData';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-surface overflow-hidden">
        <div className="container mx-auto py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Premium Shopping Experience
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                Discover the
                <span className="text-primary"> Art of </span>
                Premium Living
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                Curated collections of the finest products for those who appreciate quality, craftsmanship, and timeless design.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/products?filter=new">New Arrivals</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">1000+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.9</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in stagger-2">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                  alt="Premium shopping"
                  className="w-full rounded-3xl shadow-elevated"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gold/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Explore our diverse collection
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-semibold text-background mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-background/70">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked favorites from our collection
              </p>
            </div>
            <Link
              to="/products?filter=featured"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-1">
                  Trending Now
                </h2>
                <p className="text-muted-foreground">
                  Most loved by our customers
                </p>
              </div>
            </div>
            <Link
              to="/products?filter=trending"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gold/20">
                <Sparkles className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-1">
                  New Arrivals
                </h2>
                <p className="text-muted-foreground">
                  Fresh additions to our collection
                </p>
              </div>
            </div>
            <Link
              to="/products?filter=new"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-foreground overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-background mb-4">
                Stay Updated
              </h2>
              <p className="text-background/70 max-w-lg mx-auto mb-8">
                Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="px-8">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
