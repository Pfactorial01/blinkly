export class InMemoryDatabase {
    private static instance: InMemoryDatabase;
  
    private hashMap: Map<string, {
      longUrl: string;
      createdAt: Date;
      visited: number;
    }> = new Map();
  
    private constructor() {}
  
    public static getInstance(): InMemoryDatabase {
      if (!InMemoryDatabase.instance) {
        InMemoryDatabase.instance = new InMemoryDatabase();
      }
  
      return InMemoryDatabase.instance;
    }
  
    public get(key: string): {
      longUrl: string;
      createdAt: Date;
      visited: number;
    } | undefined {
      return this.hashMap.get(key);
    }
  
    public set(key: string, value: {
      longUrl: string;
      createdAt: Date;
      visited: number;
    }): void {
      this.hashMap.set(key, value);
    }

    public updateViewCount(key: string): void {
      const linkData = this.hashMap.get(key)
      if (linkData !== undefined) {
        let visited = linkData.visited
        visited++
        this.hashMap.set(key, { ...linkData, visited })
      }
    }
  }