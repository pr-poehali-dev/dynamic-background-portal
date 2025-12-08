import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PluginsTab from './PluginsTab';
import TagsTab from './TagsTab';
import LinksTab from './LinksTab';
import type { ServerSettings } from '@/types/server';

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
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  onAddLink: (name: string, url: string) => void;
  onRemoveLink: (index: number) => void;
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
  onSaveSettings,
  onAddTag,
  onRemoveTag,
  onAddLink,
  onRemoveLink
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Основные</TabsTrigger>
            <TabsTrigger value="plugins">Плагины</TabsTrigger>
            <TabsTrigger value="tags">Теги</TabsTrigger>
            <TabsTrigger value="links">Ссылки</TabsTrigger>
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
            <PluginsTab
              plugins={serverSettings.plugins}
              newPlugin={newPlugin}
              setNewPlugin={setNewPlugin}
              onAddPlugin={onAddPlugin}
              onRemovePlugin={onRemovePlugin}
            />

            <Button
              onClick={onSaveSettings}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить плагины
            </Button>
          </TabsContent>

          <TabsContent value="tags" className="space-y-6 mt-6">
            <TagsTab
              tags={serverSettings.tags}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
            />

            <Button
              onClick={onSaveSettings}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить теги
            </Button>
          </TabsContent>

          <TabsContent value="links" className="space-y-6 mt-6">
            <LinksTab
              links={serverSettings.links}
              onAddLink={onAddLink}
              onRemoveLink={onRemoveLink}
            />

            <Button
              onClick={onSaveSettings}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 glow-purple"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить ссылки
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettingsDialog;
