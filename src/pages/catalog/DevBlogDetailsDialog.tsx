import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { DevBlog, getColorClasses } from './catalogData';

interface DevBlogDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  devblog: DevBlog | null;
  billingPeriod: 'week' | 'month';
  onBillingChange: (devblogId: string, period: 'week' | 'month') => void;
  onSelectPlan: () => void;
}

export const DevBlogDetailsDialog = ({
  isOpen,
  onOpenChange,
  devblog,
  billingPeriod,
  onBillingChange,
  onSelectPlan
}: DevBlogDetailsDialogProps) => {
  if (!devblog) return null;

  const colors = getColorClasses(devblog.color);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30 max-w-2xl">
        <DialogHeader>
          <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.glow}`}>
            <Icon name={devblog.icon as any} size={32} className={colors.text} />
          </div>
          <DialogTitle className={`text-3xl font-orbitron text-center ${colors.text}`}>
            {devblog.name}
          </DialogTitle>
          <DialogDescription className="text-center text-foreground/60">
            {devblog.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Что входит в обновление:</h3>
            <div className="space-y-3">
              {devblog.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Check" size={20} className={colors.text} />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-primary/20 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-orbitron font-bold ${colors.text}`}>
                    {billingPeriod === 'week' ? devblog.pricePerWeek : devblog.pricePerMonth}
                  </span>
                  <span className="text-foreground/60">₽</span>
                </div>
                <div className="text-sm text-foreground/60 mt-1">
                  {devblog.pricePerHour}₽/час
                </div>
              </div>
              <Tabs 
                value={billingPeriod} 
                onValueChange={(value) => onBillingChange(devblog.id, value as 'week' | 'month')}
              >
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="week" className="font-orbitron">Неделя</TabsTrigger>
                  <TabsTrigger value="month" className="font-orbitron">Месяц</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button
              onClick={onSelectPlan}
              className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-background font-orbitron font-bold text-lg py-6 ${colors.glow}`}
            >
              Выбрать тариф
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
