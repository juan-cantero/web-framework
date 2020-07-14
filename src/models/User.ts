import { Component } from './Component';
import { State } from './State';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Component<UserProps> {
  static buildUser(props: UserProps): User {
    return new User(
      new State<UserProps>(props),
      new Eventing(),
      new Sync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age: age });
  }
}
