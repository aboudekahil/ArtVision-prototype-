class LocalStorageHandler {
  constructor() {}

  getFromKeyParsed<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item) as T;
  }

  setItem(key: string, value: unknown): void {
    const svalue = JSON.stringify(value);
    localStorage.setItem(key, svalue);
  }
}

export default new LocalStorageHandler();
