import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { DevBlog, getColorClasses } from './catalogData';

interface DevBlogCardProps {
  devblog: DevBlog;
  index: number;
  onOpenDetails: (devblog: DevBlog) => void;
}

export const DevBlogCard = ({ devblog, index, onOpenDetails }: DevBlogCardProps) => {
  const colors = getColorClasses(devblog.color);

  return (
    <Card
      key={devblog.id}
      className={`relative bg-card/50 backdrop-blur-sm border ${colors.border} transition-all hover:scale-105 animate-fade-in ${
        devblog.popular ? 'md:scale-110 border-2' : ''
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {devblog.popular && (
        <Badge className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r ${colors.gradient} text-background font-orbitron font-bold px-4 py-1 ${colors.glow}`}>
          Популярный
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.glow}`}>
          <Icon name={devblog.icon as any} size={32} className={colors.text} />
        </div>
        <CardTitle className={`text-3xl font-orbitron font-bold ${colors.text}`}>
          {devblog.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4">
          <p className="text-lg text-foreground/80 mb-2">Узнайте о всех обновлениях</p>
          <p className="text-sm text-foreground/60">Нажмите "Посмотреть тариф" чтобы увидеть цены</p>
        </div>

        <Button
          onClick={() => onOpenDetails(devblog)}
          className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-background font-orbitron font-bold ${colors.glow}`}
        >
          <Icon name="Eye" size={20} className="mr-2" />
          Посмотреть тариф
        </Button>
      </CardContent>
    </Card>
  );
};
