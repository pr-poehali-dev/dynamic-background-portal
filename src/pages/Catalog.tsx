import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Catalog = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 399,
      color: 'cyan',
      icon: 'Rocket',
      features: [
        '2 GB RAM',
        '20 GB SSD',
        '2 ядра CPU',
        'До 10 игроков',
        'Базовая защита',
        'Поддержка 24/7'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 799,
      color: 'purple',
      icon: 'Zap',
      features: [
        '4 GB RAM',
        '40 GB NVMe',
        '4 ядра CPU',
        'До 30 игроков',
        'DDoS защита Pro',
        'Приоритетная поддержка',
        'Бесплатный бэкап'
      ],
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: 1499,
      color: 'pink',
      icon: 'Crown',
      features: [
        '8 GB RAM',
        '80 GB NVMe',
        '8 ядер CPU',
        'Без ограничений',
        'DDoS защита Ultimate',
        'Персональный менеджер',
        'Автобэкапы каждый час',
        'Dedicated IP'
      ],
      popular: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: {
        border: 'border-neon-cyan/30 hover:border-neon-cyan/60',
        bg: 'bg-neon-cyan/10',
        text: 'text-neon-cyan',
        glow: 'glow-cyan',
        gradient: 'from-neon-cyan to-neon-purple'
      },
      purple: {
        border: 'border-neon-purple/30 hover:border-neon-purple/60',
        bg: 'bg-neon-purple/10',
        text: 'text-neon-purple',
        glow: 'glow-purple',
        gradient: 'from-neon-purple to-neon-pink'
      },
      pink: {
        border: 'border-neon-pink/30 hover:border-neon-pink/60',
        bg: 'bg-neon-pink/10',
        text: 'text-neon-pink',
        glow: 'glow-pink',
        gradient: 'from-neon-pink to-neon-cyan'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Выбери</span>
            <span className="text-neon-purple"> свой тариф</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Подберите идеальную конфигурацию для вашего сервера
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const colors = getColorClasses(plan.color);
            return (
              <Card
                key={plan.id}
                className={`relative bg-card/50 backdrop-blur-sm border ${colors.border} transition-all hover:scale-105 animate-fade-in ${
                  plan.popular ? 'md:scale-110 border-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.popular && (
                  <Badge className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r ${colors.gradient} text-background font-orbitron font-bold px-4 py-1 ${colors.glow}`}>
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.glow}`}>
                    <Icon name={plan.icon as any} size={32} className={colors.text} />
                  </div>
                  <CardTitle className={`text-3xl font-orbitron font-bold ${colors.text}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-4xl font-orbitron font-black text-foreground mt-4">
                    {plan.price}₽
                    <span className="text-sm text-foreground/60 font-inter font-normal">/мес</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded flex items-center justify-center flex-shrink-0`}>
                          <Icon name="Check" size={14} className={colors.text} />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full mt-6 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-background font-orbitron font-bold ${colors.glow}`}
                  >
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-foreground/60 mb-4">Нужна помощь с выбором?</p>
          <Button variant="outline" className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10">
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Связаться с поддержкой
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
