import { cn } from '@/lib/utils';

interface VariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  type?: 'color' | 'size' | 'text';
}

const colorMap: Record<string, string> = {
  'midnight black': '#1a1a1a',
  'pearl white': '#f5f5f5',
  'rose gold': '#b76e79',
  'space grey': '#6b6b6b',
  'white': '#ffffff',
  'black': '#1a1a1a',
  'brown': '#8B4513',
  'tan': '#D2B48C',
  'cognac': '#9F381A',
  'navy': '#000080',
  'coral': '#FF7F50',
  'charcoal': '#36454F',
  'matte white': '#f0f0f0',
  'sage green': '#9DC183',
  'sage': '#9DC183',
  'lavender': '#E6E6FA',
  'midnight blue': '#191970',
  'natural titanium': '#878681',
  'blue titanium': '#4A5568',
  'white titanium': '#E8E8E8',
  'black titanium': '#2D3748',
  'tortoise': '#8B4513',
  'gold': '#FFD700',
  'olive': '#6B8E23',
  'heather grey': '#9BA4B0',
};

export function VariantSelector({
  label,
  options,
  selected,
  onChange,
  type = 'text',
}: VariantSelectorProps) {
  if (options.length === 0) return null;

  const getColorHex = (colorName: string): string => {
    const normalized = colorName.toLowerCase();
    return colorMap[normalized] || '#ddd';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {type !== 'color' && selected && (
          <span className="text-sm text-muted-foreground">{selected}</span>
        )}
        {type === 'color' && selected && (
          <span className="text-sm text-muted-foreground">{selected}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selected;

          if (type === 'color') {
            return (
              <button
                key={option}
                onClick={() => onChange(option)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all duration-200 relative",
                  isSelected
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-foreground/30"
                )}
                style={{ backgroundColor: getColorHex(option) }}
                title={option}
              >
                {isSelected && (
                  <svg
                    className={cn(
                      "absolute inset-0 m-auto w-5 h-5",
                      getColorHex(option) === '#ffffff' || getColorHex(option) === '#f5f5f5' || getColorHex(option) === '#f0f0f0' || getColorHex(option) === '#E8E8E8' || getColorHex(option) === '#E6E6FA'
                        ? "text-foreground"
                        : "text-white"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          }

          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:border-foreground/30 hover:bg-muted/50"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
