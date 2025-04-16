import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

interface CategoryFilterProps {
  categories: FilterGroup[];
  colors: FilterOption[];
  sizes: FilterOption[];
  priceRange: [number, number];
  maxPrice: number;
  onFilterChange: (filters: any) => void;
}

const CategoryFilter = ({
  categories,
  colors,
  sizes,
  priceRange: initialPriceRange,
  maxPrice,
  onFilterChange
}: CategoryFilterProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(categories.map(cat => cat.id));
  const [priceRange, setPriceRange] = useState<[number, number]>(initialPriceRange);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleColorChange = (colorId: string, checked: boolean) => {
    if (checked) {
      setSelectedColors(prev => [...prev, colorId]);
    } else {
      setSelectedColors(prev => prev.filter(id => id !== colorId));
    }
  };

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes(prev => [...prev, sizeId]);
    } else {
      setSelectedSizes(prev => prev.filter(id => id !== sizeId));
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange
    });
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(initialPriceRange);
    onFilterChange({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: initialPriceRange
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-4">Фильтры</h3>
        
        {/* Categories */}
        {categories.map(category => (
          <div key={category.id} className="mb-4">
            <button
              className="flex items-center justify-between w-full py-2 text-left font-medium"
              onClick={() => toggleGroup(category.id)}
            >
              {category.title}
              {expandedGroups.includes(category.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedGroups.includes(category.id) && (
              <div className="ml-2 mt-2 space-y-2">
                {category.options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id}
                      checked={selectedCategories.includes(option.id)}
                      onCheckedChange={(checked) => handleCategoryChange(option.id, checked === true)}
                    />
                    <label htmlFor={option.id} className="text-sm cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Price Range */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3">Цена</h4>
          <div className="px-2">
            <Slider
              value={[priceRange[0], priceRange[1]]}
              min={0}
              max={maxPrice}
              step={100}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>
        
        {/* Colors */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3">Цвет</h4>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <div key={color.id} className="flex flex-col items-center">
                <button
                  className={`h-6 w-6 rounded-full border ${
                    selectedColors.includes(color.id) 
                      ? 'ring-2 ring-fashion-primary ring-offset-2' 
                      : 'ring-0'
                  }`}
                  style={{ backgroundColor: color.id }}
                  onClick={() => handleColorChange(
                    color.id, 
                    !selectedColors.includes(color.id)
                  )}
                  title={color.label}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3">Размер</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size.id}
                className={`h-8 min-w-8 px-2 border rounded text-xs flex items-center justify-center ${
                  selectedSizes.includes(size.id)
                    ? 'border-fashion-primary bg-fashion-primary/10 text-fashion-primary'
                    : 'border-border'
                }`}
                onClick={() => handleSizeChange(
                  size.id, 
                  !selectedSizes.includes(size.id)
                )}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 mt-6">
          <Button 
            className="flex-1 bg-fashion-primary hover:bg-fashion-primary/90"
            onClick={handleApplyFilters}
          >
            Применить
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleResetFilters}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;