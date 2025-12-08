import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import type { ActiveServer, ServerStats, ServerSettings } from '@/types/server';

interface ServerDashboardProps {
  activeServer: ActiveServer;
  serverStats: ServerStats;
  serverSettings: ServerSettings;
  isRestarting: boolean;
  onOpenConsole: () => void;
  onOpenSettings: () => void;
  onRestartServer: () => void;
  onOpenStats: () => void;
  onDownloadClient: () => void;
}

const getIconForUrl = (url: string): string => {
  if (url.includes('discord.gg') || url.includes('discord.com')) return 'MessageSquare';
  if (url.includes('vk.com')) return 'Users';
  if (url.includes('t.me') || url.includes('telegram')) return 'Send';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'Youtube';
  if (url.includes('twitch.tv')) return 'Twitch';
  if (url.includes('rules') || url.includes('правила')) return 'FileText';
  if (url.includes('shop') || url.includes('магазин')) return 'ShoppingBag';
  return 'Link';
};

const ServerDashboard = ({
  activeServer,
  serverStats,
  serverSettings,
  isRestarting,
  onOpenConsole,
  onOpenSettings,
  onRestartServer,
  onOpenStats,
  onDownloadClient
}: ServerDashboardProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-neon-cyan/30 animate-fade-in">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl font-orbitron text-neon-cyan mb-2">
                  {activeServer.devblog}
                </CardTitle>
                <p className="text-foreground/60">Rust Server • Порт {activeServer.port}</p>
                
                {serverSettings.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {serverSettings.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-neon-cyan/50 text-neon-cyan text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
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
                  onClick={onOpenConsole}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
                >
                  <Icon name="Terminal" size={18} className="mr-2" />
                  Консоль
                </Button>
                <Button
                  onClick={onOpenSettings}
                  variant="outline"
                  className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
                >
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки
                </Button>
                <Button
                  onClick={onRestartServer}
                  disabled={isRestarting}
                  variant="outline"
                  className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
                >
                  <Icon name={isRestarting ? "Loader2" : "RotateCw"} size={18} className={`mr-2 ${isRestarting ? 'animate-spin' : ''}`} />
                  {isRestarting ? 'Перезапуск...' : 'Перезапуск'}
                </Button>
                <Button
                  onClick={onOpenStats}
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
                      onClick={onDownloadClient}
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

      {serverSettings.description && (
        <Card className="bg-card/50 backdrop-blur-sm border border-neon-cyan/30 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-orbitron text-neon-cyan flex items-center gap-2">
              <Icon name="FileText" size={24} />
              Описание сервера
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">
              {serverSettings.description}
            </p>
          </CardContent>
        </Card>
      )}

      {serverSettings.links.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border border-neon-purple/30 mb-8 animate-fade-in" style={{ animationDelay: '0.35s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-orbitron text-neon-purple flex items-center gap-2">
              <Icon name="Link" size={24} />
              Полезные ссылки
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {serverSettings.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Icon name={getIconForUrl(link.url)} size={20} className="text-neon-purple" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate group-hover:text-neon-purple transition-colors">
                    {link.name}
                  </div>
                </div>
                <Icon name="ExternalLink" size={16} className="text-foreground/50 shrink-0" />
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ServerDashboard;
