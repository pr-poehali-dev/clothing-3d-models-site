import { useState } from 'react';
import { Filter, GridIcon, LayoutList, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Временные данные для демонстрации
const categoryFilters = [
  {
    id: 'clothes',
    title: 'Одежда',
    options: [
      { id: 'jackets', label: 'Куртки' },
      { id: 'sweaters', label: 'Свитера' },
      { id: 'shirts', label: 'Рубашки' },
      { id: 'tshirts', label: 'Футболки' },
      { id: 'dresses', label: 'Платья' },
      { id: 'jeans', label: 'Джинсы' },
    ]
  },
  {
    id: 'accessories',
    title: 'Аксессуары',
    options: [
      { id: 'bags', label: 'Сумки' },
      { id: 'belts', label: 'Ремни' },
      { id: 'hats', label: 'Головные уборы' },
      { id: 'scarves', label: 'Шарфы' },
    ]
  },
  {
    id: 'shoes',
    title: 'Обувь',
    options: [
      { id: 'sneakers', label: 'Кроссовки' },
      { id: 'boots', label: 'Ботинки' },
      { id: 'sandals', label: 'Сандалии' },
      { id: 'loafers', label: 'Лоферы' },
    ]
  }
];

const colorOptions = [
  { id: '#000000', label: 'Черный' },
  { id: '#FFFFFF', label: 'Белый' },
  { id: '#3B82F6', label: 'Синий' },
  { id: '#EF4444', label: 'Красный' },
  { id: '#22C55E', label: 'Зеленый' },
  { id: '#F97316', label: 'Оранжевый' },
  { id: '#A855F7', label: 'Фиолетовый' },
  { id: '#F59E0B', label: 'Желтый' },
];

const sizeOptions = [
  { id: 'XS', label: 'XS' },
  { id: 'S', label: 'S' },
  { id: 'M', label: 'M' },
  { id: 'L', label: 'L' },
  { id: 'XL', label: 'XL' },
  { id: 'XXL', label: 'XXL' },
];

const products = [
  {
    id: '1',
    name: 'Куртка с капюшоном',
    price: 5990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#3B82F6', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    is3DAvailable: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Джинсы прямого кроя',
    price: 3490,
    oldPrice: 4990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#334155'],
    sizes: ['S', 'M', 'L'],
    is3DAvailable: false,
    isSale: true
  },
  {
    id: '3',
    name: 'Свитер оверсайз',
    price: 2990,
    imageUrl: '/placeholder.svg',
    colors: ['#FAFAFA', '#F97316', '#22C55E'],
    sizes: ['S', 'M', 'L'],
    is3DAvailable: true
  },
  {
    id: '4',
    name: 'Платье миди',
    price: 4290,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#EC4899'],
    sizes: ['XS', 'S', 'M'],
    is3DAvailable: true,
    isNew: true
  },
  {
    id: '5',
    name: 'Футболка базовая',
    price: 1290,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#FFFFFF', '#3B82F6'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is3DAvailable: false
  },
  {
    id: '6',
    name: 'Рубашка в клетку',
    price: 2490,
    imageUrl: '/placeholder.svg',
    colors: ['#3B82F6', '#F97316'],
    sizes: ['S', 'M', 'L'],
    is3DAvailable: true
  },
  {
    id: '7',
    name: 'Пальто удлиненное',
    price: 7990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#FAFAFA'],
    sizes: ['S', 'M', 'L'],
    is3DAvailable: true,
    isNew: true
  },
  {
    id: '8',
    name: 'Юбка плиссе',
    price: 3290,
    oldPrice: 3990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#FFFFFF'],
    sizes: ['XS', 'S', 'M'],
    is3DAvailable: false,
    isSale: true
  },
];

const sortOptions = [
  { value: 'popular', label: 'Популярные' },
  { value: 'newest', label: 'Новинки' },
  { value: 'priceAsc', label: 'Цена: по возрастанию' },
  { value: 'priceDesc', label: 'Цена: по убыванию' },
];

const Catalog = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 10000] as [number, number]
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (filters: any) => {
    setSelectedFilters(filters);
    const count = 
      filters.categories.length + 
      filters.colors.length + 
      filters.sizes.length + 
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);
    setActiveFiltersCount(count);
  };

  return (
    <>
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Каталог</h1>
            <div className="flex text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Главная</Link>
              <span className="mx-2">/</span>
              <span>Каталог</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <CategoryFilter 
                categories={categoryFilters}
                colors={colorOptions}
                sizes={sizeOptions}
                priceRange={[0, 10000]}
                maxPrice={10000}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and View Controls */}
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-2">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="md:hidden flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Фильтры
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 bg-fashion-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-md">
                      <SheetHeader className="mb-4">
                        <SheetTitle>Фильтры</SheetTitle>
                      </SheetHeader>
                      <CategoryFilter 
                        categories={categoryFilters}
                        colors={colorOptions}
                        sizes={sizeOptions}
                        priceRange={selectedFilters.priceRange}
                        maxPrice={10000}
                        onFilterChange={handleFilterChange}
                      />
                    </SheetContent>
                  </Sheet>
                  
                  <span className="text-sm text-muted-foreground">
                    Найдено {products.length} товаров
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select 
                    value={sortBy} 
                    onValueChange={(value) => setSortBy(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="hidden sm:flex border rounded">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={`rounded-r-none ${view === 'grid' ? 'bg-muted' : ''}`}
                      onClick={() => setView('grid')}
                    >
                      <GridIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={`rounded-l-none ${view === 'list' ? 'bg-muted' : ''}`}
                      onClick={() => setView('list')}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedFilters.categories.map((catId) => {
                    const category = categoryFilters
                      .flatMap(group => group.options)
                      .find(opt => opt.id === catId);
                    
                    return category && (
                      <div 
                        key={catId} 
                        className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        {category.label}
                        <button 
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            handleFilterChange({
                              ...selectedFilters,
                              categories: selectedFilters.categories.filter(id => id !== catId)
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {selectedFilters.colors.map((colorId) => {
                    const color = colorOptions.find(c => c.id === colorId);
                    
                    return color && (
                      <div 
                        key={colorId} 
                        className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        <span 
                          className="h-3 w-3 rounded-full mr-2" 
                          style={{ backgroundColor: colorId }}
                        />
                        {color.label}
                        <button 
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            handleFilterChange({
                              ...selectedFilters,
                              colors: selectedFilters.colors.filter(id => id !== colorId)
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {selectedFilters.sizes.map((sizeId) => {
                    const size = sizeOptions.find(s => s.id === sizeId);
                    
                    return size && (
                      <div 
                        key={sizeId} 
                        className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        Размер: {size.label}
                        <button 
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            handleFilterChange({
                              ...selectedFilters,
                              sizes: selectedFilters.sizes.filter(id => id !== sizeId)
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {(selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 10000) && (
                    <div 
                      className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      Цена: {selectedFilters.priceRange[0].toLocaleString('ru-RU')} ₽ - {selectedFilters.priceRange[1].toLocaleString('ru-RU')} ₽
                      <button 
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          handleFilterChange({
                            ...selectedFilters,
                            priceRange: [0, 10000]
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={() => {
                      handleFilterChange({
                        categories: [],
                        colors: [],
                        sizes: [],
                        priceRange: [0, 10000] as [number, number]
                      });
                    }}
                  >
                    Сбросить все
                  </Button>
                </div>
              )}
              
              {/* Products Grid View */}
              {view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {products.map(product => (
                    <div 
                      key={product.id} 
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                    >
                      <div className="sm:w-48 h-48 bg-muted/50 rounded-md overflow-hidden">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                        </Link>
                        
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-lg">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {product.oldPrice && (
                            <span className="ml-2 text-muted-foreground line-through">
                              {product.oldPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          {product.colors.map((color, index) => (
                            <div 
                              key={index}
                              className="h-4 w-4 rounded-full border border-muted-foreground"
                              style={{ backgroundColor: color }}
                              title={`Цвет ${index + 1}`}
                            />
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-4">
                          <span className="text-sm text-muted-foreground mr-2">
                            Размеры:
                          </span>
                          {product.sizes.map((size, index) => (
                            <span 
                              key={index} 
                              className="text-sm"
                            >
                              {size}{index < product.sizes.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                        
                        <div className="space-x-2">
                          <Button 
                            className="bg-fashion-primary hover:bg-fashion-primary/90"
                            size="sm"
                          >
                            Добавить в корзину
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <Link to={`/product/${product.id}`}>
                              Подробнее
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    <ChevronUp className="h-4 w-4 -rotate-90" />
                  </Button>
                  <Button variant="outline" className="bg-fashion-primary text-white">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <span>...</span>
                  <Button variant="outline">10</Button>
                  <Button variant="outline">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Catalog;