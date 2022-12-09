import { Document } from 'mongoose';
export interface Experience extends Document {
  title: string;
  description: string;
  practiceAreas: string;
  industry: string;
  court: string;
  /**
   * profileId is relationId Experience with profile
   */
  profileId: string;
}
