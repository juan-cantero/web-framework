import { ComponentUi } from './ComponentUi';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';

export class UserEdit extends ComponentUi<User, UserProps> {
  regionMap(): { [key: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    };
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.component).render();
    new UserForm(this.regions.userForm, this.component).render();
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
