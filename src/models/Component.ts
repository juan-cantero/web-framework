import { AxiosPromise, AxiosResponse } from 'axios';

export interface HasId {
  id?: number;
}
type Callback = () => void;
interface State<T> {
  data: T;
  set(value: T): void;
  getState(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  events: { [key: string]: Callback[] };
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class Component<T extends HasId> {
  constructor(
    private state: State<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.state.get;
  }

  set(update: T) {
    this.state.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }
    this.sync
      .fetch(id)
      .then((response: AxiosResponse): void => this.set(response.data));
  }

  save(): void {
    const state = this.state.getState();
    this.sync
      .save(state)
      .then((response: AxiosResponse) => this.trigger('save'))
      .catch(() => this.trigger('error'));
  }
}
