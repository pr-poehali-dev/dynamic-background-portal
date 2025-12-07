import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Servers = () => {
  const [servers] = useState([
    {
      id: '1',
      name: 'DevBlog Central',
      game: 'Информационный портал',
      status: 'online',
      views: 15420,
      maxViews: 20000,
      cpu: 35,
      ram: 48,
      url: 'devblog-central.rusthost.dev'
    },
    {
      id: '2',
      name: 'Update News Hub',
      game: 'Новостной раздел',
      status: 'online',
      views: 8750,
      maxViews: 10000,
      cpu: 52,
      ram: 61,
      url: 'updates.rusthost.dev'
    },
    {
      id: '3',
      name: 'Community Portal',
      game: 'Сообщество',
      status: 'online',
      views: 12300,
      maxViews: 15000,
      cpu: 44,
      ram: 55,
      url: 'community.rusthost.dev'
    }
  ]);

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = (status: string) => {
    return status === 'online' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Мои</span>
            <span className="text-neon-purple"> DevBlog'и</span>
          </h1>
          <p className="text-xl text-foreground/80">
            Управление и мониторинг ваших DevBlog порталов
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {servers.map((server, index) => (
            <Card
              key={server.id}
              className="bg-card/50 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-orbitron text-neon-cyan mb-2">
                      {server.name}
                    </CardTitle>
                    <p className="text-foreground/60">{server.game}</p>
                  </div>
                  <Badge className={`${getStatusText(server.status)} border-current`} variant="outline">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(server.status)} mr-2 animate-glow-pulse`} />
                    {server.status === 'online' ? 'Онлайн' : 'Офлайн'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/80">Просмотры</span>
                      <span className="text-sm font-semibold text-neon-purple">
                        {server.views.toLocaleString()}/{server.maxViews.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(server.views / server.maxViews) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/80">CPU</span>
                      <span className="text-sm font-semibold text-neon-cyan">
                        {server.cpu}%
                      </span>
                    </div>
                    <Progress value={server.cpu} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/80">RAM</span>
                      <span className="text-sm font-semibold text-neon-pink">
                        {server.ram}%
                      </span>
                    </div>
                    <Progress value={server.ram} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                    <Icon name="Globe" size={16} />
                    <code className="text-neon-cyan">{server.url}</code>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`https://${server.url}`, '_blank')}
                      className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
                    >
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Открыть
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => alert('Настройки сервера: ' + server.name)}
                      variant="outline"
                      className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                    >
                      <Icon name="Settings" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => alert('Статистика сервера: ' + server.name)}
                      variant="outline"
                      className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
                    >
                      <Icon name="BarChart" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border border-neon-cyan/30 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-8 text-center">
            <Icon name="Plus" size={48} className="text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-orbitron font-bold text-neon-cyan mb-2">
              Создать новый DevBlog
            </h3>
            <p className="text-foreground/60 mb-6">
              Выберите конфигурацию и запустите свой DevBlog портал
            </p>
            <Button 
              onClick={() => window.location.href = '/catalog'}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-semibold glow-cyan"
            >
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Servers;