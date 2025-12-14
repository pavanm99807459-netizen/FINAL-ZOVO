import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductGrid } from '@/components/products/ProductGrid';
import { FilterSidebar } from '@/components/products/FilterSidebar';
import { products } from '@/data/mockData';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Popularity', value: 'popularity' },
];

export default function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam && categoryParam !== 'all' ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');

  const maxPrice = Math.max(...products.map((p) => p.price));

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filter param
    if (filterParam === 'new') {
      result = result.filter((p) => p.newArrival);
    } else if (filterParam === 'trending') {
      result = result.filter((p) => p.trending);
    } else if (filterParam === 'featured') {
      result = result.filter((p) => p.featured);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [selectedCategories, priceRange, sortBy, filterParam]);

  const getPageTitle = () => {
    if (filterParam === 'new') return 'New Arrivals';
    if (filterParam === 'trending') return 'Trending Products';
    if (filterParam === 'featured') return 'Featured Products';
    if (selectedCategories.length === 1) return selectedCategories[0];
    return 'All Products';
  };

  return (
    <main className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            maxPrice={maxPrice}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div className="lg:hidden">
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  maxPrice={maxPrice}
                />
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm text-muted-foreground hidden md:inline">
                  Sort by:
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      {sortOptions.find((o) => o.value === sortBy)?.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={sortBy === option.value ? 'bg-muted' : ''}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
