export interface DevBlog {
  id: string;
  name: string;
  date: string;
  color: 'cyan' | 'purple' | 'pink';
  icon: string;
  pricePerHour: number;
  pricePerWeek: number;
  pricePerMonth: number;
  features: string[];
  popular: boolean;
  serverCore: string;
  clientDownload: string;
  serverPort: number;
}

export interface ColorClasses {
  border: string;
  bg: string;
  text: string;
  glow: string;
  gradient: string;
}

export const devblogs: DevBlog[] = [
  {
    id: 'devblog-245',
    name: 'DevBlog 245',
    date: 'Декабрь 2024',
    color: 'cyan',
    icon: 'FileText',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Новая система крафта',
      'Улучшения боевой системы',
      'Оптимизация производительности',
      'Новые строительные блоки'
    ],
    popular: false,
    serverCore: 'rust-devblog-245-core.zip',
    clientDownload: 'rust-devblog-245-client.exe',
    serverPort: 28015
  },
  {
    id: 'devblog-244',
    name: 'DevBlog 244',
    date: 'Ноябрь 2024',
    color: 'purple',
    icon: 'Zap',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система транспорта',
      'Новые противники NPC',
      'Улучшенная погода',
      'Новое электричество'
    ],
    popular: true,
    serverCore: 'rust-devblog-244-core.zip',
    clientDownload: 'rust-devblog-244-client.exe',
    serverPort: 28016
  },
  {
    id: 'devblog-243',
    name: 'DevBlog 243',
    date: 'Октябрь 2024',
    color: 'pink',
    icon: 'Crown',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система кланов',
      'Рейдовые механики',
      'Новые биомы',
      'Система торговли'
    ],
    popular: false,
    serverCore: 'rust-devblog-243-core.zip',
    clientDownload: 'rust-devblog-243-client.exe',
    serverPort: 28017
  },
  {
    id: 'devblog-242',
    name: 'DevBlog 242',
    date: 'Сентябрь 2024',
    color: 'cyan',
    icon: 'Shield',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Улучшенная защита базы',
      'Новые ловушки',
      'Система турелей',
      'Укрепления стен'
    ],
    popular: false,
    serverCore: 'rust-devblog-242-core.zip',
    clientDownload: 'rust-devblog-242-client.exe',
    serverPort: 28018
  },
  {
    id: 'devblog-241',
    name: 'DevBlog 241',
    date: 'Август 2024',
    color: 'purple',
    icon: 'Wrench',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Новые инструменты',
      'Система модификаций',
      'Улучшение крафта',
      'Ремонт предметов'
    ],
    popular: false,
    serverCore: 'rust-devblog-241-core.zip',
    clientDownload: 'rust-devblog-241-client.exe',
    serverPort: 28019
  },
  {
    id: 'devblog-240',
    name: 'DevBlog 240',
    date: 'Июль 2024',
    color: 'pink',
    icon: 'Users',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система команд',
      'Голосовой чат',
      'Командные задания',
      'Общий инвентарь'
    ],
    popular: false,
    serverCore: 'rust-devblog-240-core.zip',
    clientDownload: 'rust-devblog-240-client.exe',
    serverPort: 28020
  },
  {
    id: 'devblog-239',
    name: 'DevBlog 239',
    date: 'Июнь 2024',
    color: 'cyan',
    icon: 'Flame',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Новое оружие',
      'Система стрельбы',
      'Баланс урона',
      'Взрывчатка'
    ],
    popular: false,
    serverCore: 'rust-devblog-239-core.zip',
    clientDownload: 'rust-devblog-239-client.exe',
    serverPort: 28021
  },
  {
    id: 'devblog-238',
    name: 'DevBlog 238',
    date: 'Май 2024',
    color: 'purple',
    icon: 'Map',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Расширение карты',
      'Новые локации',
      'Точки интереса',
      'Система навигации'
    ],
    popular: false,
    serverCore: 'rust-devblog-238-core.zip',
    clientDownload: 'rust-devblog-238-client.exe',
    serverPort: 28022
  },
  {
    id: 'devblog-237',
    name: 'DevBlog 237',
    date: 'Апрель 2024',
    color: 'pink',
    icon: 'Boxes',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система хранилищ',
      'Новые контейнеры',
      'Автосортировка',
      'Защита лута'
    ],
    popular: false,
    serverCore: 'rust-devblog-237-core.zip',
    clientDownload: 'rust-devblog-237-client.exe',
    serverPort: 28023
  },
  {
    id: 'devblog-236',
    name: 'DevBlog 236',
    date: 'Март 2024',
    color: 'cyan',
    icon: 'Pickaxe',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Добыча ресурсов',
      'Новые материалы',
      'Карьеры',
      'Система переработки'
    ],
    popular: false,
    serverCore: 'rust-devblog-236-core.zip',
    clientDownload: 'rust-devblog-236-client.exe',
    serverPort: 28024
  },
  {
    id: 'devblog-235',
    name: 'DevBlog 235',
    date: 'Февраль 2024',
    color: 'purple',
    icon: 'Home',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система жилищ',
      'Декорирование',
      'Мебель',
      'Персонализация'
    ],
    popular: false,
    serverCore: 'rust-devblog-235-core.zip',
    clientDownload: 'rust-devblog-235-client.exe',
    serverPort: 28025
  },
  {
    id: 'devblog-234',
    name: 'DevBlog 234',
    date: 'Январь 2024',
    color: 'pink',
    icon: 'Skull',
    pricePerHour: 5,
    pricePerWeek: 750,
    pricePerMonth: 2500,
    features: [
      'Система смерти',
      'Потеря предметов',
      'Возрождение',
      'Призраки'
    ],
    popular: false,
    serverCore: 'rust-devblog-234-core.zip',
    clientDownload: 'rust-devblog-234-client.exe',
    serverPort: 28026
  }
];

export const getColorClasses = (color: string): ColorClasses => {
  const colors: { [key: string]: ColorClasses } = {
    cyan: {
      border: 'border-neon-cyan/30 hover:border-neon-cyan/60',
      bg: 'bg-neon-cyan/10',
      text: 'text-neon-cyan',
      glow: 'glow-cyan',
      gradient: 'from-neon-cyan to-neon-purple'
    },
    purple: {
      border: 'border-neon-purple/30 hover:border-neon-purple/60',
      bg: 'bg-neon-purple/10',
      text: 'text-neon-purple',
      glow: 'glow-purple',
      gradient: 'from-neon-purple to-neon-pink'
    },
    pink: {
      border: 'border-neon-pink/30 hover:border-neon-pink/60',
      bg: 'bg-neon-pink/10',
      text: 'text-neon-pink',
      glow: 'glow-pink',
      gradient: 'from-neon-pink to-neon-cyan'
    }
  };
  return colors[color as keyof typeof colors];
};

export const getPaymentMethodName = (method: string): string => {
  const methods: { [key: string]: string } = {
    'card': 'Банковская карта',
    'qiwi': 'QIWI Кошелёк',
    'yoomoney': 'ЮMoney',
    'crypto': 'Криптовалюта'
  };
  return methods[method] || method;
};
