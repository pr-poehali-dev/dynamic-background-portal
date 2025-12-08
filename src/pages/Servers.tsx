import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ServerConsoleDialog from '@/components/server/ServerConsoleDialog';
import ServerSettingsDialog from '@/components/server/ServerSettingsDialog';
import ServerStatsDialog from '@/components/server/ServerStatsDialog';
import ServerDashboard from '@/components/server/ServerDashboard';
import type { ActiveServer, ServerSettings, ConsoleLog } from '@/types/server';

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

  const [serverSettings, setServerSettings] = useState<ServerSettings>({
    hostname: 'CYBER HOST Server',
    maxPlayers: 100,
    mapUrl: '',
    mapSeed: '1234',
    worldSize: 4000,
    description: 'Powered by CYBER HOST',
    plugins: [],
    tags: [],
    links: []
  });

  const [newPlugin, setNewPlugin] = useState('');

  useEffect(() => {
    const server = localStorage.getItem('activeServer');
    if (server) {
      const serverData = JSON.parse(server);
      setActiveServer(serverData);
      if (serverData.settings) {
        setServerSettings({
          ...serverData.settings,
          tags: serverData.settings.tags || [],
          links: serverData.settings.links || []
        });
        setServerStats(prev => ({ ...prev, maxPlayers: serverData.settings.maxPlayers }));
      }
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
    const args = command.split(' ');
    const baseCommand = args[0];
    const subCommand = args[1];
    const pluginName = args[2];
    
    if (command === 'help') {
      addConsoleLog('info', 'Доступные команды: status, players, restart, stop, clear, plugin.load, plugin.reload, plugin.unload, plugin.list');
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
    } else if (baseCommand === 'plugin.load' && pluginName) {
      addConsoleLog('info', `Загрузка плагина ${pluginName}...`);
      setTimeout(() => {
        addConsoleLog('success', `Плагин ${pluginName} загружен`);
        addConsoleLog('info', 'Подключено к базе данных');
      }, 500);
    } else if (baseCommand === 'plugin.reload' && pluginName) {
      addConsoleLog('warning', `Перезагрузка плагина ${pluginName}...`);
      setTimeout(() => {
        addConsoleLog('success', `Плагин ${pluginName} успешно перезагружен`);
      }, 500);
    } else if (baseCommand === 'plugin.unload' && pluginName) {
      addConsoleLog('warning', `Выгрузка плагина ${pluginName}...`);
      setTimeout(() => {
        addConsoleLog('info', `Плагин ${pluginName} выгружен`);
      }, 500);
    } else if (command === 'plugin.list') {
      addConsoleLog('info', `Установленные плагины (${serverSettings.plugins.length}):`);
      serverSettings.plugins.forEach(plugin => {
        addConsoleLog('info', `• ${plugin}`);
      });
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
    if (serverSettings.tags.length > 0) {
      addConsoleLog('info', `Теги: ${serverSettings.tags.join(', ')}`);
    }
    
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
      if (serverSettings.tags.length > 0) {
        addConsoleLog('info', `Теги сервера: ${serverSettings.tags.join(', ')}`);
      }
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

  const handleAddTag = (tag: string) => {
    setServerSettings(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
    addConsoleLog('success', `Тег "${tag}" добавлен`);
  };

  const handleRemoveTag = (index: number) => {
    const tagName = serverSettings.tags[index];
    setServerSettings(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
    addConsoleLog('info', `Тег "${tagName}" удален`);
  };

  const handleAddLink = (name: string, url: string) => {
    setServerSettings(prev => ({
      ...prev,
      links: [...prev.links, { name, url, createdAt: new Date().toISOString() }]
    }));
    addConsoleLog('success', `Ссылка "${name}" добавлена`);
  };

  const handleRemoveLink = (index: number) => {
    const linkName = serverSettings.links[index].name;
    setServerSettings(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
    addConsoleLog('info', `Ссылка "${linkName}" удалена`);
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

        <ServerDashboard
          activeServer={activeServer}
          serverStats={serverStats}
          serverSettings={serverSettings}
          isRestarting={isRestarting}
          onOpenConsole={() => setIsConsoleOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onRestartServer={handleRestartServer}
          onOpenStats={() => setIsStatsOpen(true)}
          onDownloadClient={handleDownloadClient}
        />

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

      <ServerConsoleDialog
        isOpen={isConsoleOpen}
        onOpenChange={setIsConsoleOpen}
        consoleLogs={consoleLogs}
        consoleInput={consoleInput}
        setConsoleInput={setConsoleInput}
        onExecuteCommand={handleConsoleCommand}
      />

      <ServerSettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        serverSettings={serverSettings}
        setServerSettings={setServerSettings}
        newPlugin={newPlugin}
        setNewPlugin={setNewPlugin}
        onAddPlugin={handleAddPlugin}
        onRemovePlugin={handleRemovePlugin}
        onLoadRandomMap={handleLoadRandomMap}
        onSaveSettings={handleSaveSettings}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onAddLink={handleAddLink}
        onRemoveLink={handleRemoveLink}
      />

      <ServerStatsDialog
        isOpen={isStatsOpen}
        onOpenChange={setIsStatsOpen}
        serverStats={serverStats}
      />
    </div>
  );
};

export default Servers;