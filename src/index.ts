import { UserForm } from './views/UserForm';
import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const userEdit = new UserEdit(
  document.getElementById('root'),
  User.buildUser({ name: 'juan', age: 18 })
);

userEdit.render();
