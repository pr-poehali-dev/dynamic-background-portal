import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Catalog = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriods, setBillingPeriods] = useState<{ [key: string]: 'week' | 'month' }>({});

  const handleBillingChange = (devblogId: string, period: 'week' | 'month') => {
    setBillingPeriods(prev => ({ ...prev, [devblogId]: period }));
  };

  const getBillingPeriod = (devblogId: string) => billingPeriods[devblogId] || 'month';

  const devblogs = [
    {
      id: 'devblog-245',
      name: 'DevBlog 245',
      date: 'Декабрь 2024',
      color: 'cyan',
      icon: 'FileText',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Новая система крафта',
        'Улучшения боевой системы',
        'Оптимизация производительности',
        'Новые строительные блоки'
      ],
      popular: false
    },
    {
      id: 'devblog-244',
      name: 'DevBlog 244',
      date: 'Ноябрь 2024',
      color: 'purple',
      icon: 'Zap',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система транспорта',
        'Новые противники NPC',
        'Улучшенная погода',
        'Новое электричество'
      ],
      popular: true
    },
    {
      id: 'devblog-243',
      name: 'DevBlog 243',
      date: 'Октябрь 2024',
      color: 'pink',
      icon: 'Crown',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система кланов',
        'Рейдовые механики',
        'Новые биомы',
        'Система торговли'
      ],
      popular: false
    },
    {
      id: 'devblog-242',
      name: 'DevBlog 242',
      date: 'Сентябрь 2024',
      color: 'cyan',
      icon: 'Shield',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Улучшенная защита базы',
        'Новые ловушки',
        'Система турелей',
        'Укрепления стен'
      ],
      popular: false
    },
    {
      id: 'devblog-241',
      name: 'DevBlog 241',
      date: 'Август 2024',
      color: 'purple',
      icon: 'Wrench',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Новые инструменты',
        'Система модификаций',
        'Улучшение крафта',
        'Ремонт предметов'
      ],
      popular: false
    },
    {
      id: 'devblog-240',
      name: 'DevBlog 240',
      date: 'Июль 2024',
      color: 'pink',
      icon: 'Users',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система команд',
        'Голосовой чат',
        'Командные задания',
        'Общий инвентарь'
      ],
      popular: false
    },
    {
      id: 'devblog-239',
      name: 'DevBlog 239',
      date: 'Июнь 2024',
      color: 'cyan',
      icon: 'Flame',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Новое оружие',
        'Система стрельбы',
        'Баланс урона',
        'Взрывчатка'
      ],
      popular: false
    },
    {
      id: 'devblog-238',
      name: 'DevBlog 238',
      date: 'Май 2024',
      color: 'purple',
      icon: 'Map',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Расширение карты',
        'Новые локации',
        'Точки интереса',
        'Система навигации'
      ],
      popular: false
    },
    {
      id: 'devblog-237',
      name: 'DevBlog 237',
      date: 'Апрель 2024',
      color: 'pink',
      icon: 'Boxes',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система хранилищ',
        'Новые контейнеры',
        'Автосортировка',
        'Защита лута'
      ],
      popular: false
    },
    {
      id: 'devblog-236',
      name: 'DevBlog 236',
      date: 'Март 2024',
      color: 'cyan',
      icon: 'Pickaxe',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Добыча ресурсов',
        'Новые материалы',
        'Карьеры',
        'Система переработки'
      ],
      popular: false
    },
    {
      id: 'devblog-235',
      name: 'DevBlog 235',
      date: 'Февраль 2024',
      color: 'purple',
      icon: 'Home',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система жилищ',
        'Декорирование',
        'Мебель',
        'Персонализация'
      ],
      popular: false
    },
    {
      id: 'devblog-234',
      name: 'DevBlog 234',
      date: 'Январь 2024',
      color: 'pink',
      icon: 'Skull',
      pricePerHour: 5,
      pricePerWeek: 750,
      pricePerMonth: 2500,
      features: [
        'Система смерти',
        'Потеря предметов',
        'Возрождение',
        'Призраки'
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
            <span className="text-neon-cyan">Каталог</span>
            <span className="text-neon-purple"> DevBlog'ов</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Все обновления и изменения Rust серверов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {devblogs.map((devblog, index) => {
            const colors = getColorClasses(devblog.color);
            return (
              <Card
                key={devblog.id}
                className={`relative bg-card/50 backdrop-blur-sm border ${colors.border} transition-all hover:scale-105 animate-fade-in ${
                  devblog.popular ? 'md:scale-110 border-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {devblog.popular && (
                  <Badge className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r ${colors.gradient} text-background font-orbitron font-bold px-4 py-1 ${colors.glow}`}>
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.glow}`}>
                    <Icon name={devblog.icon as any} size={32} className={colors.text} />
                  </div>
                  <CardTitle className={`text-3xl font-orbitron font-bold ${colors.text}`}>
                    {devblog.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-orbitron font-bold ${colors.text}`}>
                        {getBillingPeriod(devblog.id) === 'week' ? devblog.pricePerWeek : devblog.pricePerMonth}
                      </span>
                      <span className="text-foreground/60">₽</span>
                    </div>
                    <div className="text-sm text-foreground/60">
                      {devblog.pricePerHour}₽/час
                    </div>
                  </div>

                  <Tabs 
                    value={getBillingPeriod(devblog.id)} 
                    onValueChange={(value) => handleBillingChange(devblog.id, value as 'week' | 'month')}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                      <TabsTrigger 
                        value="week" 
                        className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${colors.gradient} data-[state=active]:text-background font-orbitron`}
                      >
                        Неделя
                      </TabsTrigger>
                      <TabsTrigger 
                        value="month"
                        className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${colors.gradient} data-[state=active]:text-background font-orbitron`}
                      >
                        Месяц
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Button
                    onClick={() => setSelectedPlan(devblog.id)}
                    className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-background font-orbitron font-bold ${colors.glow}`}
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