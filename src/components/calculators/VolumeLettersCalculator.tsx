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
    <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default VolumeLettersCalculator;
