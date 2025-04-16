import { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-fashion-primary">
            FashionMod
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium hover:text-fashion-primary transition-colors">
              Главная
            </Link>
            <Link to="/catalog" className="font-medium hover:text-fashion-primary transition-colors">
              Каталог
            </Link>
            <Link to="/collections" className="font-medium hover:text-fashion-primary transition-colors">
              Коллекции
            </Link>
            <Link to="/about" className="font-medium hover:text-fashion-primary transition-colors">
              О нас
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-fashion-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium py-2 hover:text-fashion-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className="font-medium py-2 hover:text-fashion-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link 
              to="/collections" 
              className="font-medium py-2 hover:text-fashion-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Коллекции
            </Link>
            <Link 
              to="/about" 
              className="font-medium py-2 hover:text-fashion-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </Link>
            <div className="flex space-x-4 pt-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-fashion-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;