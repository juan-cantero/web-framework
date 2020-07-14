export class State<T> {
  constructor(public data: T) {
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  getState(): T {
    return this.data;
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    this.data = { ...this.data, ...update };
  }
}
