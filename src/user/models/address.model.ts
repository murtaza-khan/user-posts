import { Document } from 'mongoose';
export interface Address extends Document {
  address: string;
  postalCode: number;
  city: string;
  state: string;
  country: string;
  /**
   * userId is relationalId address with user
   */
  userId: string
}
