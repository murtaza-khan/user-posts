import { Document } from 'mongoose';
export interface User extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  verification_token: number;
  isGeneralCounselor: boolean;
  userType: string;
}
