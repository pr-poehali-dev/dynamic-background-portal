import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ServerStats {
  status: string;
  players: number;
  maxPlayers: number;
  cpu: number;
  ram: number;
  uptime: string;
}

interface ServerStatsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  serverStats: ServerStats;
}

const ServerStatsDialog = ({ isOpen, onOpenChange, serverStats }: ServerStatsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default ServerStatsDialog;
