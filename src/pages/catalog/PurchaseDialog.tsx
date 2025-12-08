import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { DevBlog, getPaymentMethodName } from './catalogData';

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  devblog: DevBlog | null;
  billingPeriod: 'week' | 'month';
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const PurchaseDialog = ({
  isOpen,
  onOpenChange,
  devblog,
  billingPeriod,
  selectedPaymentMethod,
  onPaymentMethodChange
}: PurchaseDialogProps) => {
  const navigate = useNavigate();

  if (!devblog) return null;

  const handlePurchase = () => {
    const period = billingPeriod;
    const price = period === 'week' ? devblog.pricePerWeek : devblog.pricePerMonth;
    const commission = selectedPaymentMethod === 'qiwi' ? price * 0.02 : selectedPaymentMethod === 'crypto' ? price * 0.01 : 0;
    const total = price + commission;
    
    const transaction = {
      id: `TXN-${Date.now()}`,
      type: 'purchase',
      devblog: devblog.name,
      period: period === 'week' ? 'Неделя' : 'Месяц',
      amount: total,
      paymentMethod: selectedPaymentMethod,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    
    localStorage.setItem('lastTransaction', JSON.stringify(transaction));
    localStorage.setItem('hasHosting', 'true');
    localStorage.setItem('activeServer', JSON.stringify({
      devblog: devblog.name,
      core: devblog.serverCore,
      client: devblog.clientDownload,
      port: devblog.serverPort,
      purchaseDate: new Date().toISOString()
    }));
    
    onOpenChange(false);
    alert(`✅ Оплата успешна!\n\nСервер ${devblog.name} активирован!\n\nСумма: ${total}₽\nСпособ оплаты: ${getPaymentMethodName(selectedPaymentMethod)}\n\nТеперь вы можете:\n• Зайти в раздел "Серверы"\n• Скачать клиент для подключения\n• Управлять сервером`);
    navigate('/servers');
  };

  const price = billingPeriod === 'week' ? devblog.pricePerWeek : devblog.pricePerMonth;
  const commission = selectedPaymentMethod === 'qiwi' ? Math.round(price * 0.02) : selectedPaymentMethod === 'crypto' ? Math.round(price * 0.01) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron text-center">
            Оплата хостинга
          </DialogTitle>
          <DialogDescription className="text-center">
            {devblog.name} • {billingPeriod === 'week' ? 'Неделя' : 'Месяц'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-orbitron font-bold text-neon-cyan">
              {price}₽
            </div>
            <div className="text-sm text-foreground/60 mt-1">
              {devblog.pricePerHour}₽/час
            </div>
          </div>

          <div>
            <Label className="text-base font-orbitron mb-4 block">Выберите способ оплаты:</Label>
            <RadioGroup value={selectedPaymentMethod} onValueChange={onPaymentMethodChange}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-neon-cyan/30">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="CreditCard" size={20} className="text-neon-cyan" />
                    <div>
                      <div className="font-medium">Банковская карта</div>
                      <div className="text-sm text-foreground/60">Без комиссии • Мгновенно</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-neon-purple/30">
                  <RadioGroupItem value="qiwi" id="qiwi" />
                  <Label htmlFor="qiwi" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="Wallet" size={20} className="text-neon-purple" />
                    <div>
                      <div className="font-medium">QIWI Кошелёк</div>
                      <div className="text-sm text-foreground/60">Комиссия 2% • Быстро</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-neon-pink/30">
                  <RadioGroupItem value="yoomoney" id="yoomoney" />
                  <Label htmlFor="yoomoney" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="Banknote" size={20} className="text-neon-pink" />
                    <div>
                      <div className="font-medium">ЮMoney</div>
                      <div className="text-sm text-foreground/60">Без комиссии • Надёжно</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-neon-cyan/30">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="Bitcoin" size={20} className="text-neon-cyan" />
                    <div>
                      <div className="font-medium">Криптовалюта</div>
                      <div className="text-sm text-foreground/60">Комиссия 1% • Анонимно</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-cyan"
          >
            <Icon name="Lock" size={20} className="mr-2" />
            Оплатить {price}₽{commission > 0 && ` + ${commission}₽`}
          </Button>

          <p className="text-xs text-center text-foreground/50">
            Нажимая "Оплатить", вы соглашаетесь с условиями использования
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
