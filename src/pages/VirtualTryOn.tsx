import { useState, useRef } from 'react';
import { CameraIcon, RefreshCw, Download, MoveRight, Share2, Cube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Model3D from '@/components/3DModel';

const models = [
  { id: '1', name: 'Куртка с капюшоном', imageUrl: '/placeholder.svg', price: 5990 },
  { id: '2', name: 'Куртка на молнии', imageUrl: '/placeholder.svg', price: 4990 },
  { id: '3', name: 'Пальто удлиненное', imageUrl: '/placeholder.svg', price: 7990 },
];

const avatars = [
  { id: 'avatar1', name: 'Аватар 1', imageUrl: '/placeholder.svg' },
  { id: 'avatar2', name: 'Аватар 2', imageUrl: '/placeholder.svg' },
  { id: 'avatar3', name: 'Аватар 3', imageUrl: '/placeholder.svg' },
];

const VirtualTryOn = () => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [captureMode, setCaptureMode] = useState(false);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [size, setSize] = useState('M');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleModelSelect = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model) {
      setIsLoading(true);
      setSelectedModel(model);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    if (avatar) {
      setIsLoading(true);
      setSelectedAvatar(avatar);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      
      // Симуляция загрузки пользовательского фото
      setTimeout(() => {
        setIsLoading(false);
        // В реальном приложении здесь можно было бы обработать загруженное изображение
      }, 1500);
    }
  };

  const toggleCaptureMode = () => {
    setCaptureMode(!captureMode);
  };

  const takeScreenshot = () => {
    // Заглушка для функции скриншота
    alert('Скриншот сделан!');
  };

  return (
    <>
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Виртуальная примерка</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая панель - настройки аватара */}
            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Ваш аватар</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Выберите шаблон</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          className={`rounded-md overflow-hidden border-2 ${
                            selectedAvatar.id === avatar.id 
                              ? 'border-fashion-primary' 
                              : 'border-transparent'
                          }`}
                          onClick={() => handleAvatarSelect(avatar.id)}
                        >
                          <img 
                            src={avatar.imageUrl} 
                            alt={avatar.name} 
                            className="w-full aspect-square object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="outline" 
                        onClick={triggerFileInput}
                        className="w-full"
                      >
                        <CameraIcon className="mr-2 h-4 w-4" />
                        Загрузить свое фото
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Рост: {height} см</label>
                    <Slider 
                      value={[height]} 
                      min={150} 
                      max={200} 
                      step={1} 
                      onValueChange={(value) => setHeight(value[0])}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Вес: {weight} кг</label>
                    <Slider 
                      value={[weight]} 
                      min={40} 
                      max={120} 
                      step={1} 
                      onValueChange={(value) => setWeight(value[0])}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Размер одежды</label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Выберите одежду</h2>
                
                <div className="space-y-4">
                  {models.map((model) => (
                    <div 
                      key={model.id} 
                      className={`flex items-center p-3 rounded-md border cursor-pointer hover:bg-accent/20 ${
                        selectedModel.id === model.id ? 'border-fashion-primary bg-accent/10' : 'border-border'
                      }`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="w-16 h-16 bg-muted/30 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={model.imageUrl} 
                          alt={model.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {model.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      {selectedModel.id === model.id && (
                        <Cube className="h-5 w-5 text-fashion-primary ml-2" />
                      )}
                    </div>
                  ))}
                  
                  <Link to="/catalog">
                    <Button variant="link" className="p-0 w-full justify-start text-fashion-primary">
                      Посмотреть больше моделей
                      <MoveRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Центральная панель - 3D просмотр */}
            <div className="lg:col-span-2">
              <div className="border rounded-lg h-full">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-semibold">Предпросмотр</h2>
                  <div className="flex items-center space-x-2">
                    {captureMode && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={takeScreenshot}
                      >
                        <CameraIcon className="h-4 w-4 mr-1" />
                        Снимок
                      </Button>
                    )}
                    <Button 
                      variant={captureMode ? "default" : "outline"} 
                      size="sm"
                      className={captureMode ? "bg-fashion-primary hover:bg-fashion-primary/90" : ""}
                      onClick={toggleCaptureMode}
                    >
                      {captureMode ? "Выйти из режима съемки" : "Режим съемки"}
                    </Button>
                  </div>
                </div>
                
                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px]">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 text-fashion-primary animate-spin" />
                      <span className="ml-2">Загрузка модели...</span>
                    </div>
                  ) : (
                    <Model3D 
                      alt={`${selectedModel.name} на аватаре`} 
                      placeholderImageUrl={selectedModel.imageUrl} 
                      productId={selectedModel.id}
                    />
                  )}
                  
                  {captureMode && (
                    <div className="absolute inset-0 pointer-events-none border-4 border-fashion-primary/50 z-10">
                      <div className="absolute top-1/3 left-1/3 right-1/3 bottom-1/3 border-2 border-white/70 border-dashed"></div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t flex flex-wrap gap-3 justify-between">
                  <div>
                    <h3 className="font-medium">{selectedModel.name}</h3>
                    <p className="text-sm text-muted-foreground">Размер: {size}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Поделиться
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Сохранить
                    </Button>
                    <Button size="sm" className="bg-fashion-primary hover:bg-fashion-primary/90" asChild>
                      <Link to={`/product/${selectedModel.id}`}>
                        Перейти к товару
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Как работает виртуальная примерка?</h2>
              <p className="text-muted-foreground">
                Технология виртуальной примерки позволяет создать 3D-модель вашего тела на основе введенных параметров 
                и примерить на неё различные предметы одежды, чтобы увидеть, как они будут выглядеть в реальности.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <Cube className="h-8 w-8 text-fashion-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Выберите модель</h3>
                <p className="text-sm text-muted-foreground">
                  Просматривайте каталог одежды и выбирайте интересующие вас модели для виртуальной примерки.
                </p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <CameraIcon className="h-8 w-8 text-fashion-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Настройте аватар</h3>
                <p className="text-sm text-muted-foreground">
                  Загрузите фото или выберите шаблонный аватар, укажите свои параметры для точной примерки.
                </p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-8 w-8 text-fashion-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Смотрите результат</h3>
                <p className="text-sm text-muted-foreground">
                  Оцените, как одежда сидит на вашей фигуре в 3D, поворачивайте модель и делитесь результатом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VirtualTryOn;