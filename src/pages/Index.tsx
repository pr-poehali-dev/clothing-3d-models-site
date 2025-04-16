import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedCollection from '@/components/FeaturedCollection';
import Model3D from '@/components/3DModel';

// Временные данные для демонстрации
const featuredProducts = [
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
  }
];

const HomePage = () => {
  const [activeModelIndex, setActiveModelIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent z-10" />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Одежда нового поколения с 3D моделями
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Примерьте виртуально перед покупкой. Создайте свой идеальный образ с помощью технологий 3D моделирования.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-fashion-primary hover:bg-fashion-primary/90"
                  size="lg"
                  asChild
                >
                  <Link to="/catalog">
                    Перейти в каталог
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/how-it-works">
                    Как это работает
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background 3D model or image */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
            <Model3D alt="Модель одежды" />
          </div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Популярные категории</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/catalog/women" className="group relative rounded-lg overflow-hidden aspect-[3/4] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Женская одежда" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">Женская одежда</h3>
                  <span className="inline-flex items-center text-fashion-primary">
                    Смотреть <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
              
              <Link to="/catalog/men" className="group relative rounded-lg overflow-hidden aspect-[3/4] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Мужская одежда" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">Мужская одежда</h3>
                  <span className="inline-flex items-center text-fashion-primary">
                    Смотреть <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
              
              <Link to="/catalog/accessories" className="group relative rounded-lg overflow-hidden aspect-[3/4] bg-muted">
                <img 
                  src="/placeholder.svg" 
                  alt="Аксессуары" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">Аксессуары</h3>
                  <span className="inline-flex items-center text-fashion-primary">
                    Смотреть <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Популярные товары</h2>
              <Button variant="ghost" asChild>
                <Link to="/catalog" className="flex items-center">
                  Все товары <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  onMouseEnter={() => product.is3DAvailable && setActiveModelIndex(index)}
                  onMouseLeave={() => setActiveModelIndex(null)}
                >
                  <ProductCard 
                    {...product}
                    imageUrl={activeModelIndex === index && product.is3DAvailable ? "/placeholder.svg" : product.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Collection */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FeaturedCollection 
              title="Осенняя коллекция 2023"
              description="Встречайте осень с нашей новой коллекцией, созданной с использованием современных материалов и инновационных технологий. Каждый предмет одежды доступен в 3D для виртуальной примерки."
              imageUrl="/placeholder.svg"
              linkUrl="/collections/autumn-2023"
              showModel={true}
            />
          </div>
        </section>
        
        {/* 3D Virtual Try-On Feature */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Виртуальная примерка в 3D</h2>
                <p className="text-muted-foreground mb-6">
                  Примерьте одежду виртуально перед покупкой. Наша технология 3D моделирования позволяет увидеть, как вещь будет выглядеть на вас, без необходимости посещать магазин.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2 text-fashion-primary">✓</span>
                    <span>Точные 3D модели соответствуют реальным размерам</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-fashion-primary">✓</span>
                    <span>Возможность просмотра со всех сторон</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-fashion-primary">✓</span>
                    <span>Примерка разных цветов и комбинаций</span>
                  </li>
                </ul>
                <Button className="bg-fashion-primary hover:bg-fashion-primary/90" asChild>
                  <Link to="/virtual-try-on">
                    Попробовать сейчас
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Model3D alt="Виртуальная примерка" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">Почему выбирают нас</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-fashion-primary/10 text-fashion-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">3D визуализация</h3>
                <p className="text-muted-foreground">
                  Технология 3D моделирования позволяет детально рассмотреть каждый предмет одежды перед покупкой
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-fashion-primary/10 text-fashion-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">👕</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Идеальная посадка</h3>
                <p className="text-muted-foreground">
                  Виртуальная примерка поможет определиться с размером и избежать возвратов
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-fashion-primary/10 text-fashion-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🛍️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">
                  Доставка за 1-3 дня после оформления заказа в крупных городах России
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HomePage;