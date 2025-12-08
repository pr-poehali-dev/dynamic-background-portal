import { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface ServerConsoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  consoleLogs: ConsoleLog[];
  consoleInput: string;
  setConsoleInput: (value: string) => void;
  onExecuteCommand: () => void;
}

const ServerConsoleDialog = ({
  isOpen,
  onOpenChange,
  consoleLogs,
  consoleInput,
  setConsoleInput,
  onExecuteCommand
}: ServerConsoleDialogProps) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30 max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron text-neon-cyan flex items-center gap-2">
            <Icon name="Terminal" size={24} />
            Консоль сервера
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-black/50 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
            {consoleLogs.map((log, index) => (
              <div key={index} className="mb-2">
                <span className="text-foreground/50">[{log.timestamp}]</span>{' '}
                <span className={
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  log.type === 'success' ? 'text-green-400' :
                  'text-cyan-400'
                }>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onExecuteCommand()}
              placeholder="Введите команду... (help для справки)"
              className="flex-1 bg-muted border-primary/20 font-mono"
            />
            <Button
              onClick={onExecuteCommand}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron"
            >
              <Icon name="Send" size={18} className="mr-2" />
              Отправить
            </Button>
          </div>

          <div className="text-xs text-foreground/50">
            Доступные команды: help, status, players, restart, stop, clear
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerConsoleDialog;
