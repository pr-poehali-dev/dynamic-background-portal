import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Navbar = () => {
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<{ name: string; balance: number; avatar: string } | null>(null);

  const navItems = [
    { name: 'Главная', path: '/', icon: 'Home' },
    { name: 'Каталог', path: '/catalog', icon: 'ShoppingBag' },
    { name: 'Серверы', path: '/servers', icon: 'Server' },
    { name: 'Документация', path: '/docs', icon: 'Book' },
    { name: 'Поддержка', path: '/support', icon: 'MessageCircle' }
  ];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: 'Player',
      balance: 1250,
      avatar: ''
    });
    setIsAuthOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center glow-cyan">
                <Icon name="Zap" className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-orbitron font-bold text-neon-cyan">CYBER HOST</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-neon-cyan ${
                    location.pathname === item.path ? 'text-neon-cyan' : 'text-foreground/80'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/balance" className="hidden md:flex items-center gap-2 px-4 py-2 bg-neon-purple/10 border border-neon-purple/30 rounded-lg hover:bg-neon-purple/20 transition-colors cursor-pointer">
                    <Icon name="Wallet" size={18} className="text-neon-purple" />
                    <span className="font-orbitron font-semibold text-neon-purple">{user.balance}₽</span>
                  </Link>
                  <Link to="/profile">
                    <Avatar className="w-10 h-10 border-2 border-neon-cyan glow-cyan cursor-pointer">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-neon-cyan to-neon-purple text-background font-bold">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-semibold glow-cyan"
                >
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-2xl text-neon-cyan">
              {isLogin ? 'Вход в систему' : 'Регистрация'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4 mt-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground/80">Имя пользователя</Label>
                <Input id="username" placeholder="Player123" className="bg-muted border-primary/20" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80">Email</Label>
              <Input id="email" type="email" placeholder="player@cyberhost.com" className="bg-muted border-primary/20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" className="bg-muted border-primary/20" />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-semibold glow-cyan"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <p className="text-center text-sm text-foreground/60">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-cyan hover:underline"
              >
                {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;