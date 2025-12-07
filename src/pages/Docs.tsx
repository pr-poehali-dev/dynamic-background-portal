import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type DocSection = {
  id: string;
  title: string;
  icon: string;
  color: 'cyan' | 'purple' | 'pink';
  articles: Array<{
    id: string;
    title: string;
    description: string;
    content: string;
  }>;
};

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Начало работы',
      icon: 'Rocket',
      color: 'cyan',
      articles: [
        {
          id: 'registration',
          title: 'Регистрация и вход',
          description: 'Как создать аккаунт и войти в систему',
          content: `
# Регистрация и вход

## Создание аккаунта
1. Нажмите кнопку "Войти" в правом верхнем углу
2. Выберите "Зарегистрироваться"
3. Заполните форму: имя пользователя, email, пароль
4. Подтвердите email (письмо придет в течение 5 минут)

## Вход в систему
- Используйте email и пароль для входа
- Можно включить "Запомнить меня" для автоматического входа

## Безопасность
- Используйте надежный пароль (минимум 8 символов)
- Не передавайте пароль третьим лицам
- Включите двухфакторную аутентификацию в настройках профиля
          `
        },
        {
          id: 'first-server',
          title: 'Создание первого сервера',
          description: 'Пошаговое руководство по запуску сервера',
          content: `
# Создание первого сервера

## Шаг 1: Выбор DevBlog
1. Перейдите в раздел "Каталог"
2. Выберите нужный DevBlog (например, DevBlog 245)
3. Нажмите "Читать подробнее" для просмотра содержимого

## Шаг 2: Выбор тарифа
- **Неделя**: 750₽ (5₽/час)
- **Месяц**: 2500₽ (5₽/час)
- Выберите удобный период оплаты

## Шаг 3: Оплата
1. Нажмите "Выбрать тариф"
2. Убедитесь что на балансе достаточно средств
3. Подтвердите создание сервера

## Шаг 4: Настройка
- Сервер создается автоматически за 30 секунд
- Получите доступ в разделе "Серверы"
- Начните настройку через панель управления
          `
        },
        {
          id: 'balance',
          title: 'Пополнение баланса',
          description: 'Способы оплаты и пополнения счета',
          content: `
# Пополнение баланса

## Способы оплаты
1. **Банковская карта** (без комиссии)
2. **QIWI Кошелек** (комиссия 2%)
3. **ЮMoney** (без комиссии)
4. **Криптовалюта** (комиссия 1%)

## Бонусная программа
- От 5000₽ → +5% бонус
- От 10000₽ → +10% бонус

## Процесс пополнения
1. Нажмите на баланс в верхней панели
2. Введите сумму или выберите из быстрых значений
3. Выберите способ оплаты
4. Подтвердите платеж
5. Деньги зачисляются моментально
          `
        }
      ]
    },
    {
      id: 'servers',
      title: 'Управление серверами',
      icon: 'Server',
      color: 'purple',
      articles: [
        {
          id: 'server-control',
          title: 'Панель управления',
          description: 'Основные функции управления сервером',
          content: `
# Панель управления сервером

## Основные действия
- **Запуск/Остановка**: Включение и выключение сервера
- **Перезагрузка**: Быстрый перезапуск
- **Настройки**: Конфигурация параметров

## Мониторинг
- **CPU**: Загрузка процессора в реальном времени
- **RAM**: Использование оперативной памяти
- **Views**: Количество просмотров DevBlog

## Консоль
- Доступ к серверной консоли
- Выполнение команд
- Просмотр логов в реальном времени

## Автоматизация
- Автозапуск при сбое
- Резервное копирование
- Плановые перезагрузки
          `
        },
        {
          id: 'server-settings',
          title: 'Настройки сервера',
          description: 'Конфигурация и оптимизация',
          content: `
# Настройки сервера

## Основные параметры
- Название сервера
- Описание
- Регион размещения
- Версия DevBlog

## Производительность
- Выделение CPU
- Лимит RAM
- Приоритет процессов

## Безопасность
- Белые списки IP
- Защита от DDoS
- Резервное копирование

## Сетевые настройки
- Порты и протоколы
- Доменное имя
- SSL сертификаты
          `
        },
        {
          id: 'server-backup',
          title: 'Резервное копирование',
          description: 'Создание и восстановление бэкапов',
          content: `
# Резервное копирование

## Автоматические бэкапы
- Ежедневное копирование (00:00 МСК)
- Хранение последних 7 бэкапов
- Автоматическая очистка старых копий

## Ручное создание бэкапа
1. Перейдите в "Серверы" → "Настройки"
2. Выберите "Резервное копирование"
3. Нажмите "Создать бэкап"
4. Дождитесь завершения (1-5 минут)

## Восстановление
1. Выберите бэкап из списка
2. Нажмите "Восстановить"
3. Подтвердите действие
4. Сервер будет перезапущен автоматически

## Хранилище
- До 10 ГБ бесплатно
- Дополнительное место: 50₽/10ГБ в месяц
          `
        }
      ]
    },
    {
      id: 'billing',
      title: 'Биллинг и оплата',
      icon: 'CreditCard',
      color: 'pink',
      articles: [
        {
          id: 'pricing',
          title: 'Тарифы и цены',
          description: 'Стоимость услуг и тарифные планы',
          content: `
# Тарифы и цены

## Базовая стоимость
- **Почасовая оплата**: 5₽/час
- **Недельный тариф**: 750₽ (экономия 15%)
- **Месячный тариф**: 2500₽ (экономия 30%)

## Что входит в тариф
- Неограниченная пропускная способность
- DDoS защита уровня L3-L7
- Техническая поддержка 24/7
- Автоматическое резервное копирование
- SSL сертификаты

## Оплата по факту
- Деньги списываются с баланса ежечасно
- Уведомления при балансе < 100₽
- Автоматическое отключение при нулевом балансе

## Скидки
- От 3 серверов: -5%
- От 5 серверов: -10%
- От 10 серверов: -15%
          `
        },
        {
          id: 'refund',
          title: 'Возврат средств',
          description: 'Политика возврата и гарантии',
          content: `
# Возврат средств

## Гарантия качества
- 14 дней на тестирование
- Возврат 100% при неудовлетворенности
- Без вопросов и объяснений

## Условия возврата
1. Запрос в течение 14 дней после оплаты
2. Использование менее 10% ресурсов
3. Отсутствие нарушений правил

## Процесс возврата
1. Напишите в поддержку
2. Укажите причину (необязательно)
3. Получите деньги в течение 3-5 дней
4. На тот же способ оплаты

## Частичный возврат
- При отключении сервера досрочно
- Возврат неиспользованных дней
- Пропорциональный расчет
          `
        },
        {
          id: 'payment-methods',
          title: 'Способы оплаты',
          description: 'Доступные методы пополнения',
          content: `
# Способы оплаты

## Банковские карты
- Visa, Mastercard, МИР
- Без комиссии
- Моментальное зачисление
- 3D-Secure защита

## Электронные кошельки
- **QIWI**: комиссия 2%
- **ЮMoney**: без комиссии
- Зачисление в течение 5 минут

## Криптовалюта
- Bitcoin, Ethereum, USDT
- Комиссия 1%
- Зачисление после 3 подтверждений

## Безопасность
- PCI DSS сертификация
- SSL шифрование
- Токенизация данных карт
- Двухфакторная аутентификация
          `
        }
      ]
    },
    {
      id: 'support',
      title: 'Поддержка',
      icon: 'Headphones',
      color: 'cyan',
      articles: [
        {
          id: 'contact',
          title: 'Связь с поддержкой',
          description: 'Как получить помощь',
          content: `
# Связь с поддержкой

## Онлайн-чат
- Доступен 24/7
- Ответ в течение 2 минут
- Раздел "Поддержка"

## Email
- support@cyberhost.com
- Ответ в течение 1 часа
- Для сложных вопросов

## Телефон
- +7 (800) 555-35-35
- Бесплатный по России
- Работаем круглосуточно

## Быстрые вопросы
- Используйте шаблоны в чате
- Частые проблемы решаются автоматически
- База знаний всегда доступна
          `
        },
        {
          id: 'faq',
          title: 'Частые вопросы',
          description: 'Ответы на популярные вопросы',
          content: `
# Частые вопросы

## Как быстро создается сервер?
Сервер готов к работе за 30 секунд после оплаты.

## Можно ли сменить тариф?
Да, в любой момент в настройках сервера.

## Что если закончатся деньги?
Сервер приостановится, но данные сохранятся 7 дней.

## Есть ли тестовый период?
Да, 14 дней с возможностью возврата 100%.

## Как работает DDoS защита?
Автоматическая фильтрация на уровне сети и приложений.

## Можно ли установить свой DevBlog?
Пока доступны только официальные DevBlog 234-245.

## Где физически находятся серверы?
Дата-центры в Москве, Санкт-Петербурге, Франкфурте.

## Как часто обновляются DevBlog?
Автоматически при выходе новых версий.
          `
        },
        {
          id: 'troubleshooting',
          title: 'Решение проблем',
          description: 'Распространенные проблемы и их решение',
          content: `
# Решение проблем

## Сервер не запускается
1. Проверьте баланс (должен быть > 0₽)
2. Убедитесь что нет других активных серверов
3. Попробуйте пересоздать сервер
4. Обратитесь в поддержку

## Высокая загрузка CPU
1. Проверьте количество просмотров
2. Оптимизируйте контент DevBlog
3. Рассмотрите увеличение ресурсов
4. Включите кэширование

## Проблемы с доступом
1. Проверьте настройки файрвола
2. Убедитесь что IP не заблокирован
3. Проверьте правильность портов
4. Отключите VPN/прокси

## Потеря данных
1. Используйте функцию восстановления из бэкапа
2. Проверьте раздел "Резервные копии"
3. Обратитесь в поддержку в течение 7 дней
4. Включите автобэкапы
          `
        }
      ]
    }
  ];

  const getColorClasses = (color: 'cyan' | 'purple' | 'pink') => {
    const colors = {
      cyan: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'border-neon-cyan/30', glow: 'glow-cyan' },
      purple: { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'border-neon-purple/30', glow: 'glow-purple' },
      pink: { bg: 'bg-neon-pink/10', text: 'text-neon-pink', border: 'border-neon-pink/30', glow: 'glow-pink' }
    };
    return colors[color];
  };

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  const getSelectedArticleDetails = () => {
    for (const section of sections) {
      const article = section.articles.find(a => a.id === selectedArticle);
      if (article) return { article, section };
    }
    return null;
  };

  const selectedDetails = getSelectedArticleDetails();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">База</span>
            <span className="text-neon-purple"> знаний</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Полная документация по работе с платформой
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск в документации..."
              className="pl-12 h-14 text-lg bg-card/50 border-neon-cyan/30 focus:border-neon-cyan"
            />
          </div>
        </div>

        {selectedArticle && selectedDetails ? (
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setSelectedArticle(null)}
              variant="outline"
              className="mb-6 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад к разделам
            </Button>
            
            <Card className={`bg-card/50 backdrop-blur-sm border ${getColorClasses(selectedDetails.section.color).border} animate-fade-in`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${getColorClasses(selectedDetails.section.color).bg} rounded-lg flex items-center justify-center ${getColorClasses(selectedDetails.section.color).glow}`}>
                    <Icon name={selectedDetails.section.icon as any} size={32} className={getColorClasses(selectedDetails.section.color).text} />
                  </div>
                  <div className="flex-1">
                    <Badge className={`${getColorClasses(selectedDetails.section.color).bg} ${getColorClasses(selectedDetails.section.color).text} border ${getColorClasses(selectedDetails.section.color).border} mb-2`}>
                      {selectedDetails.section.title}
                    </Badge>
                    <CardTitle className={`text-3xl font-orbitron ${getColorClasses(selectedDetails.section.color).text}`}>
                      {selectedDetails.article.title}
                    </CardTitle>
                    <p className="text-foreground/60 mt-2">{selectedDetails.article.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed space-y-4">
                    {selectedDetails.article.content.split('\n').map((line, index) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={index} className={`text-3xl font-orbitron font-bold ${getColorClasses(selectedDetails.section.color).text} mt-8 mb-4`}>{line.replace('# ', '')}</h1>;
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-2xl font-orbitron font-bold text-foreground mt-6 mb-3">{line.replace('## ', '')}</h2>;
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <div key={index} className="flex items-start gap-3 ml-4">
                            <Icon name="Check" size={18} className={`${getColorClasses(selectedDetails.section.color).text} mt-1 flex-shrink-0`} />
                            <span>{line.replace('- ', '')}</span>
                          </div>
                        );
                      }
                      if (line.match(/^\d+\. /)) {
                        return (
                          <div key={index} className="flex items-start gap-3 ml-4">
                            <span className={`${getColorClasses(selectedDetails.section.color).text} font-bold flex-shrink-0`}>
                              {line.match(/^\d+/)?.[0]}.
                            </span>
                            <span>{line.replace(/^\d+\. /, '')}</span>
                          </div>
                        );
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={index} className="font-bold text-foreground mt-4">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.trim()) {
                        return <p key={index} className="text-foreground/80">{line}</p>;
                      }
                      return <div key={index} className="h-2" />;
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredSections.map((section, sectionIndex) => {
              const colors = getColorClasses(section.color);
              return (
                <div key={section.id} className="space-y-4 animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.glow}`}>
                      <Icon name={section.icon as any} size={24} className={colors.text} />
                    </div>
                    <h2 className={`text-2xl font-orbitron font-bold ${colors.text}`}>{section.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {section.articles.map((article) => (
                      <Card
                        key={article.id}
                        onClick={() => setSelectedArticle(article.id)}
                        className={`bg-card/50 backdrop-blur-sm border ${colors.border} hover:scale-105 transition-all cursor-pointer group`}
                      >
                        <CardHeader>
                          <CardTitle className={`text-lg font-orbitron ${colors.text} group-hover:underline flex items-center justify-between`}>
                            {article.title}
                            <Icon name="ChevronRight" size={20} className={colors.text} />
                          </CardTitle>
                          <p className="text-sm text-foreground/60">{article.description}</p>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredSections.length === 0 && searchQuery && (
          <div className="text-center py-20">
            <Icon name="Search" size={64} className="text-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-orbitron text-foreground/60 mb-2">Ничего не найдено</h3>
            <p className="text-foreground/40">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docs;
