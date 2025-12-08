export interface ServerSettings {
  hostname: string;
  maxPlayers: number;
  mapUrl?: string;
  mapSeed?: string;
  worldSize: number;
  description: string;
  plugins: string[];
  tags: string[];
  links: ServerLink[];
}

export interface ServerLink {
  name: string;
  url: string;
  createdAt: string;
}

export interface ActiveServer {
  devblog: string;
  core: string;
  client: string;
  port: number;
  purchaseDate: string;
  settings?: ServerSettings;
}

export interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface ServerStats {
  status: string;
  players: number;
  maxPlayers: number;
  cpu: number;
  ram: number;
  uptime: string;
}
