import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface PluginsTabProps {
  plugins: string[];
  newPlugin: string;
  setNewPlugin: (value: string) => void;
  onAddPlugin: () => void;
  onRemovePlugin: (index: number) => void;
}

const PluginsTab = ({
  plugins,
  newPlugin,
  setNewPlugin,
  onAddPlugin,
  onRemovePlugin
}: PluginsTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
          Управление плагинами
        </h3>
        <p className="text-sm text-foreground/60">
          Добавьте плагины для расширения функционала сервера. Плагины можно перезагружать через консоль.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Установленные плагины</Label>
        {plugins.length === 0 ? (
          <div className="p-8 text-center bg-muted/30 rounded-lg border border-dashed border-primary/20">
            <Icon name="Package" size={48} className="text-foreground/30 mx-auto mb-2" />
            <p className="text-foreground/60">Плагины не установлены</p>
          </div>
        ) : (
          <div className="space-y-2">
            {plugins.map((plugin, index) => (
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

      <div className="border-t border-primary/20 pt-6 space-y-4">
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
            <span className="font-semibold text-blue-400">Команды консоли для плагинов</span>
          </div>
          <div className="space-y-1 mt-3 text-sm font-mono">
            <div className="text-blue-300">plugin.load &lt;название&gt; - Загрузить плагин</div>
            <div className="text-blue-300">plugin.reload &lt;название&gt; - Перезагрузить плагин</div>
            <div className="text-blue-300">plugin.unload &lt;название&gt; - Выгрузить плагин</div>
            <div className="text-blue-300">plugin.list - Список всех плагинов</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginsTab;
