import { User, UserProps } from '../models/User';
import { ComponentUi } from './ComponentUi';

// The content of an template is a DocumentFragment.

export class UserForm extends ComponentUi<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      //eventname:selector:event
      'click:#btn': this.onButtonClick,
      'click:#save': this.onSaveClick,
    };
  }

  onSaveClick = (): void => {
    this.component.save();
  };
  onButtonClick(): void {
    console.log('hey');
  }

  onSetAgeClick = (): void => {
    this.component.setRandomAge();
  };

  template(): string {
    return `
    <div>
      <input placeholder="name"/>
      <button id="btn" >click me!</button>
      <button id="random-age">set random age</button>
      <button id="save">Save</button>
    </div>
    `;
  }
}
