import { useState, useEffect } from 'react';
import { RotateCw, Maximize, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Model3DProps {
  modelUrl?: string;
  alt: string;
  placeholderImageUrl?: string;
}

const Model3D = ({ modelUrl, alt, placeholderImageUrl = '/placeholder.svg' }: Model3DProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Имитация загрузки 3D модели
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
  };

  return (
    <div 
      className={`model-container relative bg-muted/30 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 m-0 flex items-center justify-center bg-background/95' : ''
      }`}
    >
      {/* 3D Model Scene */}
      <div 
        className={`model-scene relative ${
          isRotating ? 'animate-rotate-model' : ''
        }`}
        style={{ 
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease'
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
            {/* Здесь будет встроена 3D модель через iframe или canvas */}
            {/* Для демонстрации используется просто изображение */}
            <img 
              src={placeholderImageUrl} 
              alt={alt} 
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2">
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

      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <Button 
          className="absolute top-4 right-4 bg-background/80 hover:bg-background"
          onClick={toggleFullscreen}
        >
          Закрыть
        </Button>
      )}
    </div>
  );
};

export default Model3D;