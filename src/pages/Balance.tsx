import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Balance = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const quickAmounts = [500, 1000, 2500, 5000];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard', color: 'cyan', fee: 0 },
    { id: 'qiwi', name: 'QIWI Кошелек', icon: 'Wallet', color: 'purple', fee: 2 },
    { id: 'yoomoney', name: 'ЮMoney', icon: 'DollarSign', color: 'pink', fee: 0 },
    { id: 'crypto', name: 'Криптовалюта', icon: 'Bitcoin', color: 'cyan', fee: 1 }
  ];

  const transactions = [
    { id: 1, type: 'deposit', amount: 1000, method: 'Банковская карта', date: '2024-12-07 14:30', status: 'success' },
    { id: 2, type: 'withdrawal', amount: 500, method: 'DevBlog сервер', date: '2024-12-06 10:15', status: 'success' },
    { id: 3, type: 'deposit', amount: 2500, method: 'ЮMoney', date: '2024-12-05 18:45', status: 'success' },
    { id: 4, type: 'withdrawal', amount: 250, method: 'DevBlog сервер', date: '2024-12-04 09:20', status: 'success' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'border-neon-cyan/30', glow: 'glow-cyan', gradient: 'from-neon-cyan to-neon-purple' },
      purple: { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'border-neon-purple/30', glow: 'glow-purple', gradient: 'from-neon-purple to-neon-pink' },
      pink: { bg: 'bg-neon-pink/10', text: 'text-neon-pink', border: 'border-neon-pink/30', glow: 'glow-pink', gradient: 'from-neon-pink to-neon-cyan' }
    };
    return colors[color as keyof typeof colors];
  };

  const handlePayment = () => {
    if (!amount || !selectedMethod) return;
    alert(`Пополнение на ${amount}₽ через ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Пополнение</span>
            <span className="text-neon-purple"> баланса</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Быстрое и безопасное пополнение счета
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron text-neon-cyan flex items-center gap-3">
                  <Icon name="Wallet" size={28} />
                  Текущий баланс: 
                  <span className="text-3xl ml-2">1,250₽</span>
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-purple">Сумма пополнения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="text-2xl font-orbitron h-16 bg-muted/50 border-primary/20 focus:border-neon-purple"
                  />
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {quickAmounts.map((value) => (
                      <Button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        variant="outline"
                        className="border-neon-purple/30 hover:bg-neon-purple/10 hover:border-neon-purple/60"
                      >
                        {value}₽
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-orbitron text-foreground mb-4">Способ оплаты</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const colors = getColorClasses(method.color);
                      const isSelected = selectedMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 border-2 rounded-xl transition-all hover:scale-105 ${
                            isSelected
                              ? `${colors.border} ${colors.bg} ${colors.glow}`
                              : 'border-muted/30 bg-muted/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                              <Icon name={method.icon as any} size={20} className={colors.text} />
                            </div>
                            <div className="text-left flex-1">
                              <p className={`font-semibold ${isSelected ? colors.text : 'text-foreground'}`}>
                                {method.name}
                              </p>
                              {method.fee > 0 && (
                                <p className="text-xs text-foreground/60">Комиссия {method.fee}%</p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {amount && selectedMethod && (
                  <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-foreground/80">Сумма:</span>
                      <span className="font-orbitron text-neon-cyan">{amount}₽</span>
                    </div>
                    {paymentMethods.find(m => m.id === selectedMethod)?.fee! > 0 && (
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-foreground/80">Комиссия:</span>
                        <span className="font-orbitron text-foreground/60">
                          {(parseFloat(amount) * paymentMethods.find(m => m.id === selectedMethod)!.fee / 100).toFixed(2)}₽
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-neon-cyan/30">
                      <span className="font-bold text-foreground">К оплате:</span>
                      <span className="font-orbitron font-bold text-xl text-neon-cyan">
                        {(parseFloat(amount) * (1 + (paymentMethods.find(m => m.id === selectedMethod)?.fee || 0) / 100)).toFixed(2)}₽
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={!amount || !selectedMethod}
                  className="w-full h-14 text-lg bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-bold glow-cyan disabled:opacity-50"
                >
                  <Icon name="CreditCard" size={24} className="mr-2" />
                  Пополнить баланс
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-neon-pink/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-pink flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Бонусы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground/80">От 5000₽</span>
                    <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">+5%</Badge>
                  </div>
                  <p className="text-xs text-foreground/60">Бонус при пополнении</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground/80">От 10000₽</span>
                    <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">+10%</Badge>
                  </div>
                  <p className="text-xs text-foreground/60">Бонус при пополнении</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-cyan flex items-center gap-2">
                  <Icon name="History" size={24} />
                  История операций
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {transactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon
                          name={transaction.type === 'deposit' ? 'ArrowDown' : 'ArrowUp'}
                          size={16}
                          className={transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}
                        />
                        <span className={`font-orbitron ${
                          transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}₽
                        </span>
                      </div>
                      <Badge variant="outline" className="border-green-500/30 text-green-500">
                        {transaction.status === 'success' ? 'Успешно' : 'В обработке'}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground/60">{transaction.method}</p>
                    <p className="text-xs text-foreground/40">{transaction.date}</p>
                  </div>
                ))}
                <Button 
                  onClick={() => alert('Полная история транзакций')}
                  variant="outline" 
                  className="w-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                >
                  <Icon name="List" size={18} className="mr-2" />
                  Смотреть все
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;