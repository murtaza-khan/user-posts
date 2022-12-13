import { Document } from 'mongoose';
export interface User extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  userType: string;
}
  