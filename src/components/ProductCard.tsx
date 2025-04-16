import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  is3DAvailable: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  imageUrl,
  colors,
  sizes,
  is3DAvailable,
  isNew = false,
  isSale = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Изображение товара */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted/50">
        <Link to={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Метки "Новинка" и "Скидка" */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <span className="bg-fashion-secondary text-white text-xs font-medium px-2 py-1 rounded">
                Новинка
              </span>
            )}
            {isSale && (
              <span className="bg-fashion-primary text-white text-xs font-medium px-2 py-1 rounded">
                Скидка
              </span>
            )}
          </div>

          {/* Метка "3D" */}
          {is3DAvailable && (
            <div className="absolute top-2 right-2">
              <span className="bg-fashion-accent text-white text-xs font-medium px-2 py-1 rounded">
                3D
              </span>
            </div>
          )}
        </Link>

        {/* Кнопки действий */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-background/80 backdrop-blur-sm transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          )}
        >
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 bg-white"
            onClick={toggleFavorite}
          >
            <Heart 
              className={cn("h-4 w-4", isFavorite ? "fill-fashion-primary text-fashion-primary" : "")} 
            />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 bg-white"
            asChild
          >
            <Link to={`/product/${id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="h-8 bg-fashion-primary hover:bg-fashion-primary/90 text-xs flex-1">
            <ShoppingBag className="h-4 w-4 mr-1" /> В корзину
          </Button>
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="mt-3">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-sm font-medium text-foreground truncate">{name}</h3>
          <div className="mt-1 flex items-center">
            <span className="text-sm font-semibold text-foreground">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            {oldPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </Link>

        {/* Доступные цвета */}
        <div className="mt-2 flex items-center space-x-1">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="h-3 w-3 rounded-full border border-muted-foreground"
              style={{ backgroundColor: color }}
              title={`Цвет ${index + 1}`}
            />
          ))}
        </div>

        {/* Доступные размеры */}
        <div className="mt-1 flex items-center gap-1">
          {sizes.map((size, index) => (
            <span 
              key={index} 
              className="text-xs text-muted-foreground"
            >
              {size}{index < sizes.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;