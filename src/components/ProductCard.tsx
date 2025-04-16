import { useState } from 'react';
import { Heart, ShoppingBag, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  is3DAvailable?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  imageUrl,
  colors,
  sizes,
  is3DAvailable = false,
  isNew = false,
  isSale = false,
  isHot = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  return (
    <div 
      className="group relative border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* 3D Button */}
        {is3DAvailable && (
          <button
            className="absolute top-3 right-3 rounded-full w-8 h-8 flex items-center justify-center bg-white text-fashion-primary border border-fashion-primary hover:bg-fashion-primary hover:text-white transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowModel(true);
            }}
            title="Посмотреть 3D модель"
          >
            <Box className="h-4 w-4" />
          </button>
        )}
        
        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {isNew && (
            <Badge className="bg-fashion-accent text-white">Новинка</Badge>
          )}
          {isSale && (
            <Badge className="bg-fashion-primary text-white">Скидка</Badge>
          )}
          {isHot && (
            <Badge className="bg-amber-500 text-white">Хит продаж</Badge>
          )}
        </div>
        
        {/* Actions on hover */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 rounded-full bg-white hover:bg-fashion-primary hover:text-white transition-colors"
              asChild
            >
              <Link to={`/product/${id}`}>
                <ShoppingBag className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 rounded-full bg-white hover:bg-fashion-primary hover:text-white transition-colors"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 3D label */}
        {is3DAvailable && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
            <Box className="h-3 w-3 mr-1" />
            3D модель
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium mb-2 line-clamp-2">
          <Link to={`/product/${id}`} className="hover:text-fashion-primary transition-colors">
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center mb-3">
          <span className="font-semibold">
            {price.toLocaleString('ru-RU')} ₽
          </span>
          {oldPrice && (
            <span className="ml-2 text-muted-foreground text-sm line-through">
              {oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>
        
        {/* Color Options */}
        <div className="flex items-center space-x-1 mb-3 mt-auto">
          <TooltipProvider>
            {colors.map((color, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-4 h-4 rounded-full ${
                      index === currentColorIndex ? 'ring-1 ring-fashion-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColorIndex(index)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Цвет {index + 1}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Size Range */}
        <div className="text-xs text-muted-foreground">
          Размеры: {sizes.join(', ')}
        </div>
      </div>

      {/* 3D Model Preview Modal */}
      {showModel && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModel(false)}>
          <div className="bg-background rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">{name} - 3D модель</h3>
              <Button variant="outline" size="sm" onClick={() => setShowModel(false)}>
                Закрыть
              </Button>
            </div>
            <div className="p-4">
              <iframe 
                src={`/3d-model-viewer.html?id=${id}&color=${encodeURIComponent(colors[currentColorIndex])}`}
                className="w-full aspect-square rounded border"
                title={`3D модель ${name}`}
              />
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Выберите цвет:</p>
              <div className="flex items-center space-x-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full ${
                      index === currentColorIndex ? 'ring-2 ring-fashion-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColorIndex(index)}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/product/${id}`}>
                    Подробнее о товаре
                  </Link>
                </Button>
                <Button className="bg-fashion-primary hover:bg-fashion-primary/90 text-white">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;