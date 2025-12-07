import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const user = {
    name: 'CyberPlayer',
    email: 'player@cyberhost.com',
    balance: 1250,
    avatar: '',
    transactions: [
      { id: '1', type: 'payment', amount: 799, description: 'Оплата Pro тарифа', date: '2024-12-01' },
      { id: '2', type: 'deposit', amount: 2000, description: 'Пополнение баланса', date: '2024-11-28' },
      { id: '3', type: 'payment', amount: 399, description: 'Оплата Starter тарифа', date: '2024-11-15' }
    ]
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Личный</span>
            <span className="text-neon-purple"> кабинет</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border border-primary/30 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-neon-cyan glow-cyan">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-neon-cyan to-neon-purple text-background text-4xl font-orbitron font-bold">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-neon-cyan">{user.name}</h2>
                  <p className="text-foreground/60">{user.email}</p>
                </div>
                <div className="w-full p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
                  <p className="text-sm text-foreground/60 mb-1">Баланс</p>
                  <p className="text-3xl font-orbitron font-bold text-neon-purple">{user.balance}₽</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-background font-orbitron font-semibold glow-purple">
                  <Icon name="Wallet" size={18} className="mr-2" />
                  Пополнить баланс
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-primary/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-neon-cyan">Настройки профиля</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="account">Аккаунт</TabsTrigger>
                  <TabsTrigger value="history">История</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input id="username" defaultValue={user.name} className="bg-muted border-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} className="bg-muted border-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Новый пароль</Label>
                      <Input id="password" type="password" placeholder="••••••••" className="bg-muted border-primary/20" />
                    </div>
                    <Button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 text-background font-orbitron font-semibold">
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    {user.transactions.map((transaction, index) => (
                      <div
                        key={transaction.id}
                        className="p-4 bg-muted/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              transaction.type === 'deposit' ? 'bg-green-500/10' : 'bg-red-500/10'
                            }`}>
                              <Icon
                                name={transaction.type === 'deposit' ? 'ArrowDownToLine' : 'ArrowUpFromLine'}
                                size={20}
                                className={transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{transaction.description}</p>
                              <p className="text-sm text-foreground/60">{transaction.date}</p>
                            </div>
                          </div>
                          <div className={`text-xl font-orbitron font-bold ${
                            transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}₽
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
