import { Document } from 'mongoose';
import { UserType } from '../../common/enums';
export interface User extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  userType: UserType;
}
