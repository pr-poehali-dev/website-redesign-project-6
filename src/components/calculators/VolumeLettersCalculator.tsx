import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface VolumeLettersCalculatorProps {
  signText: string;
  setSignText: (value: string) => void;
  needsBracket: boolean;
  setNeedsBracket: (value: boolean) => void;
  needsInstallation: boolean;
  setNeedsInstallation: (value: boolean) => void;
  calculatePrice: () => number;
}

const VolumeLettersCalculator = ({
  signText,
  setSignText,
  needsBracket,
  setNeedsBracket,
  needsInstallation,
  setNeedsInstallation,
  calculatePrice,
}: VolumeLettersCalculatorProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card className="shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Текст вывески</label>
              <Input 
                value={signText}
                onChange={(e) => setSignText(e.target.value)}
                placeholder="Введите текст для вывески"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Укажите текст, который будет изготовлен объёмными буквами
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="bracket" 
                    checked={needsBracket}
                    onCheckedChange={(checked) => setNeedsBracket(checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor="bracket" className="text-sm font-medium cursor-pointer block mb-1">
                      Требуется панель-кронштейн
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Металлическая несущая конструкция для крепления объёмных букв к фасаду павильона
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="installation" 
                    checked={needsInstallation}
                    onCheckedChange={(checked) => setNeedsInstallation(checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor="installation" className="text-sm font-medium cursor-pointer block mb-1">
                      Требуется монтаж
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Профессиональная установка вывески на павильон НТО
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Предварительная стоимость:</span>
                <span className="text-2xl font-bold text-primary">
                  {calculatePrice().toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="border-t pt-3 space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Объёмные буквы:</span>
                  <span>от 2000 ₽/буква</span>
                </div>
                {needsBracket && (
                  <div className="flex justify-between">
                    <span>Панель-кронштейн:</span>
                    <span>15 000 ₽</span>
                  </div>
                )}
                {needsInstallation && (
                  <div className="flex justify-between">
                    <span>Монтаж:</span>
                    <span>10 000 ₽</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground border-t pt-3">
                * Итоговая стоимость зависит от размера букв, типа подсветки и сложности монтажа
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              disabled={!signText.trim()}
              onClick={() => {
                const contactSection = document.getElementById('contacts');
                const nameInput = document.querySelector('input[placeholder="Ваше имя"]') as HTMLInputElement;
                const messageInput = document.querySelector('textarea[placeholder="Ваше сообщение"]') as HTMLTextAreaElement;
                
                if (messageInput) {
                  const details = `Объёмные буквы на павильон НТО:\n- Текст: "${signText}"\n${needsBracket ? '- Панель-кронштейн: Да\n' : ''}${needsInstallation ? '- Монтаж: Да\n' : ''}\nПредварительная стоимость: ${calculatePrice().toLocaleString('ru-RU')} ₽`;
                  messageInput.value = details;
                }
                
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    if (nameInput) nameInput.focus();
                  }, 800);
                }
              }}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Отправить заявку
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-6">Предпросмотр вывески</h3>
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-8 md:p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              {needsBracket && (
                <div className="relative flex items-center justify-center" style={{ width: '200px', height: '200px' }}>
                  <div className="absolute inset-0 bg-white rounded-full shadow-2xl"></div>
                  <span className="relative text-gray-800 font-bold text-2xl">ЛОГО</span>
                </div>
              )}
              
              <div className="text-center">
                <div 
                  className="text-white font-bold tracking-wide"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '92px',
                    lineHeight: '1.2',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.3)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {signText || 'ВВЕДИТЕ ТЕКСТ'}
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Высота букв: 23 см | Шрифт: Geometria Bold
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Предпросмотр вывески на павильоне НТО. Итоговый вид может отличаться.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default VolumeLettersCalculator;