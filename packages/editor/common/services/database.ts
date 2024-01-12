import Dexie, { Table } from "dexie";

export interface Project {
  id?: number;
  name: string;
  configData: string;
}

export interface Scripts {
    id?: number;
    name: string;
    sourceData: string;
}

export interface Models {
    id?: number;
    name: string;
}

export interface Animations {
    id?: number;
    name: string;
}

export class Database extends Dexie {
  projects!: Table<Project>;
  scripts!: Table<Scripts>;
  models!: Table<Models>;
  animations!: Table<Animations>;
  private static instance: Database;
  private constructor() {
    super("editor");
    this.version(1).stores({
        projects: '++id, name',
        scripts: '++id, name',
        models: '++id, name',
        animations: '++id, name',
    });
  }
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance();
