import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/data/mockData';

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
}

export function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryName));
    } else {
      onCategoryChange([...selectedCategories, categoryName]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    onPriceChange([0, maxPrice]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                ({category.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={maxPrice}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ₹{priceRange[0].toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Availability</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <Checkbox defaultChecked />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              In Stock
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <Checkbox />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Out of Stock
            </span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-warning fill-warning' : 'text-muted'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-muted-foreground ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="text-lg font-semibold text-foreground mb-6">Filters</h2>
          <FilterContent />
        </div>
      </aside>
    </>
  );
}
