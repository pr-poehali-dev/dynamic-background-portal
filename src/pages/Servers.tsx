import { useState, useEffect, useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ActiveServer {
  devblog: string;
  core: string;
  client: string;
  port: number;
  purchaseDate: string;
  settings?: ServerSettings;
}

interface ServerSettings {
  hostname: string;
  maxPlayers: number;
  mapUrl?: string;
  mapSeed?: string;
  worldSize: number;
  description: string;
  plugins: string[];
}

interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

const Servers = () => {
  const [activeServer, setActiveServer] = useState<ActiveServer | null>(null);
  const [serverStats, setServerStats] = useState({
    status: 'online',
    players: 24,
    maxPlayers: 100,
    cpu: 42,
    ram: 68,
    uptime: '3 дня 14 часов'
  });

  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([
    { timestamp: '12:34:56', type: 'success', message: 'Сервер успешно запущен' },
    { timestamp: '12:35:10', type: 'info', message: 'Загрузка карты завершена' },
    { timestamp: '12:35:15', type: 'info', message: 'Порт 28015 открыт' },
    { timestamp: '12:35:20', type: 'success', message: 'Сервер готов к подключению игроков' }
  ]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const [serverSettings, setServerSettings] = useState<ServerSettings>({
    hostname: 'CYBER HOST Server',
    maxPlayers: 100,
    mapUrl: '',
    mapSeed: '1234',
    worldSize: 4000,
    description: 'Powered by CYBER HOST',
    plugins: []
  });

  const [newPlugin, setNewPlugin] = useState('');

  useEffect(() => {
    const server = localStorage.getItem('activeServer');
    if (server) {
      const serverData = JSON.parse(server);
      setActiveServer(serverData);
      if (serverData.settings) {
        setServerSettings(serverData.settings);
        setServerStats(prev => ({ ...prev, maxPlayers: serverData.settings.maxPlayers }));
      }
    }
  }, []);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

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
2. Перейдите в библиотеку Rust
3. Нажмите Play
4. Откройте консоль (F1)
5. Введите: client.connect 127.0.0.1:${activeServer.port}

Название сервера: ${serverSettings.hostname}
Максимум игроков: ${serverSettings.maxPlayers}
Статус: Активен

Для прямого подключения используйте:
connect 127.0.0.1:${activeServer.port}

Техподдержка: support@cyberhost.com
    `)}`;
    element.download = activeServer.client;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    addConsoleLog('success', `Клиент ${activeServer.client} скачан успешно`);
    alert(`✅ Клиент ${activeServer.client} скачан!\n\nТеперь вы можете:\n• Установить клиент\n• Подключиться к серверу\n• Начать игру на ${activeServer.devblog}`);
  };

  const addConsoleLog = (type: 'info' | 'warning' | 'error' | 'success', message: string) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU', { hour12: false });
    setConsoleLogs(prev => [...prev, { timestamp, type, message }]);
  };

  const handleConsoleCommand = () => {
    if (!consoleInput.trim()) return;
    
    addConsoleLog('info', `> ${consoleInput}`);
    
    const command = consoleInput.toLowerCase().trim();
    
    if (command === 'help') {
      addConsoleLog('info', 'Доступные команды: status, players, restart, stop, clear');
    } else if (command === 'status') {
      addConsoleLog('success', `Сервер: Online | Игроки: ${serverStats.players}/${serverStats.maxPlayers} | CPU: ${serverStats.cpu}% | RAM: ${serverStats.ram}%`);
    } else if (command === 'players') {
      addConsoleLog('info', `Игроков онлайн: ${serverStats.players} из ${serverStats.maxPlayers}`);
    } else if (command === 'restart') {
      addConsoleLog('warning', 'Перезапуск сервера...');
      setTimeout(() => addConsoleLog('success', 'Сервер успешно перезапущен'), 2000);
    } else if (command === 'stop') {
      addConsoleLog('warning', 'Остановка сервера...');
    } else if (command === 'clear') {
      setConsoleLogs([]);
    } else {
      addConsoleLog('error', `Неизвестная команда: ${consoleInput}. Введите 'help' для списка команд`);
    }
    
    setConsoleInput('');
  };

  const handleSaveSettings = () => {
    if (!activeServer) return;

    const updatedServer = {
      ...activeServer,
      settings: serverSettings
    };

    localStorage.setItem('activeServer', JSON.stringify(updatedServer));
    setActiveServer(updatedServer);
    setServerStats(prev => ({ ...prev, maxPlayers: serverSettings.maxPlayers }));
    
    addConsoleLog('success', 'Настройки сервера сохранены');
    addConsoleLog('info', `Название: ${serverSettings.hostname}`);
    addConsoleLog('info', `Максимум игроков: ${serverSettings.maxPlayers}`);
    addConsoleLog('info', `Размер карты: ${serverSettings.worldSize}`);
    
    setIsSettingsOpen(false);
    alert('✅ Настройки сохранены!\n\nИзменения вступят в силу после перезапуска сервера.');
  };

  const handleRestartServer = () => {
    setIsRestarting(true);
    addConsoleLog('warning', 'Инициализация перезапуска сервера...');
    
    setTimeout(() => {
      addConsoleLog('info', 'Остановка текущих процессов...');
    }, 500);

    setTimeout(() => {
      addConsoleLog('info', 'Сохранение данных игроков...');
    }, 1500);

    setTimeout(() => {
      addConsoleLog('info', 'Загрузка карты...');
    }, 2500);

    setTimeout(() => {
      addConsoleLog('success', 'Сервер успешно перезапущен!');
      addConsoleLog('info', `Порт ${activeServer?.port} открыт`);
      addConsoleLog('success', 'Сервер готов к подключению игроков');
      setIsRestarting(false);
    }, 3500);
  };

  const handleAddPlugin = () => {
    if (!newPlugin.trim()) return;
    
    setServerSettings(prev => ({
      ...prev,
      plugins: [...prev.plugins, newPlugin.trim()]
    }));
    
    addConsoleLog('success', `Плагин "${newPlugin}" добавлен`);
    setNewPlugin('');
  };

  const handleRemovePlugin = (index: number) => {
    const pluginName = serverSettings.plugins[index];
    setServerSettings(prev => ({
      ...prev,
      plugins: prev.plugins.filter((_, i) => i !== index)
    }));
    addConsoleLog('info', `Плагин "${pluginName}" удален`);
  };

  const handleLoadRandomMap = () => {
    const seed = Math.floor(Math.random() * 999999).toString();
    setServerSettings(prev => ({ ...prev, mapSeed: seed, mapUrl: '' }));
    addConsoleLog('info', `Генерация случайной карты с seed: ${seed}`);
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
                    onClick={() => setIsConsoleOpen(true)}
                    className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
                  >
                    <Icon name="Terminal" size={18} className="mr-2" />
                    Консоль
                  </Button>
                  <Button
                    onClick={() => setIsSettingsOpen(true)}
                    variant="outline"
                    className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                  >
                    <Icon name="Settings" size={18} className="mr-2" />
                    Настройки
                  </Button>
                  <Button
                    onClick={handleRestartServer}
                    disabled={isRestarting}
                    variant="outline"
                    className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
                  >
                    <Icon name={isRestarting ? "Loader2" : "RotateCw"} size={18} className={`mr-2 ${isRestarting ? 'animate-spin' : ''}`} />
                    {isRestarting ? 'Перезапуск...' : 'Перезапуск'}
                  </Button>
                  <Button
                    onClick={() => setIsStatsOpen(true)}
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
                  Клиент
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Gamepad2" size={24} className="text-neon-purple mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-1">Клиент подключения</div>
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
                  <code className="text-neon-pink font-mono text-xs break-all">
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

      <Dialog open={isConsoleOpen} onOpenChange={setIsConsoleOpen}>
        <DialogContent className="bg-card border-primary/30 max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-neon-cyan flex items-center gap-2">
              <Icon name="Terminal" size={24} />
              Консоль сервера
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-black/50 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
              {consoleLogs.map((log, index) => (
                <div key={index} className="mb-2">
                  <span className="text-foreground/50">[{log.timestamp}]</span>{' '}
                  <span className={
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    log.type === 'success' ? 'text-green-400' :
                    'text-cyan-400'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConsoleCommand()}
                placeholder="Введите команду... (help для справки)"
                className="flex-1 bg-muted border-primary/20 font-mono"
              />
              <Button
                onClick={handleConsoleCommand}
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить
              </Button>
            </div>

            <div className="text-xs text-foreground/50">
              Доступные команды: help, status, players, restart, stop, clear
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-card border-primary/30 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-neon-purple flex items-center gap-2">
              <Icon name="Settings" size={24} />
              Настройки сервера
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Основные настройки</TabsTrigger>
              <TabsTrigger value="plugins">Плагины</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hostname">Название сервера</Label>
                  <Input
                    id="hostname"
                    value={serverSettings.hostname}
                    onChange={(e) => setServerSettings(prev => ({ ...prev, hostname: e.target.value }))}
                    className="bg-muted border-primary/20"
                    placeholder="Введите название сервера"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Максимальное количество игроков</Label>
                  <Input
                    id="maxPlayers"
                    type="number"
                    min="10"
                    max="500"
                    value={serverSettings.maxPlayers}
                    onChange={(e) => setServerSettings(prev => ({ ...prev, maxPlayers: parseInt(e.target.value) || 100 }))}
                    className="bg-muted border-primary/20"
                  />
                  <p className="text-xs text-foreground/50">От 10 до 500 игроков</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="worldSize">Размер карты</Label>
                  <Input
                    id="worldSize"
                    type="number"
                    min="1000"
                    max="6000"
                    step="1000"
                    value={serverSettings.worldSize}
                    onChange={(e) => setServerSettings(prev => ({ ...prev, worldSize: parseInt(e.target.value) || 4000 }))}
                    className="bg-muted border-primary/20"
                  />
                  <p className="text-xs text-foreground/50">От 1000 до 6000 (рекомендуется 4000)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание сервера</Label>
                  <Textarea
                    id="description"
                    value={serverSettings.description}
                    onChange={(e) => setServerSettings(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-muted border-primary/20"
                    rows={3}
                    placeholder="Краткое описание вашего сервера"
                  />
                </div>

                <div className="border-t border-primary/20 pt-4 space-y-4">
                  <h3 className="text-lg font-orbitron font-bold text-foreground">Настройки карты</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mapUrl">Кастомная карта (URL)</Label>
                    <Input
                      id="mapUrl"
                      value={serverSettings.mapUrl}
                      onChange={(e) => setServerSettings(prev => ({ ...prev, mapUrl: e.target.value, mapSeed: '' }))}
                      className="bg-muted border-primary/20"
                      placeholder="https://example.com/map.zip"
                    />
                    <p className="text-xs text-foreground/50">Вставьте прямую ссылку на .zip файл карты</p>
                  </div>

                  <div className="text-center text-foreground/60 my-2">или</div>

                  <div className="space-y-2">
                    <Label htmlFor="mapSeed">Seed карты (для генерации)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="mapSeed"
                        value={serverSettings.mapSeed}
                        onChange={(e) => setServerSettings(prev => ({ ...prev, mapSeed: e.target.value, mapUrl: '' }))}
                        className="flex-1 bg-muted border-primary/20"
                        placeholder="1234"
                      />
                      <Button
                        onClick={handleLoadRandomMap}
                        variant="outline"
                        className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                      >
                        <Icon name="Shuffle" size={18} className="mr-2" />
                        Случайная
                      </Button>
                    </div>
                    <p className="text-xs text-foreground/50">Введите цифры для генерации процедурной карты</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить настройки
              </Button>
            </TabsContent>

            <TabsContent value="plugins" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Установленные плагины</Label>
                  {serverSettings.plugins.length === 0 ? (
                    <div className="p-8 text-center bg-muted/30 rounded-lg border border-dashed border-primary/20">
                      <Icon name="Package" size={48} className="text-foreground/30 mx-auto mb-2" />
                      <p className="text-foreground/60">Плагины не установлены</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {serverSettings.plugins.map((plugin, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon name="Package" size={20} className="text-neon-purple" />
                            <span className="font-medium">{plugin}</span>
                          </div>
                          <Button
                            onClick={() => handleRemovePlugin(index)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPlugin">Добавить плагин</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newPlugin"
                      value={newPlugin}
                      onChange={(e) => setNewPlugin(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddPlugin()}
                      className="flex-1 bg-muted border-primary/20"
                      placeholder="Название плагина (например: Oxide.Ext.Rust)"
                    />
                    <Button
                      onClick={handleAddPlugin}
                      className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    <Icon name="Info" size={20} className="text-blue-400" />
                    <span className="font-semibold text-blue-400">Популярные плагины</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {['Economics', 'ServerRewards', 'Kits', 'AdminRadar', 'BetterChat', 'Vanish'].map((plugin) => (
                      <Button
                        key={plugin}
                        onClick={() => setNewPlugin(plugin)}
                        size="sm"
                        variant="outline"
                        className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      >
                        {plugin}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveSettings}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить плагины
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatsOpen} onOpenChange={setIsStatsOpen}>
        <DialogContent className="bg-card border-primary/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-orbitron text-neon-cyan flex items-center gap-2">
              <Icon name="BarChart" size={24} />
              Статистика сервера
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/30 border-neon-cyan/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Users" size={32} className="text-neon-cyan mx-auto mb-2" />
                    <div className="text-3xl font-orbitron font-bold text-neon-cyan mb-1">
                      {serverStats.players}
                    </div>
                    <div className="text-sm text-foreground/60">Игроков онлайн</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-neon-purple/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon name="Clock" size={32} className="text-neon-purple mx-auto mb-2" />
                    <div className="text-2xl font-orbitron font-bold text-neon-purple mb-1">
                      {serverStats.uptime}
                    </div>
                    <div className="text-sm text-foreground/60">Время работы</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Пиковое кол-во игроков</span>
                  <span className="text-neon-cyan font-orbitron font-bold">87</span>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Среднее кол-во игроков</span>
                  <span className="text-neon-purple font-orbitron font-bold">45</span>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Всего подключений</span>
                  <span className="text-neon-pink font-orbitron font-bold">1,247</span>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Средний ping</span>
                  <span className="text-green-400 font-orbitron font-bold">28ms</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <div className="text-xs text-foreground/50 text-center">
                Статистика обновляется каждые 60 секунд
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Servers;
