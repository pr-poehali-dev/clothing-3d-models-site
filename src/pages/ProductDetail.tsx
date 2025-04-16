import { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  ChevronRight,
  Truck,
  RefreshCw,
  Shield,
  Cube
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Model3D from '@/components/3DModel';
import ProductCard from '@/components/ProductCard';

// Временные данные для демонстрации
const productData = {
  id: '1',
  name: 'Куртка с капюшоном',
  price: 5990,
  description: 'Стильная куртка с капюшоном, выполненная из водонепроницаемого материала. Идеально подходит для прохладной погоды.',
  details: [
    'Материал: 100% полиэстер',
    'Водонепроницаемое покрытие',
    'Капюшон с регулировкой',
    'Два боковых кармана на молнии',
    'Машинная стирка при температуре 30°C'
  ],
  colors: [
    { id: '#000000', name: 'Черный' },
    { id: '#3B82F6', name: 'Синий' },
    { id: '#FFFFFF', name: 'Белый' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  is3DAvailable: true,
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  category: 'Верхняя одежда',
  sku: 'JK-001-BL',
  reviews: {
    count: 24,
    rating: 4.7
  }
};

// Похожие товары
const relatedProducts = [
  {
    id: '2',
    name: 'Куртка на молнии',
    price: 4990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#3B82F6'],
    sizes: ['S', 'M', 'L', 'XL'],
    is3DAvailable: true
  },
  {
    id: '3',
    name: 'Пальто удлиненное',
    price: 7990,
    imageUrl: '/placeholder.svg',
    colors: ['#000000', '#FAFAFA'],
    sizes: ['S', 'M', 'L'],
    is3DAvailable: true
  },
  {
    id: '4',
    name: 'Куртка утепленная',
    price: 6490,
    imageUrl: '/placeholder.svg',
    colors: ['#3B82F6', '#22C55E'],
    sizes: ['M', 'L', 'XL'],
    is3DAvailable: true
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState(productData.colors[0].id);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleModel = () => {
    setShowModel(!showModel);
  };

  return (
    <>
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Главная</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/catalog" className="hover:text-foreground">Каталог</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/catalog/outerwear" className="hover:text-foreground">{productData.category}</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground truncate">{productData.name}</span>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg overflow-hidden">
                {showModel ? (
                  <Model3D 
                    alt={productData.name} 
                    placeholderImageUrl={productData.images[activeImageIndex]} 
                    productId={id}
                  />
                ) : (
                  <div className="relative">
                    <img 
                      src={productData.images[activeImageIndex]} 
                      alt={productData.name} 
                      className="w-full aspect-square object-cover"
                    />
                    {productData.is3DAvailable && (
                      <button
                        className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-fashion-primary hover:text-white transition-colors"
                        onClick={toggleModel}
                        title="Открыть 3D модель"
                      >
                        <Cube className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {productData.is3DAvailable && (
                  <Button 
                    variant={showModel ? "default" : "outline"}
                    className={showModel ? "bg-fashion-primary hover:bg-fashion-primary/90" : ""}
                    onClick={toggleModel}
                  >
                    {showModel ? "2D фото" : "3D модель"}
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`rounded border ${
                      activeImageIndex === index 
                        ? 'border-fashion-primary' 
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                    onClick={() => {
                      setActiveImageIndex(index);
                      if (showModel) setShowModel(false);
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${productData.name} фото ${index + 1}`} 
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      {star <= Math.round(productData.reviews.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {productData.reviews.rating} ({productData.reviews.count} отзывов)
                </span>
              </div>
              
              <p className="text-2xl font-bold mb-6">
                {productData.price.toLocaleString('ru-RU')} ₽
              </p>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Артикул: {productData.sku}
                </p>
                <p className="mb-4">{productData.description}</p>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Цвет</h3>
                <div className="flex space-x-2">
                  {productData.colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color.id 
                          ? 'ring-2 ring-fashion-primary ring-offset-2' 
                          : 'ring-0'
                      }`}
                      style={{ backgroundColor: color.id }}
                      onClick={() => setSelectedColor(color.id)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Размер</h3>
                  <Button variant="link" className="p-0 h-auto text-fashion-primary">
                    Размерная сетка
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-10 min-w-10 px-3 border rounded flex items-center justify-center ${
                        selectedSize === size
                          ? 'border-fashion-primary bg-fashion-primary/10 text-fashion-primary'
                          : 'border-border'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 3D Virtual Try On */}
              {productData.is3DAvailable && (
                <div className="mb-6 p-4 border rounded-lg bg-accent/20">
                  <div className="flex items-start">
                    <Cube className="h-5 w-5 mr-3 text-fashion-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Виртуальная примерка</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Оцените как будет сидеть модель с помощью 3D-примерки
                      </p>
                      <Button 
                        className="bg-fashion-primary hover:bg-fashion-primary/90"
                        onClick={toggleModel}
                      >
                        <Cube className="h-4 w-4 mr-2" />
                        Примерить в 3D
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-border rounded">
                  <button 
                    className="px-3 py-2 text-muted-foreground" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-3 py-2">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-muted-foreground" 
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  className="flex-1 bg-fashion-primary hover:bg-fashion-primary/90 text-white"
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  В корзину
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Delivery Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-3 text-fashion-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Доставка</h4>
                    <p className="text-sm text-muted-foreground">
                      Бесплатная доставка при заказе от 5000 ₽
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RefreshCw className="h-5 w-5 mr-3 text-fashion-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Возврат</h4>
                    <p className="text-sm text-muted-foreground">
                      30 дней для возврата товара
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 text-fashion-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Гарантия</h4>
                    <p className="text-sm text-muted-foreground">
                      Гарантия качества на все товары
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Характеристики</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                <TabsTrigger value="delivery">Доставка и оплата</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-6">
                <ul className="space-y-2">
                  {productData.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-fashion-primary">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Отзывы покупателей</h3>
                    <p className="text-muted-foreground">
                      {productData.reviews.count} отзывов, средняя оценка {productData.reviews.rating}
                    </p>
                  </div>
                  <Button>Написать отзыв</Button>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Здесь будут отображаться отзывы о товаре</p>
                </div>
              </TabsContent>
              
              <TabsContent value="delivery" className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="delivery">
                    <AccordionTrigger>Способы доставки</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Курьерская доставка</span>
                          <span>400 ₽</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Самовывоз из магазина</span>
                          <span>Бесплатно</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Пункты выдачи</span>
                          <span>300 ₽</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Почта России</span>
                          <span>350 ₽</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="payment">
                    <AccordionTrigger>Способы оплаты</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li>Банковская карта онлайн</li>
                        <li>Наличными при получении</li>
                        <li>Банковской картой при получении</li>
                        <li>СБП (Система быстрых платежей)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="return">
                    <AccordionTrigger>Условия возврата</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        Вы можете вернуть товар в течение 30 дней с момента получения заказа.
                      </p>
                      <p>
                        Товар должен быть в оригинальной упаковке, с сохранением всех ярлыков и бирок, без следов использования.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Похожие товары</h2>
              <Button variant="ghost" asChild>
                <Link to="/catalog" className="flex items-center">
                  Смотреть все <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;