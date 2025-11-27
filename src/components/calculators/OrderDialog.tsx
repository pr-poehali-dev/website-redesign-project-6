import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface OrderDialogProps {
  calculatorType: string;
  price: number;
  details: Record<string, string>;
  children: React.ReactNode;
  imageData?: string;
  onImageCleanup?: () => void;
}

const OrderDialog = ({ calculatorType, price, details, children, imageData, onImageCleanup }: OrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s-]/g, '');
    
    const cityPattern = /^\d{2}-?\d{2}-?\d{2}$/;
    const cityWithCodePattern = /^\+?7\s?\d{4}\s?\d{2}-?\d{2}-?\d{2}$/;
    const federalPattern = /^\+?7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    const cleanedFederal = /^\+?7\d{10}$/;
    
    return cityPattern.test(phone) || 
           cityWithCodePattern.test(phone) || 
           federalPattern.test(phone) ||
           cleanedFederal.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите ваше имя",
        variant: "destructive",
      });
      return;
    }

    if (!phone.trim()) {
      setPhoneError("Укажите номер телефона");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Неверный формат. Примеры: 31-31-70, +7 4162 31-31-70, +7 965 671 31 70");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://functions.poehali.dev/c848bf2f-05f1-42c0-b695-5d345ad19872", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calculatorType,
          name,
          phone,
          email,
          price,
          details,
          imageData,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      if (imageData && onImageCleanup) {
        onImageCleanup();
      }

      setName("");
      setPhone("");
      setEmail("");
      setConsent(false);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заказать расчёт</DialogTitle>
          <DialogDescription>
            Оставьте контакты, и мы свяжемся с вами для уточнения деталей
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              required
              minLength={2}
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              placeholder="31-31-70 или +7 965 671 31 70"
              required
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
            />
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent-dialog"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="consent-dialog" className="text-sm text-muted-foreground leading-relaxed">
                Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в <a href="/consent" className="text-primary hover:underline" target="_blank">Согласии на обработку персональных данных</a> *
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || !consent}>
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;