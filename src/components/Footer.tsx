import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FashionMod</h3>
            <p className="text-muted-foreground mb-4">
              Современная одежда с использованием 3D моделей для виртуальной примерки
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Возврат товара
                </Link>
              </li>
              <li>
                <Link to="/sizes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Размерная сетка
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Вопросы и ответы
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">О компании</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Правовая информация
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Подпишитесь на рассылку</h3>
            <p className="text-muted-foreground mb-4">
              Будьте в курсе новостей и получайте специальные предложения
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="bg-background px-4 py-2 rounded-l-md border border-border w-full focus:outline-none focus:ring-1 focus:ring-fashion-primary"
              />
              <Button className="rounded-l-none bg-fashion-primary hover:bg-fashion-primary/90">
                ОК
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-muted-foreground text-sm flex flex-col md:flex-row justify-between">
          <p>© 2023 FashionMod. Все права защищены.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;