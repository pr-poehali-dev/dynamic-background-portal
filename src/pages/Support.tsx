import { useState, useRef, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  status?: 'sent' | 'read';
};

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я виртуальный помощник. Чем могу помочь?',
      sender: 'support',
      time: '14:30',
      status: 'read'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'Как создать сервер?': 'Для создания сервера:\n1. Перейдите в раздел "Каталог"\n2. Выберите DevBlog\n3. Нажмите "Читать подробнее"\n4. Выберите тариф (Неделя или Месяц)\n5. Подтвердите создание\n\nСервер будет готов через 30 секунд!',
      'Способы оплаты': 'Мы принимаем:\n• Банковские карты (без комиссии)\n• QIWI Кошелек (комиссия 2%)\n• ЮMoney (без комиссии)\n• Криптовалюта (комиссия 1%)\n\nБонусы: от 5000₽ +5%, от 10000₽ +10%',
      'Безопасность данных': 'Ваши данные защищены:\n• SSL шифрование\n• DDoS защита L3-L7\n• Резервное копирование каждый день\n• PCI DSS сертификация\n• Двухфакторная аутентификация\n\nМы никогда не передаем данные третьим лицам.',
      'Настройка сервера': 'Управление сервером:\n• Панель управления в разделе "Серверы"\n• Мониторинг CPU, RAM, Views\n• Настройки производительности\n• Автоматические бэкапы\n• Доступ к консоли\n\nПодробнее в разделе "Документация"'
    };
    return responses[question] || 'Спасибо за обращение! Специалист скоро ответит на ваш вопрос.';
  };

  const handleSendMessage = (customMessage?: string) => {
    const messageText = customMessage || inputMessage;
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
        sender: 'support',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 1500);
  };

  const quickQuestions = [
    { icon: 'Server', text: 'Как создать сервер?', color: 'cyan' },
    { icon: 'CreditCard', text: 'Способы оплаты', color: 'purple' },
    { icon: 'Shield', text: 'Безопасность данных', color: 'pink' },
    { icon: 'Settings', text: 'Настройка сервера', color: 'cyan' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'border-neon-cyan/30' },
      purple: { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'border-neon-purple/30' },
      pink: { bg: 'bg-neon-pink/10', text: 'text-neon-pink', border: 'border-neon-pink/30' }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">Поддержка</span>
            <span className="text-neon-purple"> 24/7</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Мы всегда готовы помочь вам с любыми вопросами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 h-[600px] flex flex-col animate-fade-in">
              <CardHeader className="border-b border-neon-cyan/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center glow-cyan">
                      <Icon name="Headphones" size={24} className="text-background" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-orbitron text-neon-cyan">Онлайн поддержка</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-foreground/60">Сейчас на связи</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                    Активный чат
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-background'
                            : 'bg-muted/50 text-foreground'
                        }`}
                      >
                        <p>{message.text}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-2">
                        <span className="text-xs text-foreground/40">{message.time}</span>
                        {message.sender === 'user' && message.status && (
                          <Icon 
                            name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                            size={14} 
                            className="text-neon-cyan" 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t border-neon-cyan/20">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Введите ваше сообщение..."
                    className="bg-muted/50 border-primary/20 focus:border-neon-cyan"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 glow-cyan"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-neon-purple/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-purple flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Быстрые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => {
                  const colors = getColorClasses(question.color);
                  return (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question.text)}
                      className={`w-full p-4 ${colors.bg} border ${colors.border} rounded-lg hover:scale-105 transition-all text-left group`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={question.icon as any} size={20} className={colors.text} />
                        <span className={`text-sm ${colors.text} group-hover:underline`}>{question.text}</span>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-neon-cyan/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-neon-cyan flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Документация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.location.href = '/docs'}
                  variant="outline" 
                  className="w-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                >
                  <Icon name="BookOpen" size={18} className="mr-2" />
                  Открыть базу знаний
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;