import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ActiveServer {
  devblog: string;
  core: string;
  client: string;
  port: number;
  purchaseDate: string;
}

const Servers = () => {
  const [activeServer, setActiveServer] = useState<ActiveServer | null>(null);
  const [serverStats] = useState({
    status: 'online',
    players: 24,
    maxPlayers: 100,
    cpu: 42,
    ram: 68,
    uptime: '3 дня 14 часов'
  });

  useEffect(() => {
    const server = localStorage.getItem('activeServer');
    if (server) {
      setActiveServer(JSON.parse(server));
    }
  }, []);

  const handleDownloadClient = () => {
    if (!activeServer) return;
    
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`
CYBER HOST - ${activeServer.devblog} Client Launcher
=====================================================

Версия клиента: 1.0.0
Сервер: ${activeServer.devblog}
Порт: ${activeServer.port}
Дата активации: ${new Date(activeServer.purchaseDate).toLocaleDateString('ru-RU')}

Инструкция по подключению:
1. Запустите Steam
2. Перейдите в библиотеку
3. Найдите Rust
4. Нажмите Play
5. Откройте консоль (F1)
6. Введите: client.connect 127.0.0.1:${activeServer.port}

Ядро сервера: ${activeServer.core}
Статус: Активен

Для подключения к серверу используйте команду:
connect 127.0.0.1:${activeServer.port}

Техподдержка: support@cyberhost.com
    `)}`;
    element.download = activeServer.client;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert(`✅ Клиент ${activeServer.client} скачан!\n\nТеперь вы можете:\n• Установить клиент\n• Подключиться к серверу\n• Начать игру на ${activeServer.devblog}`);
  };

  const handleDownloadCore = () => {
    if (!activeServer) return;
    
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`
CYBER HOST - ${activeServer.devblog} Server Core
=================================================

Версия ядра: ${activeServer.core}
DevBlog: ${activeServer.devblog}
Порт сервера: ${activeServer.port}
Дата активации: ${new Date(activeServer.purchaseDate).toLocaleDateString('ru-RU')}

Файлы сервера:
- RustDedicated.exe (главный файл сервера)
- server.cfg (конфигурация)
- oxide/ (папка с плагинами)
- data/ (сохранения и данные)

Команды запуска:
Windows:
  RustDedicated.exe -batchmode +server.port ${activeServer.port} +server.level "Procedural Map" +server.seed 1234 +server.worldsize 4000 +server.maxplayers 100 +server.hostname "${activeServer.devblog} Server" +server.description "Powered by CYBER HOST"

Linux:
  ./RustDedicated -batchmode +server.port ${activeServer.port} +server.level "Procedural Map" +server.seed 1234 +server.worldsize 4000 +server.maxplayers 100 +server.hostname "${activeServer.devblog} Server"

Настройка server.cfg:
  server.port ${activeServer.port}
  server.hostname "${activeServer.devblog} Server"
  server.maxplayers 100
  server.worldsize 4000
  server.seed 1234
  server.saveinterval 300

Требования:
- ОС: Windows Server 2016+ / Ubuntu 20.04+
- RAM: 8GB минимум (16GB рекомендовано)
- CPU: 4 ядра минимум
- HDD: 20GB свободного места

Документация: https://cyberhost.com/docs
Поддержка: support@cyberhost.com
    `)}`;
    element.download = activeServer.core;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert(`✅ Ядро сервера ${activeServer.core} скачано!\n\nТеперь вы можете:\n• Установить ядро на ваш сервер\n• Настроить конфигурацию\n• Запустить сервер\n• Проверить подключение клиентов`);
  };

  if (!activeServer) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Navbar />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <Icon name="Server" size={80} className="text-neon-cyan mx-auto mb-6 opacity-50" />
              <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-4">
                <span className="text-neon-cyan">У вас пока нет</span>
                <span className="text-neon-purple"> активных серверов</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Приобретите хостинг в каталоге, чтобы начать работу
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border border-neon-cyan/30 p-8 animate-scale-in">
              <Icon name="ShoppingBag" size={48} className="text-neon-purple mx-auto mb-4" />
              <h3 className="text-2xl font-orbitron font-bold text-neon-purple mb-4">
                Выберите DevBlog сервер
              </h3>
              <p className="text-foreground/60 mb-6">
                12 версий DevBlog на выбор • От 5₽/час • Мгновенный запуск
              </p>
              <Button 
                onClick={() => window.location.href = '/catalog'}
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-semibold glow-cyan px-8 py-6 text-lg"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Перейти в каталог
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Мой</span>
            <span className="text-neon-purple"> Сервер</span>
          </h1>
          <p className="text-xl text-foreground/80">
            Управление и мониторинг вашего {activeServer.devblog} сервера
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-neon-cyan/30 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-orbitron text-neon-cyan mb-2">
                    {activeServer.devblog}
                  </CardTitle>
                  <p className="text-foreground/60">Rust Server • Порт {activeServer.port}</p>
                </div>
                <Badge className="text-green-400 border-green-400" variant="outline">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-glow-pulse" />
                  Онлайн
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Users" size={20} className="text-neon-purple" />
                    <span className="text-sm text-foreground/80">Игроки</span>
                  </div>
                  <div className="text-2xl font-orbitron font-bold text-neon-purple">
                    {serverStats.players}/{serverStats.maxPlayers}
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Clock" size={20} className="text-neon-pink" />
                    <span className="text-sm text-foreground/80">Аптайм</span>
                  </div>
                  <div className="text-xl font-orbitron font-bold text-neon-pink">
                    {serverStats.uptime}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/80">CPU использование</span>
                    <span className="text-sm font-semibold text-neon-cyan">
                      {serverStats.cpu}%
                    </span>
                  </div>
                  <Progress value={serverStats.cpu} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/80">RAM использование</span>
                    <span className="text-sm font-semibold text-neon-purple">
                      {serverStats.ram}%
                    </span>
                  </div>
                  <Progress value={serverStats.ram} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground/80">Игроки онлайн</span>
                    <span className="text-sm font-semibold text-neon-pink">
                      {Math.round((serverStats.players / serverStats.maxPlayers) * 100)}%
                    </span>
                  </div>
                  <Progress value={(serverStats.players / serverStats.maxPlayers) * 100} className="h-3" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => alert('Открытие консоли сервера...')}
                    className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
                  >
                    <Icon name="Terminal" size={18} className="mr-2" />
                    Консоль
                  </Button>
                  <Button
                    onClick={() => alert('Настройки сервера')}
                    variant="outline"
                    className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                  >
                    <Icon name="Settings" size={18} className="mr-2" />
                    Настройки
                  </Button>
                  <Button
                    onClick={() => alert('Перезапуск сервера...')}
                    variant="outline"
                    className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
                  >
                    <Icon name="RotateCw" size={18} className="mr-2" />
                    Перезапуск
                  </Button>
                  <Button
                    onClick={() => alert('Статистика сервера')}
                    variant="outline"
                    className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    <Icon name="BarChart" size={18} className="mr-2" />
                    Статистика
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/50 backdrop-blur-sm border border-neon-purple/30">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-purple flex items-center gap-2">
                  <Icon name="Download" size={24} />
                  Загрузки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Package" size={24} className="text-neon-cyan mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-1">Ядро сервера</div>
                      <div className="text-sm text-foreground/60 mb-3">{activeServer.core}</div>
                      <Button
                        onClick={handleDownloadCore}
                        size="sm"
                        className="w-full bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50"
                      >
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать ядро
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Gamepad2" size={24} className="text-neon-purple mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-1">Клиент</div>
                      <div className="text-sm text-foreground/60 mb-3">{activeServer.client}</div>
                      <Button
                        onClick={handleDownloadClient}
                        size="sm"
                        className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold glow-purple"
                      >
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать клиент
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-foreground/50 text-center pt-2">
                  Активировано: {new Date(activeServer.purchaseDate).toLocaleDateString('ru-RU')}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-neon-pink/30">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-pink flex items-center gap-2">
                  <Icon name="Info" size={24} />
                  Подключение
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-foreground/60 mb-1">IP адрес</div>
                  <code className="text-neon-cyan font-mono">127.0.0.1</code>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-foreground/60 mb-1">Порт</div>
                  <code className="text-neon-purple font-mono">{activeServer.port}</code>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm text-foreground/60 mb-1">Команда подключения</div>
                  <code className="text-neon-pink font-mono text-xs">
                    client.connect 127.0.0.1:{activeServer.port}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border border-neon-cyan/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-8 text-center">
            <Icon name="Plus" size={48} className="text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-orbitron font-bold text-neon-cyan mb-2">
              Создать дополнительный сервер
            </h3>
            <p className="text-foreground/60 mb-6">
              Выберите другой DevBlog и запустите второй сервер
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
