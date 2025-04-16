import { useState, useEffect, useRef } from 'react';
import { RotateCw, Maximize, MinusCircle, PlusCircle, ArrowLeft, ArrowRight, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Model3DProps {
  modelUrl?: string;
  alt: string;
  placeholderImageUrl?: string;
  productId?: string;
}

// Имитация данных 3D-моделей для разных продуктов
const mockModels = {
  '1': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  '2': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  '3': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  '4': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  '5': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
};

const Model3D = ({ modelUrl, alt, placeholderImageUrl = '/placeholder.svg', productId = '1' }: Model3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const modelContainerRef = useRef<HTMLDivElement>(null);
  
  // Получаем изображения для 3D-вращения на основе ID продукта
  const modelImages = mockModels[productId as keyof typeof mockModels] || [placeholderImageUrl];

  // Имитация загрузки 3D модели
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Автоматическое вращение
  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setCurrentAngle((prev) => (prev + 5) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRotating]);

  const toggleRotate = () => {
    setIsRotating(!isRotating);
  };

  const zoomIn = () => {
    if (zoomLevel < 1.5) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleManualRotate = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentAngle((prev) => (prev - 15) % 360);
    } else {
      setCurrentAngle((prev) => (prev + 15) % 360);
    }
  };

  const nextView = () => {
    setViewIndex((prev) => (prev + 1) % modelImages.length);
  };

  const prevView = () => {
    setViewIndex((prev) => (prev - 1 + modelImages.length) % modelImages.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modelContainerRef.current || isRotating) return;
    
    const rect = modelContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Преобразование позиции мыши в угол вращения (0-360)
    const angle = (x / width) * 360;
    setCurrentAngle(angle);
  };

  return (
    <div 
      className={`model-container relative bg-muted/30 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 m-0 flex items-center justify-center bg-background/95' : ''
      }`}
      ref={modelContainerRef}
      onMouseMove={!isRotating ? handleMouseMove : undefined}
    >
      {/* 3D Model Scene */}
      <div 
        className="model-scene relative"
        style={{ 
          transform: `scale(${zoomLevel}) rotateY(${currentAngle}deg)`,
          transition: isRotating ? 'none' : 'transform 0.3s ease',
        }}
      >
        {isLoading ? (
          <div className="model-placeholder aspect-square flex items-center justify-center">
            <div className="animate-pulse text-fashion-primary">
              <RotateCw className="h-12 w-12 animate-spin" />
              <p className="text-center mt-2">Загрузка 3D модели...</p>
            </div>
          </div>
        ) : (
          <div className="aspect-square flex items-center justify-center">
            {/* Для демонстрации используем изображение из массива моделей */}
            <img 
              src={modelImages[viewIndex]} 
              alt={`${alt} - 3D вид ${viewIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            {/* 3D скелет для наглядности */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-full h-full max-w-sm max-h-sm">
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-fashion-primary/10"
                  style={{transform: `translateX(-50%) rotateY(${currentAngle}deg)`}}
                ></div>
                <div 
                  className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 w-full bg-fashion-primary/10"
                  style={{transform: `translateY(-50%) rotateY(${currentAngle}deg)`}}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3D Badge */}
      <div className="absolute top-4 left-4 bg-fashion-primary text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
        <Box className="h-3 w-3 mr-1" />
        3D Модель
      </div>

      {/* View Toggle */}
      {modelImages.length > 1 && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
          {modelImages.map((_, index) => (
            <button 
              key={index}
              className={`w-2 h-2 rounded-full ${viewIndex === index ? 'bg-fashion-primary' : 'bg-muted-foreground/30'}`}
              onClick={() => setViewIndex(index)}
              aria-label={`Вид ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={() => handleManualRotate('left')}
          aria-label="Повернуть влево"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={toggleRotate}
          aria-label={isRotating ? "Остановить вращение" : "Начать вращение"}
        >
          <RotateCw className={`h-4 w-4 ${isRotating ? 'text-fashion-primary' : ''}`} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={() => handleManualRotate('right')}
          aria-label="Повернуть вправо"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        
        <span className="text-xs mx-1">|</span>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={zoomOut}
          aria-label="Уменьшить"
          disabled={zoomLevel <= 0.5}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        
        <span className="text-xs w-8 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={zoomIn}
          aria-label="Увеличить"
          disabled={zoomLevel >= 1.5}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        
        <span className="text-xs mx-1">|</span>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Arrow Controls for View Switching */}
      {modelImages.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/70" 
            onClick={prevView}
            aria-label="Предыдущий вид"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background/70" 
            onClick={nextView}
            aria-label="Следующий вид"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <Button 
          className="absolute top-4 right-4 bg-background/80 hover:bg-background"
          onClick={toggleFullscreen}
        >
          Закрыть
        </Button>
      )}
      
      {/* Instructions */}
      {!isLoading && !isFullscreen && (
        <div className="absolute top-full left-0 right-0 text-center text-xs text-muted-foreground mt-2">
          Нажмите и перетащите для вращения модели или используйте кнопки управления
        </div>
      )}
    </div>
  );
};

export default Model3D;