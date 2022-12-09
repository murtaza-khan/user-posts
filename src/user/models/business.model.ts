import { Document } from 'mongoose';
export interface Business extends Document {
  businessName: string;
  businessType: string;
  registeredDate: string;
  EIN: string;
  businessPhone: string;
  website: string;
  businessDescription:string;
  /**
   * userId is relationId business with user
   */
  userId:string;
}
