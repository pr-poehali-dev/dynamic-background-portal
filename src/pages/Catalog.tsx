import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Catalog = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const devblogs = [
    {
      id: 'devblog-1',
      name: 'DevBlog 245',
      date: 'Декабрь 2024',
      color: 'cyan',
      icon: 'FileText',
      features: [
        'Новая система крафта',
        'Улучшения боевой системы',
        'Оптимизация производительности',
        'Новые строительные блоки',
        'Изменения баланса оружия',
        'Фиксы багов'
      ],
      popular: false
    },
    {
      id: 'devblog-2',
      name: 'DevBlog 244',
      date: 'Ноябрь 2024',
      color: 'purple',
      icon: 'Zap',
      features: [
        'Система транспорта',
        'Новые противники NPC',
        'Улучшенная погода',
        'Новое электричество',
        'Система достижений',
        'Улучшенный UI',
        'Новые эвенты'
      ],
      popular: true
    },
    {
      id: 'devblog-3',
      name: 'DevBlog 243',
      date: 'Октябрь 2024',
      color: 'pink',
      icon: 'Crown',
      features: [
        'Система кланов',
        'Рейдовые механики',
        'Новые биомы',
        'Система торговли',
        'Улучшения PvP',
        'Новые постройки',
        'Система репутации',
        'Командные бонусы'
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
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.glow}`}>
                    <Icon name={devblog.icon as any} size={32} className={colors.text} />
                  </div>
                  <CardTitle className={`text-3xl font-orbitron font-bold ${colors.text}`}>
                    {devblog.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-orbitron text-foreground/70 mt-4">
                    {devblog.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {devblog.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded flex items-center justify-center flex-shrink-0`}>
                          <Icon name="Check" size={14} className={colors.text} />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setSelectedPlan(devblog.id)}
                    className={`w-full mt-6 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-background font-orbitron font-bold ${colors.glow}`}
                  >
                    Читать подробнее
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