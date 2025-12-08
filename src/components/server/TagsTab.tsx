import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface TagsTabProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}

const PRESET_TAGS = [
  'PvP', 'PvE', 'Solo', 'Duo', 'Trio', 'Quad', 'No Decay',
  'x2', 'x3', 'x5', 'x10', 'Vanilla', 'Modded', 'RP',
  'Русский', 'EU', 'RU', 'Weekly Wipe', 'Monthly Wipe'
];

const TagsTab = ({ tags, onAddTag, onRemoveTag }: TagsTabProps) => {
  const [newTag, setNewTag] = React.useState('');

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (tags.length >= 10) {
      alert('Максимум 10 тегов на сервер');
      return;
    }
    if (tags.includes(newTag.trim())) {
      alert('Этот тег уже добавлен');
      return;
    }
    onAddTag(newTag.trim());
    setNewTag('');
  };

  const handleAddPresetTag = (tag: string) => {
    if (tags.length >= 10) {
      alert('Максимум 10 тегов на сервер');
      return;
    }
    if (tags.includes(tag)) {
      alert('Этот тег уже добавлен');
      return;
    }
    onAddTag(tag);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
          Теги сервера
        </h3>
        <p className="text-sm text-foreground/60">
          Добавьте теги для лучшего поиска вашего сервера. Максимум 10 тегов.
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="p-8 text-center bg-muted/30 rounded-lg border border-dashed border-primary/20">
          <Icon name="Tag" size={48} className="text-foreground/30 mx-auto mb-2" />
          <p className="text-foreground/60">Теги не добавлены</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-neon-cyan/50 text-neon-cyan pr-1 text-base py-1.5"
            >
              {tag}
              <Button
                onClick={() => onRemoveTag(index)}
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 ml-2 hover:bg-red-500/20"
              >
                <Icon name="X" size={14} className="text-red-400" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {tags.length < 10 && (
        <div className="border-t border-primary/20 pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newTag">Добавить свой тег</Label>
            <div className="flex gap-2">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 bg-muted border-primary/20"
                placeholder="Введите тег (например: PvP)"
                maxLength={20}
              />
              <Button
                onClick={handleAddTag}
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить
              </Button>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex gap-2 mb-3">
              <Icon name="Info" size={20} className="text-blue-400" />
              <span className="font-semibold text-blue-400">Популярные теги</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => handleAddPresetTag(tag)}
                  size="sm"
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  disabled={tags.includes(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-foreground/50 text-center">
        Добавлено тегов: {tags.length} / 10
      </div>
    </div>
  );
};

export default TagsTab;