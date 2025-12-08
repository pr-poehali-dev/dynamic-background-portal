import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [hasHosting, setHasHosting] = useState(false);

  useEffect(() => {
    const hosting = localStorage.getItem('hasHosting');
    if (hosting === 'true') {
      setHasHosting(true);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-orbitron font-black">
              <span className="text-neon-cyan">CYBER</span>
              <span className="text-neon-purple"> HOST</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-inter">
              Премиум игровой хостинг нового поколения
            </p>
            <p className="text-lg text-foreground/60 max-w-xl mx-auto">
              Мощные серверы с технологией неонового ускорения
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-12 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => navigate('/catalog')}
              size="lg"
              className="group relative px-8 py-6 bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-bold text-lg glow-cyan transition-all hover:scale-105"
            >
              <Icon name="ShoppingBag" size={24} className="mr-3" />
              Посмотреть каталог
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity" />
            </Button>

            {hasHosting && (
              <Button
                onClick={() => navigate('/servers')}
                size="lg"
                className="group relative px-8 py-6 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg glow-purple transition-all hover:scale-105"
              >
                <Icon name="Server" size={24} className="mr-3" />
                Зайти на хост
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="p-6 bg-card/50 backdrop-blur-sm border border-neon-cyan/30 rounded-xl hover:border-neon-cyan/60 transition-all hover:scale-105 group">
              <div className="w-14 h-14 bg-neon-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
                <Icon name="Zap" size={28} className="text-neon-cyan" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-neon-cyan mb-2">Мгновенный запуск</h3>
              <p className="text-foreground/70">Сервер готов к работе за 30 секунд</p>
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm border border-neon-purple/30 rounded-xl hover:border-neon-purple/60 transition-all hover:scale-105 group">
              <div className="w-14 h-14 bg-neon-purple/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-purple transition-all">
                <Icon name="Shield" size={28} className="text-neon-purple" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-neon-purple mb-2">DDoS защита</h3>
              <p className="text-foreground/70">Максимальная безопасность 24/7</p>
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm border border-neon-pink/30 rounded-xl hover:border-neon-pink/60 transition-all hover:scale-105 group">
              <div className="w-14 h-14 bg-neon-pink/10 rounded-lg flex items-center justify-center mb-4 group-hover:glow-pink transition-all">
                <Icon name="Headphones" size={28} className="text-neon-pink" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-neon-pink mb-2">Поддержка 24/7</h3>
              <p className="text-foreground/70">Всегда на связи в любое время</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 w-full max-w-4xl animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 hover:border-neon-cyan/60 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron text-neon-cyan flex items-center gap-2">
                  <Icon name="Mail" size={24} />
                  Контакты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="mailto:support@cyberhost.com" className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all">
                  <Icon name="Mail" size={20} className="text-neon-cyan" />
                  <span className="text-foreground/80">support@cyberhost.com</span>
                </a>
                <a href="tel:+78005553535" className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all">
                  <Icon name="Phone" size={20} className="text-neon-cyan" />
                  <span className="text-foreground/80">+7 (800) 555-35-35</span>
                </a>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={20} className="text-neon-cyan" />
                  <span className="text-foreground/80">Круглосуточно</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30 hover:border-neon-purple/60 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron text-neon-purple flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Соцсети
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsSocialOpen(true)}
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold glow-purple"
                >
                  <Icon name="Share2" size={20} className="mr-2" />
                  Наши соцсети
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isSocialOpen} onOpenChange={setIsSocialOpen}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-center text-neon-purple">Выберите платформу</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <Button
              onClick={() => window.open('https://discord.gg/cyberhost', '_blank')}
              className="w-full h-16 bg-gradient-to-r from-[#5865F2] to-[#7289DA] hover:opacity-90 text-white font-orbitron font-bold text-lg"
            >
              <Icon name="MessageSquare" size={24} className="mr-3" />
              Discord
            </Button>
            <Button
              onClick={() => window.open('https://vk.com/cyberhost', '_blank')}
              className="w-full h-16 bg-gradient-to-r from-[#0077FF] to-[#4A76A8] hover:opacity-90 text-white font-orbitron font-bold text-lg"
            >
              <Icon name="Users" size={24} className="mr-3" />
              ВКонтакте
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;