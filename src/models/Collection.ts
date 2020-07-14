import { Eventing } from './Eventing';
import Axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  private items: T[] = [];
  private events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on(): Function {
    return this.events.on;
  }

  get triggrer(): Function {
    return this.events.trigger;
  }

  fetch(): void {
    Axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.items.push(this.deserialize(value));
      });
    });
  }
}
