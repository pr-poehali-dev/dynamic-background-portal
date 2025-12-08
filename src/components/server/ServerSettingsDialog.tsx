import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ServerSettings {
  hostname: string;
  maxPlayers: number;
  mapUrl?: string;
  mapSeed?: string;
  worldSize: number;
  description: string;
  plugins: string[];
}

interface ServerSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  serverSettings: ServerSettings;
  setServerSettings: React.Dispatch<React.SetStateAction<ServerSettings>>;
  newPlugin: string;
  setNewPlugin: (value: string) => void;
  onAddPlugin: () => void;
  onRemovePlugin: (index: number) => void;
  onLoadRandomMap: () => void;
  onSaveSettings: () => void;
}

const ServerSettingsDialog = ({
  isOpen,
  onOpenChange,
  serverSettings,
  setServerSettings,
  newPlugin,
  setNewPlugin,
  onAddPlugin,
  onRemovePlugin,
  onLoadRandomMap,
  onSaveSettings
}: ServerSettingsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                      onClick={onLoadRandomMap}
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
              onClick={onSaveSettings}
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
                          onClick={() => onRemovePlugin(index)}
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
                    onKeyDown={(e) => e.key === 'Enter' && onAddPlugin()}
                    className="flex-1 bg-muted border-primary/20"
                    placeholder="Название плагина (например: Oxide.Ext.Rust)"
                  />
                  <Button
                    onClick={onAddPlugin}
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
              onClick={onSaveSettings}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить плагины
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettingsDialog;
