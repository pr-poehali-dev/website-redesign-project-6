import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeroSection from "@/components/sections/HeroSection";
import ContentSections from "@/components/sections/ContentSections";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center flex-shrink-0">
            <img 
              src="https://cdn.poehali.dev/files/7cf77388-efea-4dbb-b3ab-3fe7c87d39b8.png" 
              alt="Графика" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end">
            <a 
              href="https://wa.me/74162227678" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Icon name="MessageCircle" size={24} className="text-[#25D366]" />
            </a>
            <a 
              href="https://t.me/grafika28" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Icon name="Send" size={24} className="text-[#0088cc]" />
            </a>
            <a 
              href="tel:+74162227678"
              className="hover:opacity-80 transition-opacity"
            >
              <Icon name="Phone" size={24} className="text-primary" />
            </a>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button size="lg" variant="ghost">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <a 
                    href="#services" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Услуги
                  </a>
                  <a 
                    href="#calculators" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Калькуляторы
                  </a>
                  <a 
                    href="#portfolio" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Портфолио
                  </a>
                  <a 
                    href="#advantages" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Преимущества
                  </a>
                  <a 
                    href="#testimonials" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Отзывы
                  </a>
                  <a 
                    href="#contacts" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Контакты
                  </a>
                  <Button size="lg" className="mt-4" asChild>
                    <a href="tel:+74162227678">
                      <Icon name="Phone" size={18} className="mr-2" />
                      +7 (4162) 22-76-78
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <HeroSection />
      <ContentSections />
      <ContactSection />
    </div>
  );
};

export default Index;