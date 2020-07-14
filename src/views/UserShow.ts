import { ComponentUi } from './ComponentUi';
import { User, UserProps } from '../models/User';

export class UserShow extends ComponentUi<User, UserProps> {
  template(): string {
    return `
      <div>
        <h1>User detail</h1>
        <div>${this.component.get('name')}</div>
        <div>${this.component.get('age')}</div>
      </div>
    `;
  }
}
