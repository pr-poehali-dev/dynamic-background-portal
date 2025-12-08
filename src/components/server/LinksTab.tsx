import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { ServerLink } from '@/types/server';

interface LinksTabProps {
  links: ServerLink[];
  onAddLink: (name: string, url: string) => void;
  onRemoveLink: (index: number) => void;
}

const QUICK_TEMPLATES = [
  { name: 'Discord', icon: 'MessageSquare', urlExample: 'https://discord.gg/' },
  { name: 'VK группа', icon: 'Users', urlExample: 'https://vk.com/club' },
  { name: 'Telegram', icon: 'Send', urlExample: 'https://t.me/' },
  { name: 'Правила', icon: 'FileText', urlExample: 'https://example.com/rules' },
  { name: 'Магазин', icon: 'ShoppingBag', urlExample: 'https://example.com/shop' },
  { name: 'YouTube', icon: 'Youtube', urlExample: 'https://youtube.com/@' }
];

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

const LinksTab = ({ links, onAddLink, onRemoveLink }: LinksTabProps) => {
  const [newLinkName, setNewLinkName] = React.useState('');
  const [newLinkUrl, setNewLinkUrl] = React.useState('');

  const handleAddLink = () => {
    if (!newLinkName.trim() || !newLinkUrl.trim()) {
      alert('Заполните название и URL ссылки');
      return;
    }
    if (links.length >= 10) {
      alert('Максимум 10 ссылок');
      return;
    }
    
    try {
      new URL(newLinkUrl);
    } catch {
      alert('Введите корректный URL (например: https://example.com)');
      return;
    }

    onAddLink(newLinkName.trim(), newLinkUrl.trim());
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const handleTemplateClick = (template: typeof QUICK_TEMPLATES[0]) => {
    setNewLinkName(template.name);
    setNewLinkUrl(template.urlExample);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
          Внешние ссылки
        </h3>
        <p className="text-sm text-foreground/60">
          Добавьте ссылки на Discord, соцсети, правила сервера и другие ресурсы.
          Игроки смогут переходить по ним.
        </p>
      </div>

      <div className="space-y-3">
        {links.length === 0 ? (
          <div className="p-8 text-center bg-muted/30 rounded-lg border border-dashed border-primary/20">
            <Icon name="Link" size={48} className="text-foreground/30 mx-auto mb-2" />
            <p className="text-foreground/60">Ссылки не добавлены</p>
          </div>
        ) : (
          links.map((link, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Icon name={getIconForUrl(link.url)} size={20} className="text-neon-purple" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{link.name}</div>
                <div className="text-sm text-foreground/60 truncate">{link.url}</div>
              </div>
              <Button
                onClick={() => onRemoveLink(index)}
                size="sm"
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 shrink-0"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))
        )}
      </div>

      {links.length < 10 && (
        <div className="border-t border-primary/20 pt-6 space-y-4">
          <h4 className="font-semibold">Добавить ссылку</h4>
          
          <div className="space-y-2">
            <Label htmlFor="linkName">Название</Label>
            <Input
              id="linkName"
              placeholder="Например: Discord сервер"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              className="bg-muted border-primary/20"
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkUrl">URL</Label>
            <Input
              id="linkUrl"
              placeholder="Например: https://discord.gg/example"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
              className="bg-muted border-primary/20"
            />
          </div>
          
          <Button
            onClick={handleAddLink}
            className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить ссылку
          </Button>
        </div>
      )}

      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex gap-2 mb-3">
          <Icon name="Info" size={20} className="text-blue-400" />
          <span className="font-semibold text-blue-400">Быстрые шаблоны</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_TEMPLATES.map((template) => (
            <Button
              key={template.name}
              onClick={() => handleTemplateClick(template)}
              size="sm"
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 justify-start"
            >
              <Icon name={template.icon} size={16} className="mr-2" />
              {template.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-xs text-foreground/50 text-center">
        Добавлено ссылок: {links.length} / 10
      </div>
    </div>
  );
};

export default LinksTab;
