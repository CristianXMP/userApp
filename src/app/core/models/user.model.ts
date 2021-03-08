import { Role } from './role.model';
export class User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
